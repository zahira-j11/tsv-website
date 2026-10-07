import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '../../SiteNav';
import TrackedLink from '../TrackedLink';
import { CASES, getCase, testimonialsFor, BOOK_CALL_HREF, type CaseStudy } from '@/lib/caseStudies';
import { SITE_URL } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

const BG = '#FEFDF8';
const WH = '#FFFFFF';
const P  = '#7C01FF';
const PD = '#21005D';
const MU = 'rgba(33,0,93,0.64)';
const SU = 'rgba(33,0,93,0.28)';
const BR = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

export async function generateStaticParams() {
  return CASES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const url = `${SITE_URL}/case-studies/${c.slug}`;
  const title = `${c.title} | The Social Vision`;
  return {
    title,
    description: c.headline,
    alternates: { canonical: url },
    openGraph: { title: c.title, description: c.headline, url, siteName: 'The Social Vision', type: 'article', images: [{ url: `${SITE_URL}${c.thumb}` }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.headline },
  };
}

function JsonLd({ c }: { c: CaseStudy }) {
  const url = `${SITE_URL}/case-studies/${c.slug}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: c.title,
      description: c.headline,
      url,
      image: `${SITE_URL}${c.thumb}`,
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: { '@type': 'Organization', name: c.client },
      keywords: [c.format, c.industry, 'short-form content', 'case study'].join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: c.client, item: url },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: P, margin: '0 0 10px' }}>{children}</p>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const quotes = testimonialsFor(c.client);
  const others = CASES.filter(o => o.slug !== c.slug);

  return (
    <>
      <JsonLd c={c} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: PD }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          .cs-more:hover { box-shadow: 0 8px 32px rgba(124,1,255,0.10); transform: translateY(-2px); }
          @media (max-width: 700px) { .cs-stats { grid-template-columns: 1fr 1fr !important; } .cs-more-grid { grid-template-columns: minmax(0,1fr) !important; } }
        `}</style>
        <SiteNav active="cases" />

        <main style={{ padding: '110px 20px 80px', maxWidth: 860, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: MU, marginBottom: 28 }}>
            <a href="/case-studies" style={{ color: MU, textDecoration: 'none' }}>← All case studies</a>
          </nav>

          <header style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              <span style={{ background: `${c.accent}18`, color: c.accent, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20 }}>{c.client}</span>
              <span style={{ background: 'rgba(33,0,93,0.05)', color: MU, fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20 }}>{c.industry}</span>
              <span style={{ background: 'rgba(33,0,93,0.05)', color: MU, fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 20 }}>{c.format}</span>
            </div>
            <h1 style={{ ...DISP, fontSize: 'clamp(30px,4.6vw,52px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, margin: '0 0 22px' }}>{c.title}</h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: PD, margin: 0, borderLeft: `3px solid ${P}`, paddingLeft: 18 }}>{c.headline}</p>
          </header>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.thumb} alt={`${c.client} short-form content by The Social Vision`} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 22, display: 'block', background: c.g, marginBottom: 28 }} />

          <section aria-label="Results" className="cs-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginBottom: 48 }}>
            {c.stats.map(st => (
              <div key={st.label} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 16, padding: '18px 18px 16px' }}>
                <div style={{ ...DISP, fontSize: 24, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.1 }}>{st.val}</div>
                <div style={{ fontSize: 12.5, color: MU, marginTop: 4 }}>{st.label}</div>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: 36 }}>
            <Label>The brief</Label>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, color: MU, margin: 0 }}>{c.overview}</p>
          </section>

          <section style={{ marginBottom: 36 }}>
            <Label>What we made</Label>
            <p style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px' }}>{c.strategy}</p>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, color: MU, margin: 0 }}>{c.modalBody}</p>
          </section>

          {quotes.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <Label>What {c.client} said</Label>
              <div style={{ display: 'grid', gap: 14 }}>
                {quotes.map(t => (
                  <figure key={t.name} style={{ margin: 0, background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '24px 26px' }}>
                    <blockquote style={{ margin: '0 0 14px', fontSize: 16, lineHeight: 1.75, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption style={{ fontSize: 13.5, color: MU }}><strong style={{ color: PD }}>{t.name}</strong>, {t.role}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section style={{ background: `linear-gradient(150deg,${PD} 0%,${P} 100%)`, color: '#fff', borderRadius: 24, padding: '34px 30px', marginBottom: 56 }}>
            <h2 style={{ ...DISP, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px' }}>Your brand deserves more than 300 views.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,253,237,0.75)', margin: '0 0 22px', maxWidth: 560 }}>
              We&rsquo;re a London-based short-form content agency. Tell us where your social is stuck and we&rsquo;ll show you what we&rsquo;d change.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <TrackedLink href={BOOK_CALL_HREF} location={`case_page_${c.slug}`} style={{ background: '#FFD600', color: PD, fontWeight: 800, fontSize: 14, padding: '13px 24px', borderRadius: 100, textDecoration: 'none' }}>Book a discovery call</TrackedLink>
              <TrackedLink href="/audit" location={`case_page_${c.slug}_audit`} style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 100, textDecoration: 'none' }}>Get a free audit</TrackedLink>
            </div>
          </section>

          <section>
            <Label>More case studies</Label>
            <div className="cs-more-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14 }}>
              {others.map(o => (
                <a key={o.slug} href={`/case-studies/${o.slug}`} className="cs-more" style={{ display: 'block', background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '18px 20px', textDecoration: 'none', color: PD, transition: 'all 200ms' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: SU, marginBottom: 6 }}>{o.client}</div>
                  <div style={{ ...DISP, fontSize: 16, fontWeight: 800, lineHeight: 1.3 }}>{o.title}</div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
