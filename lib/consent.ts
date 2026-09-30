/**
 * Cookie consent, stored in the visitor's browser.
 *
 * Analytics cookies (GA4) and HubSpot tracking are not strictly necessary, so
 * under UK PECR they wait for consent. GA runs in Google Consent Mode: until
 * the visitor accepts, it sends cookieless pings only. HubSpot's tracking code
 * is not loaded at all until they accept.
 *
 * The default consent state is set by an inline script in app/layout.tsx so
 * it is in place before GA loads; it reads the same storage key.
 */

export const CONSENT_KEY = 'tsv-consent';
export const CONSENT_EVENT = 'tsv-consent-change';
export const OPEN_SETTINGS_EVENT = 'tsv-open-cookie-settings';

export type Consent = 'granted' | 'denied';

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* private mode: applies to this page view only */ }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('consent', 'update', { analytics_storage: value });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** Inline, runs before GA: default everything to denied unless already accepted. */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
var c=null;try{c=localStorage.getItem('${CONSENT_KEY}');}catch(e){}
gtag('consent','default',{analytics_storage:c==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
`;
