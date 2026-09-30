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
// Opt-in via NEXT_PUBLIC_HUBSPOT_PORTAL_ID=146922833. The tracking code also
// switches on whatever HubSpot pop-ups, chat and banners are live in the
// account — at the time of writing that included an overlay CTA (463078028485)
// opening the audit calendar directly, which skips the budget gate on /audit.
// Check HubSpot's live pop-ups before setting the variable.
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

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
        <Script
          id="hs-script-loader"
          src={`https://js-eu1.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
