import type { Metadata } from 'next';
import IndustryView, { industryMetadata } from '../industries/IndustryView';
import { getIndustry } from '@/lib/industries';

const ind = getIndustry('street-interviews')!;

export const metadata: Metadata = industryMetadata(ind);

export default function StreetInterviewsPage() {
  return <IndustryView ind={ind} />;
}
