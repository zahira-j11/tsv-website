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
