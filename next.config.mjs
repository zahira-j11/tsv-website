/**
 * URLs from the previous site (before the June 2026 rebuild) that people and
 * search engines still arrive on. Each points at the closest thing on the
 * current site; swap a destination for a real page (/about, /pricing,
 * /case-studies) as those pages go live.
 */
const LEGACY_REDIRECTS = [
  ['/about-us', '/about'],
  ['/aboutus', '/about'],
  ['/about-the-company', '/about'],
  ['/our-story', '/about'],
  ['/who-we-are', '/about'],
  ['/company', '/about'],
  ['/team', '/about'],
  ['/our-team', '/about'],
  ['/people', '/about'],
  ['/careers', '/'],
  ['/lander', '/'],
  ['/contact', '/#contact'],
  ['/contact-us', '/#contact'],
  ['/services', '/#services'],
  ['/what-we-do', '/#services'],
  ['/work', '/case-studies'],
  ['/portfolio', '/case-studies'],
  ['/case-study', '/case-studies'],
  ['/pricing', '/#pricing'],
  ['/post/:slug*', '/blog'],
  // Blog posts retired or reworked in Oct 2026.
  ['/blog/tiktok-views-dropped', '/blog/stuck-on-300-views'],
  ['/blog/tiktok-algorithm-2026', '/blog/shares-beat-views'],
  ['/blog/ugc-vs-brand-content-tiktok', '/case-studies/plum'],
  ['/case-habito.png', '/case-studies/habito.jpg'],
  ['/case-habito.jpg', '/case-studies/habito.jpg'],
  ['/case-talab.png', '/case-studies/talab.webp'],
  ['/privacy-policy', '/privacy'],
  // Free audit retired Oct 2026: it drew leads outside our budget and sector.
  ['/audit', '/#contact'],
];

// Report-only until a week of normal browsing shows no violations. Inline
// scripts and style attributes are part of the current pages (consent
// bootstrap, JSON-LD, and the styled markup), so those need 'unsafe-inline'.
// HubSpot's loader still uses eval. Tighten both before this policy is enforced.
// upgrade-insecure-requests is left out: browsers ignore it in a report-only
// policy and log that on every page. Add it when the policy is enforced.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://va.vercel-scripts.com',
    'https://js-eu1.hs-scripts.com',
    'https://*.hs-scripts.com',
    'https://*.hs-analytics.net',
    'https://*.hsadspixel.net',
    'https://*.hs-banner.com',
    'https://*.usemessages.com',
    'https://*.hscollectedforms.net',
    'https://*.hsleadflows.net',
    'https://*.hsforms.net',
    'https://*.hsforms.com',
    'https://*.hubspot.com',
    'https://*.hubspot.net',
    'https://*.hs-sites.com',
  ].join(' '),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  [
    "img-src 'self' data: blob:",
    'https://res.cloudinary.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.hubspot.com',
    'https://*.hsforms.com',
    'https://*.hubspotusercontent.net',
  ].join(' '),
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "connect-src 'self'",
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://analytics.google.com',
    'https://*.analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://www.googletagmanager.com',
    'https://vitals.vercel-insights.com',
    'https://va.vercel-scripts.com',
    'https://*.hubspot.com',
    'https://*.hs-analytics.net',
    'https://*.hscollectedforms.net',
    'https://*.hsforms.com',
    'https://*.hubspotusercontent.net',
  ].join(' '),
  "media-src 'self' blob: https://res.cloudinary.com",
  "frame-src 'self' https://*.hubspot.com",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.hubspot.com",
  "base-uri 'self'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  // [CHECK] includeSubDomains assumes every thesocialvision.co.uk host is HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains' },
  { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No "use server" files. Do not set serverActions.allowedOrigins, and do not
  // raise the body limit. Do not send Access-Control-Allow-Origin; the site is
  // same-origin and a wildcard would expose HTML to any caller.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
