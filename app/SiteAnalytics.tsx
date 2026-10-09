'use client';
import { Analytics } from '@vercel/analytics/next';

/**
 * Vercel Web Analytics: cookieless page views and referrers (chatgpt.com,
 * google, linkedin…) for every visitor, whether or not they accept cookies.
 * GA4 only sees visitors who accept, so this is the true traffic count; GA4
 * stays for the enquiry funnel. Our own /admin visits are left out.
 */
export default function SiteAnalytics() {
  return <Analytics beforeSend={e => (new URL(e.url).pathname.startsWith('/admin') ? null : e)} />;
}
