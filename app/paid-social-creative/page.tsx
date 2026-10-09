import type { Metadata } from 'next';
import IndustryView, { industryMetadata } from '../industries/IndustryView';
import { getIndustry } from '@/lib/industries';

const ind = getIndustry('paid-social-creative')!;

export const metadata: Metadata = industryMetadata(ind);

export default function PaidSocialCreativePage() {
  return <IndustryView ind={ind} />;
}
