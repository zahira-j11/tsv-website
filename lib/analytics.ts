/**
 * GA4 events for the enquiry funnel. Every route to a conversation fires one
 * of these, so a lead can be traced from the button pressed to the booking:
 *
 *   cta_click       { location }  — any button that leads towards a call or audit
 *   calendar_open   { location }  — the discovery calendar is shown
 *   call_booked     { location }  — HubSpot confirms a discovery call
 *   audit_submit                  — audit application sent
 *   audit_qualified / audit_declined
 *   audit_booked                  — HubSpot confirms an audit slot
 *
 * Mark call_booked, audit_submit and audit_booked as key events in GA4.
 */

type Params = Record<string, string | number | boolean | undefined>;

type Gtag = (command: 'event', name: string, params?: Params) => void;

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params);
  }
}

/**
 * HubSpot's embedded calendar posts `{ meetingBookSucceeded: true }` to the
 * parent page when a booking goes through. Only trust it from HubSpot.
 */
export function isHubSpotBooking(e: MessageEvent): boolean {
  let host = '';
  try { host = new URL(e.origin).hostname; } catch { return false; }
  if (host !== 'hubspot.com' && !host.endsWith('.hubspot.com')) return false;
  const d = e.data as { meetingBookSucceeded?: boolean } | undefined;
  return !!d && d.meetingBookSucceeded === true;
}
