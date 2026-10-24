import type { Metadata } from 'next';
import SiteNav from '../SiteNav';
import TrackedLink from '../case-studies/TrackedLink';
import { BOOK_CALL_HREF, TESTIMONIALS } from '@/lib/caseStudies';
import { SITE_URL } from '@/lib/blog';

const TITLE = 'UGC Agency UK | London UGC Creators for TikTok, Instagram and YouTube';
const DESCRIPTION =
  'The Social Vision is a UGC agency in the UK, based in London. We brief, cast and edit creator video for TikTok, Instagram and YouTube. Retainers from £2,000 a month (ex VAT).';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/ugc-agency` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/ugc-agency`, siteName: 'The Social Vision', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const BG = '#FEFDF8';
const WH = '#FFFFFF';
const P = '#7C01FF';
const PD = '#21005D';
const MU = 'rgba(33,0,93,0.72)';
const BR = '#E4DCFF';
const DISP: React.CSSProperties = { fontFamily: 'var(--font-display)' };
const h2: React.CSSProperties = { ...DISP, fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.12, margin: '0 0 18px' };
const body: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: MU, margin: '0 0 14px' };

const FAQS = [
  {
    q: 'What is a UGC agency?',
    a: 'A UGC agency makes creator video that feels like a person rather than a brand advert. The Social Vision writes the briefs, casts from a UK network of 300+ real people, and edits in-house.',
  },
  {
    q: 'How much does a UGC agency cost in the UK?',
    a: 'From £2,000 a month (ex VAT). It is a monthly retainer, on a 3-month initial term, then rolling with 30 days’ notice. A per-video rate is not published.',
  },
  {
    q: 'Are you a UGC agency in London?',
    a: 'Yes. The Social Vision is based in London and works with brands across the UK.',
  },
  {
    q: 'How long until the first videos are live?',
    a: 'First content goes live within 14 to 21 days of signing.',
  },
  {
    q: 'Do you run the ads?',
    a: 'No. We make the creative. Your team or your media agency runs the campaigns, and ad spend is separate.',
  },
  {
    q: 'Do you do influencer marketing?',
    a: 'No. We make UGC and short-form content, not influencer campaigns.',
  },
];

const prep = TESTIMONIALS.find(t => t.client === 'Prep Kitchen');

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'UGC Agency UK',
    serviceType: 'UGC and creator video for TikTok, Instagram and YouTube',
    description: DESCRIPTION,
    url: `${SITE_URL}/ugc-agency`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'City', name: 'London' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'UGC Agency UK', item: `${SITE_URL}/ugc-agency` },
    ],
  },
];

const LINKS = [
  ['What is UGC?', '/docs/formats/ugc'],
  ['How a retainer runs', '/docs/how-we-work'],
  ['How to brief UGC creators', '/docs/briefing-ugc-creators'],
  ['How much it costs', '/docs/reference/pricing'],
  ['Usage rights', '/docs/ugc-usage-rights'],
  ['Hooks, and how many to test', '/docs/ugc-hooks'],
  ['Paid social creative', '/paid-social-creative'],
  ['Street interviews', '/street-interviews'],
  ['Questions we get asked', '/docs/faq'],
] as const;

