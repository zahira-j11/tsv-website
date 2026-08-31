/**
 * Audit capacity — the single source of truth for every "N spots left"
 * on the site. The month is derived from the date so the copy can never
 * go stale, and the count resets automatically on the 1st.
 */

export type SpotsInfo = {
  remaining: number;
  capacity: number;
  booked: number;
  month: string;
  /** Where the count came from: webhook bookings, a HubSpot poll, or config. */
  source: 'webhook' | 'hubspot' | 'config';
};

/** How many audits we take in a month. Override without a deploy. */
export const AUDIT_CAPACITY = Number(process.env.NEXT_PUBLIC_AUDIT_CAPACITY ?? 7);

/**
 * Which month we're taking bookings for. 0 = the current month, 1 = next —
 * set NEXT_PUBLIC_AUDIT_MONTH_OFFSET=1 if you always promote the month ahead.
 */
export const MONTH_OFFSET = Number(process.env.NEXT_PUBLIC_AUDIT_MONTH_OFFSET ?? 0);

function targetMonth(d: Date = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth() + MONTH_OFFSET, 1);
}

export function monthName(d: Date = new Date()): string {
  return targetMonth(d).toLocaleString('en-GB', { month: 'long' });
}

/** YYYY-MM for the month being sold — the key bookings are stored under. */
export function monthKey(d: Date = new Date()): string {
  const m = targetMonth(d);
  return `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
}

export function monthBounds(d: Date = new Date()): { start: number; end: number } {
  const m = targetMonth(d);
  const start = m.getTime();
  const end = new Date(m.getFullYear(), m.getMonth() + 1, 1).getTime() - 1;
  return { start, end };
}

/** What the pages render before /api/spots answers — never a blank or a zero. */
export function defaultSpots(): SpotsInfo {
  return {
    remaining: AUDIT_CAPACITY,
    capacity: AUDIT_CAPACITY,
    booked: 0,
    month: monthName(),
    source: 'config',
  };
}

/**
 * Copy helpers, so the three places that mention spots stay in step and
 * degrade sensibly when the month sells out.
 */
export const spotsShort = (s: SpotsInfo) =>
  s.remaining > 0 ? `${s.remaining} spots` : 'Fully booked';

export const spotsSentence = (s: SpotsInfo) =>
  s.remaining > 0
    ? `Only ${s.remaining} spots available for ${s.month}`
    : `${s.month} is fully booked — join the list for next month`;

export const spotsSlots = (s: SpotsInfo) =>
  s.remaining > 0
    ? `${s.remaining} audit slots available for ${s.month}`
    : `${s.month} is fully booked`;

/**
 * Booking tokens.
 *
 * When an application qualifies, the server hands the browser a signed token.
 * The browser sends it back when HubSpot's iframe reports a successful
 * booking, which is what lets us take a spot without shipping the webhook
 * secret to the client. Signed over the applicant + month, so a token can
 * only ever consume the one spot it was issued for.
 */
export function bookingToken(email: string, secret: string, d: Date = new Date()): string {
  // Lazy require keeps this module importable from client components.
  const { createHmac } = require('crypto') as typeof import('crypto');
  const id = `${email.trim().toLowerCase()}|${monthKey(d)}`;
  const sig = createHmac('sha256', secret).update(id).digest('hex').slice(0, 32);
  return `${Buffer.from(id).toString('base64url')}.${sig}`;
}

export function verifyBookingToken(token: string, secret: string): { email: string; month: string } | null {
  const [payload, sig] = String(token).split('.');
  if (!payload || !sig) return null;
  let id: string;
  try { id = Buffer.from(payload, 'base64url').toString('utf8'); } catch { return null; }
  const { createHmac, timingSafeEqual } = require('crypto') as typeof import('crypto');
  const expected = createHmac('sha256', secret).update(id).digest('hex').slice(0, 32);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [email, month] = id.split('|');
  if (!email || !month) return null;
  return { email, month };
}
