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
  ['/privacy-policy', '/privacy'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
      bodySizeLimit: '25mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
