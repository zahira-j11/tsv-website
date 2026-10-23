import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsArticle from '@/components/docs/DocsArticle';
import { SITE_URL } from '@/lib/blog';
import { DOCS, docPath, getDoc } from '@/lib/docs';
import '../docs.css';

type Props = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return DOCS.map(doc => ({ slug: doc.slug ? doc.slug.split('/') : [] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = getDoc(slug.join('/'));
  if (!doc) return {};
  const url = `${SITE_URL}${docPath(doc)}`;
  return {
    title: doc.seoTitle,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: {
      title: doc.seoTitle,
      description: doc.description,
      url,
      siteName: 'The Social Vision',
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: doc.seoTitle, description: doc.description },
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug = [] } = await params;
  const doc = getDoc(slug.join('/'));
  if (!doc) notFound();
  return <DocsArticle doc={doc} />;
}
