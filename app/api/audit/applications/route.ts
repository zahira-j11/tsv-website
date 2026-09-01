import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { connectDB } from '@/lib/mongodb';
import AuditApplication from '@/models/AuditApplication';

/**
 * Reads back audit applications — mainly the declined ones, which never reach
 * a calendar and so would otherwise only exist as rows nobody looks at.
 *
 *   POST { password }  → checks the password, sets a session cookie, returns rows
 *   GET                → returns rows if the cookie is valid, otherwise 401
 *   DELETE { id }      → removes one row, for test entries and spam
 *
 * The password is only ever sent in a POST body, never a query string, and the
 * cookie holds an expiry signed with AUDIT_WEBHOOK_SECRET rather than the
 * password itself.
 */

export const dynamic = 'force-dynamic';

const COOKIE = 'tsv_admin';
const SESSION_MS = 12 * 60 * 60 * 1000;

function sign(exp: number, secret: string): string {
  return `${exp}.${createHmac('sha256', secret).update(String(exp)).digest('hex').slice(0, 32)}`;
}

function sessionValid(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const [expRaw, sig] = token.split('.');
  const exp = Number(expRaw);
  if (!exp || !sig || Date.now() > exp) return false;
  const expected = sign(exp, secret).split('.')[1];
  const a = Buffer.from(sig), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function matches(given: string, actual: string): boolean {
  const a = Buffer.from(given), b = Buffer.from(actual);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function rows() {
  await connectDB();
  const docs = await AuditApplication.find({})
    .sort({ createdAt: -1 })
    .limit(500)
    .lean();
  return docs.map((d) => ({
    id: String(d._id),
    createdAt: d.createdAt,
    qualified: d.qualified,
    month: d.month,
    name: d.name,
    email: d.email,
    company: d.company,
    website: d.website,
    platforms: d.platforms ?? [],
    budget: d.budget,
    teamSize: d.teamSize,
    challenge: d.challenge,
  }));
}

function configError() {
  if (!process.env.ADMIN_PASSWORD || !process.env.AUDIT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Storage is not configured.' }, { status: 503 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const bad = configError();
  if (bad) return bad;
  if (!sessionValid(req.cookies.get(COOKIE)?.value, process.env.AUDIT_WEBHOOK_SECRET!)) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }
  try {
    return NextResponse.json({ applications: await rows() });
  } catch (err) {
    console.error('[GET /api/audit/applications]', err);
    return NextResponse.json({ error: 'Could not read applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const bad = configError();
  if (bad) return bad;

  let password = '';
  try {
    const body = (await req.json()) as { password?: string };
    password = String(body?.password ?? '');
  } catch { /* no body */ }

  if (!password || !matches(password, process.env.ADMIN_PASSWORD!)) {
    // Same shape and timing-safe compare either way, so this says nothing
    // about whether the password was close.
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  try {
    const data = await rows();
    const exp = Date.now() + SESSION_MS;
    const res = NextResponse.json({ applications: data });
    res.cookies.set(COOKIE, sign(exp, process.env.AUDIT_WEBHOOK_SECRET!), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MS / 1000,
    });
    return res;
  } catch (err) {
    console.error('[POST /api/audit/applications]', err);
    return NextResponse.json({ error: 'Could not read applications' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const bad = configError();
  if (bad) return bad;
  if (!sessionValid(req.cookies.get(COOKIE)?.value, process.env.AUDIT_WEBHOOK_SECRET!)) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  let id = '';
  try {
    const body = (await req.json()) as { id?: string };
    id = String(body?.id ?? '');
  } catch { /* no body */ }
  if (!/^[0-9a-f]{24}$/.test(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 422 });
  }

  try {
    await connectDB();
    const res = await AuditApplication.deleteOne({ _id: id });
    return NextResponse.json({ ok: true, removed: res.deletedCount ?? 0 });
  } catch (err) {
    console.error('[DELETE /api/audit/applications]', err);
    return NextResponse.json({ error: 'Could not remove application' }, { status: 500 });
  }
}
