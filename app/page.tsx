import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/blog';
import MarketingPage from './HomeClient';

// The page itself is a client component, so its metadata lives here. Title,
// description and share image come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return <MarketingPage />;
}
