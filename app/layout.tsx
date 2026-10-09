import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { SITE_URL } from '@/lib/blog';
import Trackers from './Trackers';
import CookieBanner from './CookieBanner';
import SiteAnalytics from './SiteAnalytics';
import { CONSENT_DEFAULT_SCRIPT } from '@/lib/consent';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// What search engines and AI assistants read about the site. The visible
// homepage copy is deliberately left alone; this is where "London" and
// "short-form content agency" live, because that is the wording AI assistants
// have been matching buyers to.
const TITLE = 'The Social Vision | London Short-Form Content Agency';
const DESCRIPTION =
  'Your brand deserves more than 300 views. London short-form content agency for apps and consumer brands: strategy, creators, filming and posting across TikTok, Reels and Shorts.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'The Social Vision',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  icons: {
    icon: '/tsv-logo.svg',
    apple: '/tsv-logo.svg',
    shortcut: '/tsv-logo.svg',
  },
};

// Who we are, in a form machines can't misread — this is also what separates
// us from the other businesses called "Social Vision".
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: 'The Social Vision',
  alternateName: 'TSV',
  legalName: 'The Social Vision Ltd',
  url: SITE_URL,
  logo: `${SITE_URL}/tsv-logo.svg`,
  image: `${SITE_URL}/logos/tsv-logo.jpeg`,
  description:
    'London-based short-form content agency. We plan, cast, film, edit and post TikTok, Instagram Reels and YouTube Shorts content for apps and consumer brands, from organic content to paid ad creative.',
  slogan: 'Short-form content for brands that want to grow.',
  foundingDate: '2024-07-17',
  founder: { '@type': 'Person', name: 'Zahira Jaigirdar', jobTitle: 'Founder & Creative Director' },
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  areaServed: [
    { '@type': 'City', name: 'London' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  identifier: { '@type': 'PropertyValue', propertyID: 'UK Companies House number', value: '15844979' },
  knowsAbout: [
    'Short-form video content',
    'TikTok marketing',
    'Instagram Reels',
    'YouTube Shorts',
    'Street interview content',
    'UGC and creator content',
    'Paid social ad creative',
  ],
  sameAs: [
    'https://www.linkedin.com/company/104219836/',
    'https://www.instagram.com/thesocialvisionuk/',
    'https://www.tiktok.com/@thesocialvisionuk',
    'https://find-and-update.company-information.service.gov.uk/company/15844979',
  ],
};

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'The Social Vision',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds a class to <html>
    // before React hydrates, which is intentional.
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        {/* Marks the page as script-capable before first paint, so the stat
            counters can hide their server-rendered totals until they animate.
            Crawlers that don't run scripts read the real totals. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Consent defaults must be set before GA loads. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ORGANIZATION, WEBSITE]) }} />
      </head>
      <body className={manrope.variable}>
        {children}
        <Trackers />
        <SiteAnalytics />
        <CookieBanner />
      </body>
    </html>
  );
}
