import type { Metadata } from 'next';
import SiteNav from '../SiteNav';
import TrackedLink from './TrackedLink';
import { CASES, BOOK_CALL_HREF } from '@/lib/caseStudies';
import { SITE_URL } from '@/lib/blog';

const BG = '#FEFDF8';
const WH = '#FFFFFF';
const P  = '#7C01FF';
const PD = '#21005D';
const MU = 'rgba(33,0,93,0.64)';
const BR = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const TITLE = 'Case Studies | The Social Vision, London Short-Form Content Agency';
const DESCRIPTION =
  'Short-form content results for apps and consumer brands: Habito’s 25M organic views with zero ad spend, Uni Compare’s 1M views in 6 weeks, TALAB’s 6,000 users from launch, and Plum’s paid social creative.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/case-studies`, siteName: 'The Social Vision', type: 'website' },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Case studies',
  url: `${SITE_URL}/case-studies`,
  description: DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organization` },
  hasPart: CASES.map(c => ({ '@type': 'Article', headline: c.title, url: `${SITE_URL}/case-studies/${c.slug}` })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: PD }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          .cs-card:hover { box-shadow: 0 20px 56px rgba(33,0,93,0.13); transform: translateY(-4px); }
          @media (max-width: 760px) { .cs-grid { grid-template-columns: minmax(0,1fr) !important; } }
        `}</style>
        <SiteNav active="cases" />

        <main style={{ padding: '120px 20px 80px', maxWidth: 1120, margin: '0 auto' }}>
          <header style={{ maxWidth: 760, marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: 'rgba(124,1,255,0.09)', color: P, fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '5px 18px', borderRadius: 20, marginBottom: 18 }}>Case studies</span>
            <h1 style={{ ...DISP, fontSize: 'clamp(32px,4.6vw,56px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.05, margin: '0 0 18px' }}>Brands that got more than 300 views</h1>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: MU, margin: 0 }}>
              What we made and what happened next for apps and consumer brands we work with, from organic street interviews to paid social creative. The Social Vision is a London-based short-form content agency.
            </p>
          </header>

          <div className="cs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 20 }}>
            {CASES.map(c => (
              <a key={c.slug} href={`/case-studies/${c.slug}`} className="cs-card" style={{ display: 'flex', flexDirection: 'column', background: WH, borderRadius: 24, overflow: 'hidden', textDecoration: 'none', color: PD, boxShadow: '0 4px 24px rgba(33,0,93,0.07)', transition: 'transform 220ms ease, box-shadow 220ms ease' }}>
                <div style={{ position: 'relative', height: 240, background: c.g }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.95)', color: P, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20 }}>{c.client}</span>
                </div>
                <div style={{ padding: '22px 26px 26px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: MU, marginBottom: 8 }}>{c.industry} · {c.format}</div>
                  <h2 style={{ ...DISP, fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.2, margin: '0 0 10px' }}>{c.title}</h2>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MU, margin: 0 }}>{c.headline}</p>
                </div>
              </a>
            ))}
          </div>

          <section style={{ marginTop: 56, background: WH, border: `1.5px solid ${BR}`, borderRadius: 24, padding: '30px 30px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
            <div style={{ maxWidth: 560 }}>
              <h2 style={{ ...DISP, fontSize: 24, fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 6px' }}>Want results like these?</h2>
              <p style={{ fontSize: 15, color: MU, lineHeight: 1.7, margin: 0 }}>Retainers start at £2,000 a month (ex. VAT). First content goes live within 14&ndash;21 days.</p>
            </div>
            <TrackedLink href={BOOK_CALL_HREF} location="case_index" style={{ background: PD, color: '#fff', fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 100, textDecoration: 'none' }}>Book a discovery call</TrackedLink>
          </section>
        </main>
      </div>
    </>
  );
}
