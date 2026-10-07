/**
 * URLs from the previous site (before the June 2026 rebuild) that people and
 * search engines still arrive on. Each points at the closest thing on the
 * current site; swap a destination for a real page (/about, /pricing,
 * /case-studies) as those pages go live.
 */
const LEGACY_REDIRECTS = [
  ['/about', '/'],
  ['/about-us', '/'],
  ['/aboutus', '/'],
  ['/about-the-company', '/'],
  ['/our-story', '/'],
  ['/who-we-are', '/'],
  ['/company', '/'],
  ['/team', '/'],
  ['/our-team', '/'],
  ['/people', '/'],
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