export default function UgcAgencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)', color: PD }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          .ugc-body a { color: ${P}; font-weight: 700; text-decoration: none; }
          .ugc-body a:hover { text-decoration: underline; }
          @media (max-width: 700px) { .ugc-grid { grid-template-columns: minmax(0,1fr) !important; } }
        `}</style>
        <SiteNav />
        <main className="ugc-body" style={{ padding: '120px 20px 80px', maxWidth: 860, margin: '0 auto' }}>
          <header style={{ marginBottom: 48 }}>
            <h1 style={{ ...DISP, fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.05, margin: '0 0 22px' }}>
              UGC Agency UK, <span className="mkt-gradient-text">based in London</span>
            </h1>
            <p style={{ ...body, fontSize: 18 }}>
              The Social Vision is a UGC agency in the UK, based in London. We plan the concepts, cast real creators from a network of 300+, and edit the videos in-house for TikTok, Instagram and YouTube. You approve the concepts and the casting, then you approve the final video. We do not run your ad spend.
            </p>
            <p style={body}>
              UGC here means lower-fi creator video, the kind that feels made by a person rather than a brand. We make UGC and short-form content with our creators. We don&rsquo;t run influencer marketing or influencer campaigns. The longer explanation is on <a href="/docs/formats/ugc">what UGC is</a>.
            </p>
          </header>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>What we make</h2>
            <div className="ugc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                ['Remote creator UGC', 'Creators in the network film from their own space, to a brief we write after you approve the copy. They send raw footage. We edit.'],
                ['UGC creators on your channels', 'A recurring face on your own brand channels: TikTok, Instagram and YouTube.'],
                ['Hi-fi and scripted paid ads', 'Higher-production videos we shoot ourselves, still built with two hooks so your team has something to test.'],
                ['Street interviews', 'A presenter, questions we write, and a location chosen for the people you want to hear from. The service page is separate.'],
              ].map(([title, text]) => (
                <div key={title} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '20px 20px 16px' }}>
                  <div style={{ ...DISP, fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{title}</div>
                  <p style={{ ...body, fontSize: 15, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
            <p style={{ ...body, marginTop: 16 }}>
              Street interviews are written up on <a href="/street-interviews">their own page</a>. Paid creative is on <a href="/paid-social-creative">paid social creative</a>.
            </p>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>Examples</h2>
            <p style={body}>
              <a href="/case-studies/plum">Plum</a>, a money app, uses us as its paid social creative partner. The work is hi-fi ads, UGC-style content and scripted interactions, so the performance team can test without managing creators. Creative output went up three times.
            </p>
            {prep && (
              <figure style={{ margin: '18px 0', background: WH, border: `1.5px solid ${BR}`, borderRadius: 18, padding: '22px 24px' }}>
                <blockquote style={{ margin: '0 0 10px', fontSize: 17, lineHeight: 1.7, fontStyle: 'italic', color: PD }}>&ldquo;{prep.quote}&rdquo;</blockquote>
                <figcaption style={{ fontSize: 13.5, color: MU }}><strong style={{ color: PD }}>{prep.name}</strong>, {prep.role}</figcaption>
              </figure>
            )}
            <p style={body}>
              Organic examples, if you want the other half of the work, are <a href="/case-studies/habito">Habito</a> (25 million organic views in 8 months, zero ad spend), <a href="/case-studies/uni-compare">Uni Compare</a> (1 million views in the first 8 weeks) and <a href="/case-studies/talab">TALAB</a> (6,000 users, with 1 million views in the first 5 weeks). Applicaa and Blackbullion are named on the site as well.
            </p>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>How pricing works</h2>
            <p style={body}>
              From £2,000 a month (ex VAT). The retainer is one monthly fee, scoped to the goal and the formats, on a 3-month initial term. After that it rolls monthly, with 30 days’ notice. Strategy, creators, editing, revisions, organic posting and reporting are included. Ad spend is not. Revisions are included, and the number of rounds is agreed in each brief. Organic retainers include a minimum of 16 videos a month. The paid minimum depends on the budget. The content includes perpetual usage rights. Paid use is not included. A per-video price is not published.
            </p>
            <p style={body}>
              The breakdown is on <a href="/docs/reference/pricing">how much UGC costs</a>. The month itself is on <a href="/docs/how-we-work">how a retainer runs</a>.
            </p>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>Read the docs</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {LINKS.map(([label, href]) => (
                <li key={href} style={{ ...body, marginBottom: 6 }}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: 56 }}>
            <h2 style={h2}>Quick answers</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {FAQS.map(f => (
                <div key={f.q} style={{ background: WH, border: `1.5px solid ${BR}`, borderRadius: 16, padding: '18px 20px' }}>
                  <h3 style={{ ...DISP, fontSize: 16.5, fontWeight: 800, margin: '0 0 8px' }}>{f.q}</h3>
                  <p style={{ ...body, fontSize: 15, margin: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: `linear-gradient(150deg,${PD} 0%,${P} 100%)`, color: '#fff', borderRadius: 24, padding: '36px 32px', textAlign: 'center' }}>
            <h2 style={{ ...DISP, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, letterSpacing: '-.03em', margin: '0 0 10px' }}>Tell us what you want tested.</h2>
            <p style={{ fontSize: 15.5, color: 'rgba(255,253,237,0.75)', lineHeight: 1.7, margin: '0 auto 22px', maxWidth: 520 }}>A discovery call covers the formats, the scope and what the first month would look like.</p>
            <TrackedLink href={BOOK_CALL_HREF} location="ugc_agency" style={{ display: 'inline-block', background: '#FFD600', color: PD, fontWeight: 800, fontSize: 14, padding: '13px 26px', borderRadius: 100, textDecoration: 'none' }}>Book a call</TrackedLink>
          </section>
        </main>
      </div>
    </>
  );
}
