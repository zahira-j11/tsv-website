import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage';

export const alt = 'UGC Agency UK, based in London';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgImage({
    headline: ['UGC Agency UK,', 'based in London.'],
    kicker: 'TikTok, Instagram and YouTube',
    path: '/ugc-agency',
  });
}
