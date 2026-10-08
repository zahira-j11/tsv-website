import type { Metadata } from 'next';
import SiteNav from '../SiteNav';
import TrackedLink from '../case-studies/TrackedLink';
import { CASES, BOOK_CALL_HREF } from '@/lib/caseStudies';
import { AUTHORS, SITE_URL } from '@/lib/blog';

const BG = '#FEFDF8';
const WH = '#FFFFFF';
const P  = '#7C01FF';
const PD = '#21005D';
const MU = 'rgba(33,0,93,0.64)';
const BR = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

const TITLE = 'About The Social Vision | London Short-Form Content Agency';
const DESCRIPTION =
  'The Social Vision is a London-based short-form content agency. We plan, cast, film, edit and post TikTok, Reels and Shorts content for in-house marketing teams at apps and consumer brands.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/about`, siteName: 'The Social Vision', type: 'website' },
};

// Only people who are on the team today.
const TEAM = [AUTHORS.zahira, AUTHORS.elisa];

const FACTS = [
  { val: '200M+', label: 'Organic views' },
  { val: '250+',  label: 'Vetted UK creators' },
  { val: '3,000+', label: 'Content pieces' },
  { val: '14–21 days', label: 'From signing to first content live' },
];

const HOW = [
  { n: '01', title: 'Strategy and creator matching', body: 'We learn your brand, audience and goals, build the content plan, and match creators from our network to it.' },
  { n: '02', title: 'Production', body: 'We brief, shoot and edit to your brand guidelines. You approve concepts before we shoot and edits before anything goes live.' },
  { n: '03', title: 'Posting and reporting', body: 'Your first batch is live in week 3. We report on performance and use what works to shape the next month.' },
];

const FORMATS = ['Street interviews', 'Ambassador content', 'Trend-led content', 'Scripted interactions', 'Hi-fi paid ads', 'UGC-style creatives', 'Educational explainers'];

const SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about`,
    name: 'About The Social Vision',
    description: DESCRIPTION,
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHORS.zahira.name,
    jobTitle: AUTHORS.zahira.role,
    image: `${SITE_URL}${AUTHORS.zahira.avatar}`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    workLocation: { '@type': 'Place', name: 'London, United Kingdom' },
  },
];

const label: React.CSSProperties = { fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: P, margin: '0 0 12px' };
const h2: React.CSSProperties = { ...DISP, fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.1, margin: '0 0 16px' };
const body: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: MU, margin: '0 0 14px', maxWidth: 680 };

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: PD }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          @media (max-width: 760px) { .ab-team, .ab-how { grid-template-columns: minmax(0,1fr) !important; } .ab-facts { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
        `}</style>
        <SiteNav />

        <main style={{ padding: '120px 20px 80px', maxWidth: 1040, margin: '0 auto' }}>
          <header style={{ maxWidth: 780, marginBottom: 56 }}>
            <h1 style={{ ...DISP, fontSize: 'clamp(34px,5vw,58px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.04, margin: '0 0 22px' }}>
              We make short-form content that gets brands more than <span className="mkt-gradient-text">300 views.</span>
            </h1>
            <p style={{ ...body, fontSize: 18 }}>
              The Social Vision is a London-based short-form content agency. We plan, cast, film, edit and post TikTok, Instagram Reels and YouTube Shorts content for apps and consumer brands, from organic content that builds an audience to paid creative your performance team can scale.
            </p>
            <p style={body}>
              We work alongside in-house marketing teams, either as a full-service extension or handling creators and production while your team leads strategy.
            </p>
          </header>

          <section aria-label="In numbers" className="ab-facts" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginBottom: 72 }}>
            {FACTS.map(f => (
              <div key={f.label} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '20px 20px 18px' }}>
                <div style={{ ...DISP, fontSize: 26, fontWeight: 800, letterSpacing: '-.04em' }}>{f.val}</div>
                <div style={{ fontSize: 13, color: MU, marginTop: 4 }}>{f.label}</div>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: 72 }}>
            <p style={label}>The team</p>
            <h2 style={h2}>Who you&rsquo;ll work with</h2>
            <div className="ab-team" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16, marginTop: 24 }}>
              {TEAM.map(m => (
                <div key={m.name} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', background: WH, border: `1.5px solid ${BR}`, borderRadius: 20, padding: 22 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.avatar} alt={m.name} width={72} height={72} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ ...DISP, fontSize: 17, fontWeight: 800 }}>{m.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: P, margin: '2px 0 8px' }}>{m.role.replace(' @ The Social Vision', '')}</div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MU, margin: 0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ ...body, marginTop: 20 }}>Behind the team is a vetted network of 250+ UK creators, briefed to your brand guidelines. You don&rsquo;t manage them. We do.</p>
          </section>

          <section style={{ marginBottom: 72 }}>
            <p style={label}>How a retainer runs</p>
            <h2 style={h2}>From signing to content live in three weeks</h2>
            <div className="ab-how" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16, marginTop: 24 }}>
              {HOW.map(s => (
                <div key={s.n} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 20, padding: '22px 22px 20px' }}>
                  <div style={{ ...DISP, fontSize: 13, fontWeight: 800, color: P }}>{s.n}</div>
                  <div style={{ ...DISP, fontSize: 17, fontWeight: 800, margin: '6px 0 8px' }}>{s.title}</div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MU, margin: 0 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 72 }}>
            <p style={label}>What we make</p>
            <h2 style={h2}>Formats</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {FORMATS.map(f => (
                <li key={f} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 100, padding: '9px 16px', fontSize: 14, fontWeight: 600 }}>{f}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: 72 }}>
            <p style={label}>Results</p>
            <h2 style={h2}>Some of the brands we work with</h2>
            <ul style={{ padding: 0, margin: '20px 0 0', listStyle: 'none', display: 'grid', gap: 10 }}>
              {CASES.map(c => (
                <li key={c.slug}>
                  <a href={`/case-studies/${c.slug}`} style={{ color: PD, textDecoration: 'none', fontSize: 16, lineHeight: 1.6 }}>
                    <strong>{c.client}</strong> <span style={{ color: MU }}>· {c.title.replace(/^How /, '')}</span> <span style={{ color: P, fontWeight: 700 }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: 56 }}>
            <p style={label}>Company details</p>
            <p style={{ ...body, margin: 0 }}>
              The Social Vision Ltd · Registered in England and Wales, company no.{' '}
              <a href="https://find-and-update.company-information.service.gov.uk/company/15844979" style={{ color: P, fontWeight: 600 }}>15844979</a>{' '}
              · Founded 2024 · Based in London, working with brands across the UK.
            </p>
          </section>

          <section style={{ background: `linear-gradient(150deg,${PD} 0%,${P} 100%)`, color: '#fff', borderRadius: 24, padding: '36px 32px', textAlign: 'center' }}>
            <h2 style={{ ...DISP, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px' }}>Your brand deserves more than 300 views.</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(255,253,237,0.75)', lineHeight: 1.7, margin: '0 auto 22px', maxWidth: 520 }}>Tell us where your social is stuck and we&rsquo;ll show you what we&rsquo;d change.</p>
            <TrackedLink href={BOOK_CALL_HREF} location="about" style={{ display: 'inline-block', background: '#FFD600', color: PD, fontWeight: 800, fontSize: 14, padding: '13px 26px', borderRadius: 100, textDecoration: 'none' }}>Book a discovery call</TrackedLink>
          </section>
        </main>
      </div>
    </>
  );
}
