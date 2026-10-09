import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '../../SiteNav';
import TrackedLink from '../../case-studies/TrackedLink';
import { INDUSTRIES, getIndustry, type Industry } from '@/lib/industries';
import { BOOK_CALL_HREF } from '@/lib/caseStudies';
import { SITE_URL } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

const BG = '#FEFDF8';
const WH = '#FFFFFF';
const P  = '#7C01FF';
const PD = '#21005D';
const MU = 'rgba(33,0,93,0.64)';
const BR = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };

export async function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  const url = `${SITE_URL}/industries/${ind.slug}`;
  return {
    title: ind.metaTitle,
    description: ind.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: ind.metaTitle, description: ind.metaDescription, url, siteName: 'The Social Vision', type: 'website' },
    twitter: { card: 'summary_large_image', title: ind.metaTitle, description: ind.metaDescription },
  };
}

function JsonLd({ ind }: { ind: Industry }) {
  const url = `${SITE_URL}/industries/${ind.slug}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Short-form content for ${ind.label.toLowerCase()}`,
      serviceType: 'Short-form video content (TikTok, Instagram Reels, YouTube Shorts)',
      description: ind.metaDescription,
      url,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ind.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: ind.label, item: url },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const h2: React.CSSProperties = { ...DISP, fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.12, margin: '0 0 18px' };
const body: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: MU, margin: '0 0 14px' };

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  return (
    <>
      <JsonLd ind={ind} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: PD }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          .ind-body a { color: ${P}; font-weight: 700; text-decoration: none; }
          .ind-body a:hover { text-decoration: underline; }
          @media (max-width: 700px) { .ind-formats { grid-template-columns: minmax(0,1fr) !important; } }
        `}</style>
        <SiteNav />

        <main className="ind-body" style={{ padding: '120px 20px 80px', maxWidth: 860, margin: '0 auto' }}>
          <header style={{ marginBottom: 48 }}>
            <h1 style={{ ...DISP, fontSize: 'clamp(34px,5.2vw,58px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.04, margin: '0 0 26px' }}>
              {ind.headlineStart} more than <span className="mkt-gradient-text">300 views.</span>
            </h1>
            {ind.intro.map(p => <p key={p.slice(0, 24)} style={{ ...body, fontSize: 18 }}>{p}</p>)}
          </header>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>{ind.formatsHeading}</h2>
            <div className="ind-formats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 14 }}>
              {ind.formats.map(f => (
                <div key={f.title} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '22px 22px 20px' }}>
                  <div style={{ ...DISP, fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{f.title.replace(/\.$/, '')}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: MU, margin: 0 }}>{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>{ind.processHeading}</h2>
            <p style={body}>{ind.processBody}</p>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>{ind.resultsHeading}</h2>
            {ind.results.map(r => (
              <p key={r.slug} style={body}>
                <a href={`/case-studies/${r.slug}`}>{r.client}</a>: {r.body}
              </p>
            ))}
            {ind.quote && (
              <figure style={{ margin: '24px 0 18px', background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '24px 26px' }}>
                <blockquote style={{ margin: '0 0 12px', fontSize: 17, lineHeight: 1.7, fontStyle: 'italic', color: PD }}>&ldquo;{ind.quote.text}&rdquo;</blockquote>
                <figcaption style={{ fontSize: 13.5, color: MU }}><strong style={{ color: PD }}>{ind.quote.name}</strong>, {ind.quote.role}</figcaption>
              </figure>
            )}
            {ind.clientsLine && <p style={{ ...body, fontSize: 15 }}>{ind.clientsLine}</p>}
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>Quick answers</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {ind.faqs.map(f => (
                <div key={f.q} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 16, padding: '20px 22px' }}>
                  <h3 style={{ ...DISP, fontSize: 16.5, fontWeight: 800, margin: '0 0 8px' }}>{f.q}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: MU, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: `linear-gradient(150deg,${PD} 0%,${P} 100%)`, color: '#fff', borderRadius: 24, padding: '36px 32px', textAlign: 'center' }}>
            <h2 style={{ ...DISP, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px' }}>{ind.closing}</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(255,253,237,0.75)', lineHeight: 1.7, margin: '0 auto 22px', maxWidth: 520 }}>Book a call and we&rsquo;ll show you what we&rsquo;d make.</p>
            <TrackedLink href={BOOK_CALL_HREF} location={`industry_${ind.slug}`} style={{ display: 'inline-block', background: '#FFD600', color: PD, fontWeight: 800, fontSize: 14, padding: '13px 26px', borderRadius: 100, textDecoration: 'none' }}>Book a call</TrackedLink>
          </section>
        </main>
      </div>
    </>
  );
}
