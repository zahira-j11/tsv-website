import CookieSettingsLink from './privacy/CookieSettingsLink';

/**
 * The site footer for pages other than the homepage (blog, docs, case studies,
 * industry and service pages). It mirrors the homepage footer in
 * app/HomeClient.tsx: same columns, links and mkt-footer classes. Section
 * links point back at the homepage anchors.
 *
 * Besides navigation, it is how /about, the industry pages and the service
 * pages get linked from every page, so search engines see them as central.
 * If the homepage footer changes, change this too.
 */

const PD  = '#21005D';
const WH  = '#FFFFFF';
const YEL = '#FFD600';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thesocialvisionuk/',
    icon: 'M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8 M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0 M16.5 7.5v.01' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@thesocialvisionuk',
    icon: 'M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/104219836/',
    icon: 'M8 11v5 M8 8v.01 M12 16v-5 M16 16v-3a2 2 0 1 0 -4 0 M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10' },
];

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  { title: 'Company', links: [
    { label: 'About us', href: '/about' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Docs', href: '/docs' },
    { label: 'Testimonials', href: '/#testimonials' },
    { label: 'Blog', href: '/blog' },
  ]},
  { title: 'Services', links: [
    { label: 'Organic content', href: '/#services' },
    { label: 'Paid ad creative', href: '/paid-social-creative' },
    { label: 'Fintech and finance', href: '/industries/fintech' },
    { label: 'Education brands', href: '/industries/education' },
    { label: 'Consumer apps', href: '/industries/apps' },
    { label: 'Street interviews', href: '/street-interviews' },
    { label: 'UGC agency', href: '/ugc-agency' },
    { label: 'Pricing', href: '/#pricing' },
  ]},
  { title: 'Work with us', links: [
    { label: 'For Creators', href: 'https://www.tsvportal.co.uk/creator', external: true },
    { label: 'Talk to our team', href: '/#contact' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Privacy policy', href: '/privacy' },
  ]},
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" style={{ padding: '64px 28px 28px', background: PD }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="mkt-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 32, paddingBottom: 40, borderBottom: '1px solid rgba(255,253,237,0.12)' }}>
          <div className="mkt-footer-brand">
            <img src="/logos/tsv-logo-mark.png" alt="" style={{ width: 40, height: 40, display: 'block' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: WH, letterSpacing: '-.03em', margin: '14px 0 6px' }}>The Social Vision</div>
            <p style={{ fontSize: 13, color: 'rgba(255,253,237,0.55)', lineHeight: 1.6, maxWidth: 260, margin: 0 }}>Short-form content for brands that want to grow.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="site-footer-social"
                  style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,253,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: WH, transition: 'all 150ms' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: YEL, marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l.label} href={l.href} className="site-footer-link" {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{ display: 'block', marginBottom: 11, fontSize: 14, fontWeight: 500, color: 'rgba(255,253,237,0.7)', textDecoration: 'none', transition: 'color 150ms' }}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 22, fontSize: 12, color: 'rgba(255,253,237,0.45)' }}>
          © {new Date().getFullYear()} The Social Vision Ltd · London-based short-form content agency ·{' '}
          <CookieSettingsLink label="Cookie settings" style={{ color: 'inherit' }} /> ·{' '}
          <a href="/feed.xml" className="site-footer-link" style={{ color: 'inherit' }}>RSS</a>
        </div>
      </div>
    </footer>
  );
}
