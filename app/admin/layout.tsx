import type { Metadata } from 'next';

// Internal only — keep it out of search results and the sitemap.
export const metadata: Metadata = {
  title: 'Admin — The Social Vision',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
