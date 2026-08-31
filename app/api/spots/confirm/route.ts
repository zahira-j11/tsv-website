import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AuditBooking from '@/models/AuditBooking';
import { monthKey, verifyBookingToken } from '@/lib/spots';

/**
 * Called by the /audit page the moment HubSpot's embedded calendar reports a
 * successful booking, which is what makes the counter tick down on its own —
 * no workflow, no API scope, no third-party automation.
 *
 * The browser proves it's a real applicant with the signed token issued when
 * their application qualified, so the webhook secret never leaves the server.
 * The token is bound to one email and one month, and the booking is stored
 * under that pair, so a refresh or a double-fire cannot take a second spot.
 */

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const secret = process.env.AUDIT_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'Storage not configured' }, { status: 503 });

  let token = '';
  try {
    const body = (await req.json()) as { token?: string };
    token = String(body?.token ?? '');
  } catch { /* no body */ }

  const claim = verifyBookingToken(token, secret);
  if (!claim) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  // A token issued last month can't be spent against this month's capacity.
  if (claim.month !== monthKey()) {
    return NextResponse.json({ error: 'Token expired' }, { status: 409 });
  }

  try {
    await connectDB();
    await AuditBooking.updateOne(
      { bookingId: `audit:${claim.month}:${claim.email}` },
      { $set: { month: claim.month, email: claim.email, name: '' } },
      { upsert: true },
    );
    const booked = await AuditBooking.countDocuments({ month: claim.month });
    return NextResponse.json({ ok: true, month: claim.month, booked });
  } catch (err) {
    console.error('[POST /api/spots/confirm]', err);
    return NextResponse.json({ error: 'Could not record booking' }, { status: 500 });
  }
}
