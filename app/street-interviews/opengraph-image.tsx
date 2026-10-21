import { getIndustry } from '@/lib/industries';
import { renderIndustryOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage';

export const alt = 'The Social Vision';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderIndustryOgImage(getIndustry('street-interviews')!);
}
