import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage';

export const alt = 'The Social Vision: your brand deserves more than 300 views';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    headline: ['Your brand deserves more than', '300\u00a0views.'],
    kicker: 'London short-form content agency',
  });
}
