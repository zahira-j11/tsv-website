'use client';
import { useEffect, useState } from 'react';
import { readConsent, saveConsent, OPEN_SETTINGS_EVENT, CONSENTED_CLASS } from '@/lib/consent';

const PD = '#21005D';
const P  = '#7C01FF';
const BR = '#E4DCFF';

/**
 * Asks once, remembers the answer, and can be reopened from "Cookie settings"
 * in the footer. Kept small and to one side so it doesn't cover the hero CTAs.
 *
 * It's in the server HTML so it paints with the page instead of popping in
 * after the JavaScript loads (on phones it was the slowest thing to appear,
 * which dragged down page-speed scores). For visitors who have already chosen,
 * CONSENT_DEFAULT_SCRIPT adds CONSENTED_CLASS to <html> before first paint and
 * a CSS rule in globals.css keeps it hidden.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin') || readConsent() !== null) setOpen(false);
    const reopen = () => { document.documentElement.classList.remove(CONSENTED_CLASS); setOpen(true); };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (v: 'granted' | 'denied') => { saveConsent(v); document.documentElement.classList.add(CONSENTED_CLASS); setOpen(false); };
  const btn: React.CSSProperties = {
    flex: 1, padding: '11px 14px', borderRadius: 10, fontSize: 13, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <div role="dialog" aria-label="Cookie preferences" className="tsv-cookie-banner" style={{
      position: 'fixed', zIndex: 3000, left: 16, right: 16,
      bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      maxWidth: 380, background: '#fff', border: `1.5px solid ${BR}`, borderRadius: 16,
      boxShadow: '0 16px 48px rgba(33,0,93,0.18)', padding: '18px 18px 16px',
      fontFamily: 'var(--font-sans)', color: PD,
    }}>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}>
        We use analytics cookies to see which pages help people find us. Nothing is set until you say yes.{' '}
        <a href="/privacy#cookies" style={{ color: P, fontWeight: 600 }}>Privacy policy</a>
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => choose('denied')} style={{ ...btn, background: '#fff', color: PD, border: `1.5px solid ${BR}` }}>Reject</button>
        <button onClick={() => choose('granted')} style={{ ...btn, background: P, color: '#fff', border: 'none' }}>Accept</button>
      </div>
    </div>
  );
}
