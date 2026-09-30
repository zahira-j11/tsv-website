import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/blog';

// The audit page is a client component, so its metadata lives here. Without
// it the page inherited the homepage's title and description.
const TITLE = 'Free Social Media Audit | The Social Vision';
const DESCRIPTION =
  'Find out exactly what we’d change about your social. A London short-form content agency reviews your organic content, competitors and paid creative, then walks you through a 90-day plan.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/audit` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/audit`, siteName: 'The Social Vision', type: 'website' },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
