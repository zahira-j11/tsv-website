'use client';
import { useEffect, useState } from 'react';

/**
 * The site nav for pages other than the homepage (the blog, for now). It
 * mirrors the homepage nav in app/page.tsx: same logo, links, "For Creators"
 * button and phone menu, using the same mkt-nav classes so it behaves the
 * same at every width. Section links point back at the homepage anchors.
 *
 * If the homepage nav changes, change this too.
 */

const PD = '#21005D';
const P  = '#7C01FF';
const MU = 'rgba(33,0,93,0.64)';
const BR = '#E4DCFF';
const BG = '#FEFDF8';

const DESKTOP_LINKS: [string, string][] = [
  ['How it works', 'how-it-works'],
  ['Services', 'services'],
  ['Case Studies', 'cases'],
  ['Pricing', 'pricing'],
  ['Testimonials', 'testimonials'],
];
const MOBILE_LINKS = DESKTOP_LINKS.filter(([, id]) => id !== 'testimonials');

const CREATOR_PORTAL = 'https://www.tsvportal.co.uk/creator';

export default function SiteNav({ active }: { active?: 'blog' }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const link: React.CSSProperties = { color: MU, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'color 150ms' };
  const blogLink: React.CSSProperties = active === 'blog' ? { ...link, color: P, fontWeight: 700 } : link;

  return (
    <div className="site-nav-wrap" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, fontFamily: 'var(--font-sans)' }}>
      <nav className={`mkt-nav${scrolled ? ' mkt-nav-scrolled' : ''}`} style={{ position: 'relative', margin: '14px auto 0', zIndex: 100, width: 'min(1200px,calc(100% - 32px))', height: 54, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(24px)', borderRadius: 100, border: `1px solid ${BR}`, boxShadow: '0 4px 28px rgba(33,0,93,0.10), 0 1px 0 rgba(255,255,255,0.8) inset', transition: 'box-shadow 320ms' }}>
        <div style={{ height: '100%', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" className="mkt-nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/tsv-logo-mark.png" alt="The Social Vision" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          </a>
          <div className="mkt-hidden-mobile" style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
            {DESKTOP_LINKS.map(([l, id]) => (
              <a key={id} href={`/#${id}`} className="blog-nav-link" style={link}>{l}</a>
            ))}
            <a href="/blog" className="blog-nav-link" style={blogLink} aria-current={active === 'blog' ? 'page' : undefined}>Blog</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <a href={CREATOR_PORTAL} target="_blank" rel="noopener noreferrer" className="mkt-hidden-mobile" style={{ display: 'inline-block', background: 'transparent', color: PD, fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 100, textDecoration: 'none', border: `1.5px solid ${BR}`, transition: 'all 160ms' }}>For Creators</a>
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
            {MOBILE_LINKS.map(([l, id]) => (
              <a key={id} href={`/#${id}`} onClick={() => setMenu(false)} style={{ display: 'block', color: MU, fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${BR}` }}>{l}</a>
            ))}
            <a href="/blog" onClick={() => setMenu(false)} style={{ display: 'block', color: active === 'blog' ? P : MU, fontSize: 15, fontWeight: 600, textDecoration: 'none', padding: '12px 0', borderBottom: `1px solid ${BR}` }}>Blog</a>
            <a href={CREATOR_PORTAL} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)} style={{ display: 'block', background: PD, color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: 14, padding: 14, borderRadius: 100, textDecoration: 'none', marginTop: 16 }}>For Creators</a>
          </div>
        )}
      </nav>
    </div>
  );
}
