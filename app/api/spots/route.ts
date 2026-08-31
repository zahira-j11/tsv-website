import { NextResponse } from 'next/server';
import { AUDIT_CAPACITY, monthBounds, monthName, type SpotsInfo } from '@/lib/spots';

/**
 * Live audit availability.
 *
 * Counts audit meetings already booked in HubSpot for the current month and
 * returns what's left. HubSpot stays the source of truth, so a cancellation
 * puts the spot back on its own — which a webhook-driven counter would not.
 *
 * Falls back to the configured capacity when HUBSPOT_TOKEN is absent, so the
 * site still renders a sensible number before the integration is switched on.
 */

export const dynamic = 'force-dynamic';

const CACHE_MS = 5 * 60 * 1000;
let cache: { at: number; data: SpotsInfo } | null = null;

/** Audit meetings are matched on title, so discovery calls aren't counted. */
const TITLE_MATCH = process.env.AUDIT_MEETING_TITLE_MATCH ?? 'audit';

async function countBookedAudits(): Promise<number | null> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return null;

  const { start, end } = monthBounds();
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/meetings/search', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filterGroups: [{
        filters: [
          { propertyName: 'hs_meeting_start_time', operator: 'BETWEEN', value: String(start), highValue: String(end) },
          { propertyName: 'hs_meeting_title', operator: 'CONTAINS_TOKEN', value: TITLE_MATCH },
        ],
      }],
      properties: ['hs_meeting_title', 'hs_meeting_start_time'],
      limit: 100,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('[GET /api/spots] HubSpot responded', res.status, await res.text().catch(() => ''));
    return null;
  }
  const json = await res.json();
  return typeof json.total === 'number' ? json.total : (json.results?.length ?? 0);
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return NextResponse.json(cache.data);
  }

  let booked: number | null = null;
  try {
    booked = await countBookedAudits();
  } catch (err) {
    console.error('[GET /api/spots] lookup failed', err);
  }

  const data: SpotsInfo = {
    capacity: AUDIT_CAPACITY,
    booked: booked ?? 0,
    remaining: booked === null ? AUDIT_CAPACITY : Math.max(0, AUDIT_CAPACITY - booked),
    month: monthName(),
    source: booked === null ? 'config' : 'hubspot',
  };

  cache = { at: Date.now(), data };
  return NextResponse.json(data);
}
