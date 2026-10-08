'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { readConsent, CONSENT_EVENT, type Consent } from '@/lib/consent';

/**
 * GA4 and the HubSpot tracking code. HubSpot's code is what lets a booking be
 * credited to where the visitor first came from (Google, ChatGPT, LinkedIn…)
 * instead of "Direct".
 *
 * GA always loads, in Consent Mode (cookieless until the visitor accepts — see
 * lib/consent.ts). HubSpot only loads once they accept.
 *
 * Neither loads on /admin, so our own visits to the back office don't show
 * up as site traffic.
 */

// The HubSpot account (146922833) is on the EU1 data centre (the meetings
// links are meetings-eu1.hubspot.com), so its tracking code comes from js-eu1.
//
// The tracking code also switches on whatever HubSpot pop-ups are live in the
// account. One of them (overlay CTA 463078028485, still live on 8 Oct 2026)
// opens the audit calendar directly and skips the budget gate on /audit, so
// HUBSPOT_POPUPS_OFF hides every HubSpot web interactive on this site, and
// undoes the scroll lock they put on <body>. The
// site's own buttons do that job. Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID to an
// empty string to switch HubSpot tracking off altogether.
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '146922833';
const HUBSPOT_POPUPS_OFF = `
  #hs-interactives-modal-overlay,
  [id^="hs-overlay-cta-"],
  [id^="hs-web-interactives-"] { display: none !important; }
  /* An open pop-up also locks scrolling with a generated class on <body>. */
  body { overflow: visible !important; }
`;

export default function Trackers() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {HUBSPOT_PORTAL_ID && consent === 'granted' && (
        <>
          <style>{HUBSPOT_POPUPS_OFF}</style>
          <Script
            id="hs-script-loader"
            src={`https://js-eu1.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
