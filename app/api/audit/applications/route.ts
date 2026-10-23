import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AuditApplication from '@/models/AuditApplication';
import {
  ADMIN_COOKIE as COOKIE,
  ADMIN_SESSION_MS as SESSION_MS,
  adminAuthMisconfigured,
  adminSessionSecret,
  safeEqual as matches,
  sessionValid,
  signSession as sign,
} from '@/lib/adminSession';
import {
  clearLoginFailures,
  clientIp,
  lockoutRetryAfterSeconds,
  loginLocked,
  recordLoginFailure,
} from '@/lib/adminLoginLimit';

/**
 * Reads back audit applications — mainly the declined ones, which never reach
 * a calendar and so would otherwise only exist as rows nobody looks at.
 *
 *   POST { password }  → checks the password, sets a session cookie, returns rows
 *   GET                → returns rows if the cookie is valid, otherwise 401
 *   DELETE { id }      → removes one row, for test entries and spam
 *
 * The password is only ever sent in a POST body, never a query string. The
 * cookie holds an expiry signed with ADMIN_SESSION_SECRET. Five wrong
 * passwords from one IP in 15 minutes lock that IP out; the sixth returns 429.
 */

export const dynamic = 'force-dynamic';

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
    jobTitle: d.jobTitle ?? '',
    website: d.website,
    platforms: d.platforms ?? [],
    budget: d.budget,
    teamSize: d.teamSize,
    challenge: d.challenge,
    heardFrom: d.heardFrom ?? '',
  }));
}

function configError() {
  if (adminAuthMisconfigured()) {
    console.error('[audit-admin] ADMIN_PASSWORD and a distinct ADMIN_SESSION_SECRET are required');
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Storage is not configured.' }, { status: 503 });
  }
  return null;
}

function tooManyAttempts(ip: string) {
  console.warn(`[audit-admin] sign-in locked ip=${ip}`);
  return NextResponse.json(
    { error: 'Too many attempts. Try again in a few minutes.' },
    { status: 429, headers: { 'Retry-After': String(lockoutRetryAfterSeconds(ip)) } },
  );
}

export async function GET(req: NextRequest) {
  const bad = configError();
  if (bad) return bad;
  if (!sessionValid(req.cookies.get(COOKIE)?.value, adminSessionSecret()!)) {
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

  const ip = clientIp(req.headers);
  if (loginLocked(ip)) return tooManyAttempts(ip);

  let password = '';
  try {
    const body = (await req.json()) as { password?: string };
    password = String(body?.password ?? '');
  } catch { /* no body */ }

  const expected = process.env.ADMIN_PASSWORD ?? '';
  const same = matches(password, expected);
  if (!password || !same) {
    const { failures } = recordLoginFailure(ip);
    console.warn(`[audit-admin] failed sign-in ip=${ip} failures=${failures}`);
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  clearLoginFailures(ip);

  try {
    const data = await rows();
    const exp = Date.now() + SESSION_MS;
    const res = NextResponse.json({ applications: data });
    res.cookies.set(COOKIE, sign(exp, adminSessionSecret()!), {
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
  if (!sessionValid(req.cookies.get(COOKIE)?.value, adminSessionSecret()!)) {
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
