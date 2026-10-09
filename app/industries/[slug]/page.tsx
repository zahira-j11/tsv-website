import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryView, { industryMetadata } from '../IndustryView';
import { INDUSTRIES, getIndustry } from '@/lib/industries';

type Props = { params: Promise<{ slug: string }> };

// Pages with their own path (like /street-interviews) aren't served here.
export async function generateStaticParams() {
  return INDUSTRIES.filter(i => !i.path).map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  return ind && !ind.path ? industryMetadata(ind) : {};
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind || ind.path) notFound();
  return <IndustryView ind={ind} />;
}
