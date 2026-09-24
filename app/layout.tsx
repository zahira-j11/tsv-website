import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Social Vision | Short-Form Content Agency',
  description:
    'We build and run your entire short-form content engine. 200M+ organic views, 200+ vetted creators, first content live in 14 days.',
  icons: {
    icon: '/tsv-logo.svg',
    apple: '/tsv-logo.svg',
    shortcut: '/tsv-logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
