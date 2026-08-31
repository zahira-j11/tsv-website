import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import AuditBooking from '@/models/AuditBooking';
import { monthKey } from '@/lib/spots';

/**
 * Webhook target for HubSpot workflows.
 *
 *   POST   /api/spots/booking   → an audit was booked, take a spot
 *   DELETE /api/spots/booking   → it was cancelled, give the spot back
 *
 * Authenticated with a shared secret, since anyone who found this URL could
 * otherwise run your availability down to zero.
 */

export const dynamic = 'force-dynamic';

const Body = z.object({
  bookingId: z.string().trim().min(1).max(200),
  email: z.string().trim().max(200).optional(),
  name: z.string().trim().max(200).optional(),
  /** Optional ISO date of the meeting; defaults to now. */
  startTime: z.string().trim().max(60).optional(),
});

function authorised(req: NextRequest): boolean {
  const secret = process.env.AUDIT_WEBHOOK_SECRET;
  if (!secret) return false;                       // closed until configured
  const header = req.headers.get('x-tsv-secret');
  const query = req.nextUrl.searchParams.get('secret');
  return header === secret || query === secret;
}

async function parse(req: NextRequest) {
  if (!authorised(req)) {
    return { error: NextResponse.json({ error: 'Unauthorised' }, { status: 401 }) };
  }
  if (!process.env.MONGODB_URI) {
    return { error: NextResponse.json({ error: 'Storage not configured' }, { status: 503 }) };
  }
  let json: unknown;
  try { json = await req.json(); } catch { json = {}; }
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return { error: NextResponse.json({ error: 'bookingId is required' }, { status: 422 }) };
  }
  return { data: parsed.data };
}

export async function POST(req: NextRequest) {
  const { error, data } = await parse(req);
  if (error) return error;

  const when = data!.startTime ? new Date(data!.startTime) : new Date();
  const month = monthKey(isNaN(when.getTime()) ? new Date() : when);

  try {
    await connectDB();
    // Upsert keyed on bookingId, so a re-fired webhook cannot double-count.
    await AuditBooking.updateOne(
      { bookingId: data!.bookingId },
      { $set: { month, email: data!.email ?? '', name: data!.name ?? '' } },
      { upsert: true },
    );
    const booked = await AuditBooking.countDocuments({ month });
    return NextResponse.json({ ok: true, month, booked });
  } catch (err) {
    console.error('[POST /api/spots/booking]', err);
    return NextResponse.json({ error: 'Could not record booking' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { error, data } = await parse(req);
  if (error) return error;

  try {
    await connectDB();
    const res = await AuditBooking.deleteOne({ bookingId: data!.bookingId });
    return NextResponse.json({ ok: true, removed: res.deletedCount ?? 0 });
  } catch (err) {
    console.error('[DELETE /api/spots/booking]', err);
    return NextResponse.json({ error: 'Could not release booking' }, { status: 500 });
  }
}
