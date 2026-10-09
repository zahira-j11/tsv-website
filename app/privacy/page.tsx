import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/blog';
import CookieSettingsLink from './CookieSettingsLink';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Social Vision',
  description: 'How The Social Vision Ltd collects, uses and protects personal information on thesocialvision.co.uk, including cookies and audit applications.',
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const BG = '#FEFDF8';
const PD = '#21005D';
const P  = '#7C01FF';
const MU = 'rgba(33,0,93,0.72)';
const BR = '#E4DCFF';

const UPDATED = '9 October 2026';
const CONTACT_EMAIL = 'zahira@thesocialvision.co.uk';

const h2: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', color: PD, margin: '40px 0 12px' };
const p: React.CSSProperties = { fontSize: 15.5, color: MU, lineHeight: 1.8, margin: '0 0 14px' };
const li: React.CSSProperties = { fontSize: 15.5, color: MU, lineHeight: 1.8, marginBottom: 6 };
const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: `1.5px solid ${BR}`, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: PD };
const td: React.CSSProperties = { padding: '10px 12px', borderBottom: `1px solid ${BR}`, fontSize: 14, color: MU, verticalAlign: 'top' };

export default function PrivacyPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: 'var(--font-sans)', color: PD }}>
      <header style={{ padding: '20px 24px', borderBottom: `1px solid ${BR}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: PD, textDecoration: 'none' }}>The Social Vision</Link>
          <Link href="/" style={{ fontSize: 13, fontWeight: 600, color: MU, textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,46px)', fontWeight: 800, letterSpacing: '-.04em', margin: '0 0 10px' }}>Privacy policy</h1>
        <p style={{ ...p, fontSize: 13.5 }}>Last updated {UPDATED}</p>

        <p style={p}>This policy explains what personal information The Social Vision collects through this website, why, and what you can do about it. We keep it short and plain on purpose.</p>

        <h2 style={h2}>Who we are</h2>
        <p style={p}>
          The Social Vision Ltd (&ldquo;The Social Vision&rdquo;, &ldquo;we&rdquo;) is a London-based short-form content agency, registered in England and Wales, company number 15844979.
          Registered office: 184 Winchester House, Bond Way, Bracknell, RG12 1LE. We are the controller of the personal information described here.
          For anything about your data, email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: P }}>{CONTACT_EMAIL}</a>.
        </p>

        <h2 style={h2}>What we collect and why</h2>
        <div style={{ overflowX: 'auto', margin: '6px 0 14px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560 }}>
            <thead><tr><th style={th}>When</th><th style={th}>What</th><th style={th}>Why, and our lawful basis</th></tr></thead>
            <tbody>
              <tr>
                <td style={td}>You apply for a free social media audit</td>
                <td style={td}>Name, work email, company, job title, website or social handle, platforms you use, monthly social budget, team size, your biggest challenge, and how you heard about us</td>
                <td style={td}>To decide whether an audit fits, prepare for it and follow up. Legitimate interests, and steps you ask us to take before any contract.</td>
              </tr>
              <tr>
                <td style={td}>You book a discovery call or audit</td>
                <td style={td}>The details you enter in the booking form (via HubSpot), and anything you tell us on the call</td>
                <td style={td}>To hold the call and talk about working together. Steps before a contract, and legitimate interests.</td>
              </tr>
              <tr>
                <td style={td}>You browse the site</td>
                <td style={td}>Pages visited, how you arrived (for example a search engine or AI assistant), device and approximate location</td>
                <td style={td}>To understand which pages help people find us. With cookies only if you accept them (see Cookies); otherwise cookieless, aggregate measurement only.</td>
              </tr>
              <tr>
                <td style={td}>You email us</td>
                <td style={td}>Your email and what you send</td>
                <td style={td}>To reply. Legitimate interests.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={p}>We don&rsquo;t sell personal information, and we don&rsquo;t use it for automated decisions with legal or similar effects. The audit budget question decides whether we offer an audit slot; a person reviews every application.</p>
        <p style={p}>If you are a creator applying to our creator network, that happens on our separate creator portal and its own privacy notice applies.</p>

        <h2 style={h2}>Who we share it with</h2>
        <p style={p}>Only with the services that run this website and our sales process, each acting on our instructions:</p>
        <ul style={{ paddingLeft: 20, margin: '0 0 14px' }}>
          <li style={li}><strong>HubSpot</strong>: CRM, meeting booking and (if you accept cookies) website analytics. Our account is hosted in HubSpot&rsquo;s EU data centre.</li>
          <li style={li}><strong>Google Analytics</strong>: website analytics.</li>
          <li style={li}><strong>Vercel</strong>: website hosting, and cookieless visit counts (Vercel Web Analytics) showing which pages are viewed and which site you came from, without cookies or anything that identifies you.</li>
          <li style={li}><strong>MongoDB Atlas</strong>: storage for audit applications.</li>
          <li style={li}><strong>Resend</strong>: sends us a notification email when you apply.</li>
          <li style={li}><strong>Cloudinary</strong>: hosts the videos on this site (it sees standard request data such as your IP address).</li>
        </ul>
        <p style={p}>Some of these providers are based in, or have staff in, the United States. Where personal information leaves the UK, it is protected by the UK&rsquo;s adequacy regulations (including the UK–US data bridge) or by the International Data Transfer Addendum to standard contractual clauses.</p>

        <h2 id="cookies" style={h2}>Cookies</h2>
        <p style={p}>We only set analytics cookies if you click &ldquo;Accept&rdquo; in the cookie banner. If you reject or ignore it, Google Analytics runs in consent mode without cookies, and HubSpot&rsquo;s tracking code isn&rsquo;t loaded. We also count page views with Vercel Web Analytics, which doesn&rsquo;t use cookies or store anything on your device, so it runs whether or not you accept.</p>
        <div style={{ overflowX: 'auto', margin: '6px 0 14px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead><tr><th style={th}>Cookie</th><th style={th}>Set by</th><th style={th}>Purpose</th><th style={th}>Lasts</th></tr></thead>
            <tbody>
              <tr><td style={td}><code>_ga</code>, <code>_ga_*</code></td><td style={td}>Google Analytics</td><td style={td}>Tells visits apart so we can count them</td><td style={td}>Up to 2 years</td></tr>
              <tr><td style={td}><code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code>, <code>__hssrc</code></td><td style={td}>HubSpot</td><td style={td}>Links a booking to how you first found us</td><td style={td}>Session to 6 months</td></tr>
            </tbody>
          </table>
        </div>
        <p style={p}>Your choice is saved in your browser (not a cookie) so we don&rsquo;t ask again. You can change it at any time: <CookieSettingsLink />.</p>

        <h2 style={h2}>How long we keep it</h2>
        <ul style={{ paddingLeft: 20, margin: '0 0 14px' }}>
          <li style={li}>Audit applications and enquiries we don&rsquo;t take further: up to 24 months, then deleted.</li>
          <li style={li}>Clients: for the length of the relationship and up to 6 years afterwards, for legal and accounting reasons.</li>
          <li style={li}>Analytics data: 14 months in Google Analytics.</li>
        </ul>

        <h2 style={h2}>Your rights</h2>
        <p style={p}>You can ask us for a copy of your information, to correct it, to delete it, to restrict or object to how we use it, or to move it to another service. You can object at any time to us contacting you about our services. Email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: P }}>{CONTACT_EMAIL}</a> and we&rsquo;ll respond within one month.</p>
        <p style={p}>If you&rsquo;re unhappy with how we&rsquo;ve handled your information, please tell us first. You can also complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk/make-a-complaint/" style={{ color: P }}>ico.org.uk</a>.</p>

        <h2 style={h2}>Changes</h2>
        <p style={p}>If we change how we use personal information, we&rsquo;ll update this page and the date at the top.</p>
      </main>
    </div>
  );
}
