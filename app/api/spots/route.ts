import { NextResponse } from 'next/server';
import { AUDIT_CAPACITY, monthBounds, monthKey, monthName, type SpotsInfo } from '@/lib/spots';
import { connectDB } from '@/lib/mongodb';
import AuditBooking from '@/models/AuditBooking';

/**
 * Live audit availability.
 *
 * Counts audit bookings for the month being sold and returns what's left.
 *
 * Three sources, in order of preference:
 *   1. Bookings recorded by the HubSpot workflow webhook (MONGODB_URI set)
 *   2. Polling the HubSpot meetings API (HUBSPOT_TOKEN set)
 *   3. The configured capacity, so the site always renders a sensible number
 */

export const dynamic = 'force-dynamic';

const CACHE_MS = 5 * 60 * 1000;
let cache: { at: number; data: SpotsInfo } | null = null;

/**
 * Both booking links live in the same HubSpot portal and land on the same
 * calendar, so the audit has to be identified positively and the discovery
 * call excluded explicitly:
 *
 *   /social-media-audit-      → "Social Media Audit"          (1 hour)
 *   /social-discovery-call-   → "Social Growth Discovery Call" (30 mins)
 *
 * "audit" appears in the first and in neither discovery-call variant, and the
 * exclusion also guards the manually-created "Social Media Discovery Call"
 * already sitting in the calendar, which a looser "social media" match on the
 * title would wrongly count.
 */
const TITLE_MATCH  = process.env.AUDIT_MEETING_TITLE_MATCH ?? 'audit';
const TITLE_EXCLUDE = process.env.AUDIT_MEETING_TITLE_EXCLUDE ?? 'discovery';

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
          { propertyName: 'hs_meeting_title', operator: 'NOT_CONTAINS_TOKEN', value: TITLE_EXCLUDE },
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
  // Only the HubSpot poll is worth caching; a Mongo count is cheap, and caching
  // it would leave the site advertising a spot that has just been taken.
  if (cache && cache.data.source === 'hubspot' && Date.now() - cache.at < CACHE_MS) {
    return NextResponse.json(cache.data);
  }

  let booked: number | null = null;
  let source: SpotsInfo['source'] = 'config';

  // 1. Webhook-fed bookings
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
      booked = await AuditBooking.countDocuments({ month: monthKey() });
      source = 'webhook';
    } catch (err) {
      console.error('[GET /api/spots] booking store unavailable', err);
    }
  }

  // 2. Fall back to asking HubSpot directly
  if (booked === null) {
    try {
      booked = await countBookedAudits();
      if (booked !== null) source = 'hubspot';
    } catch (err) {
      console.error('[GET /api/spots] HubSpot lookup failed', err);
    }
  }

  const data: SpotsInfo = {
    capacity: AUDIT_CAPACITY,
    booked: booked ?? 0,
    remaining: booked === null ? AUDIT_CAPACITY : Math.max(0, AUDIT_CAPACITY - booked),
    month: monthName(),
    source,
  };

  if (source === 'hubspot') cache = { at: Date.now(), data };
  return NextResponse.json(data);
}
