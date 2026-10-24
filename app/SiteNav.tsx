'use client';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { BOOK_CALL_HREF } from '@/lib/caseStudies';

/**
 * The site nav for pages other than the homepage (blog, case studies). It
 * mirrors the homepage nav in app/page.tsx: same logo, links, "Book a call"
 * button and phone menu, using the same mkt-nav classes so it behaves the
 * same at every width. Section links point back at the homepage anchors;
 * "Book a call" opens the homepage calendar.
 *
 * If the homepage nav changes, change this too.
 */

const PD = '#21005D';
const P  = '#7C01FF';
const MU = 'rgba(33,0,93,0.64)';
const BR = '#E4DCFF';
const BG = '#FEFDF8';

// [label, href, the `active` value that highlights it]
const DESKTOP_LINKS: [string, string, string?][] = [
  ['How it works', '/#how-it-works'],
  ['Services', '/#services'],
  ['Case Studies', '/case-studies', 'cases'],
  ['Pricing', '/#pricing'],
  ['Testimonials', '/#testimonials'],
  ['Blog', '/blog', 'blog'],
];
const MOBILE_LINKS = DESKTOP_LINKS.filter(([l]) => l !== 'Testimonials');

const CREATOR_PORTAL = 'https://www.tsvportal.co.uk/creator';

export default function SiteNav({ active }: { active?: 'blog' | 'cases' }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const link: React.CSSProperties = { color: MU, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'color 150ms' };
  const activeLink: React.CSSProperties = { ...link, color: P, fontWeight: 700 };

  return (
    <div className="site-nav-wrap" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, fontFamily: 'var(--font-sans)' }}>
      <nav className={`mkt-nav${scrolled ? ' mkt-nav-scrolled' : ''}`} style={{ position: 'relative', margin: '14px auto 0', zIndex: 100, width: 'min(1200px,calc(100% - 32px))', height: 54, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(24px)', borderRadius: 100, border: `1px solid ${BR}`, boxShadow: '0 4px 28px rgba(33,0,93,0.10), 0 1px 0 rgba(255,255,255,0.8) inset', transition: 'box-shadow 320ms' }}>
        <div style={{ height: '100%', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" className="mkt-nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/tsv-logo-mark.png" alt="The Social Vision" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          </a>
          <div className="mkt-hidden-mobile" style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
            {DESKTOP_LINKS.map(([l, href, key]) => {
              const on = !!key && key === active;
              return <a key={href} href={href} className="blog-nav-link" style={on ? activeLink : link} aria-current={on ? 'page' : undefined}>{l}</a>;
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <a href={CREATOR_PORTAL} target="_blank" rel="noopener noreferrer" className="mkt-hidden-mobile blog-nav-link" style={{ ...link, padding: '10px 8px' }}>For Creators</a>
            <a href={BOOK_CALL_HREF} onClick={() => track('cta_click', { location: `nav_book_${active ?? 'page'}` })} className="mkt-hidden-mobile" style={{ display: 'inline-block', background: PD, color: '#fff', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 100, textDecoration: 'none' }}>Book a call</a>
            <button onClick={() => setMenu(!menu)} className="mkt-show-mobile mkt-nav-menu-btn" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}
              style={{ width: 42, height: 42, borderRadius: '50%', background: PD, border: 'none', color: '#fff', cursor: 'pointer', padding: 0, boxShadow: '0 6px 20px rgba(33,0,93,0.28)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
                {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
        {menu && (
          <div className="mkt-nav-menu" style={{ background: BG, borderTop: `1px solid ${BR}`, padding: '16px 28px 24px', borderRadius: '0 0 28px 28px' }}>
            {MOBILE_LINKS.map(([l, href, key]) => (
              <a key={href} href={href} onClick={() => setMenu(false)} style={{ display: 'block', color: key && key === active ? P : MU, fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${BR}` }}>{l}</a>
            ))}
            <a href={CREATOR_PORTAL} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)} style={{ display: 'block', color: MU, fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${BR}` }}>For Creators</a>
            <a href={BOOK_CALL_HREF} onClick={() => { setMenu(false); track('cta_click', { location: `nav_book_${active ?? 'page'}_mobile` }); }} style={{ display: 'block', background: PD, color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: 14, padding: 14, borderRadius: 100, textDecoration: 'none', marginTop: 16 }}>Book a call</a>
          </div>
        )}
      </nav>
    </div>
  );
}
