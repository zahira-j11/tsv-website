import { ImageResponse } from 'next/og';
import { getPostBySlug, CATEGORIES } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? 'The Social Vision';
  const description = post?.description ?? 'Short-form content for brands.';
  const category = post?.category ?? 'strategy';
  const cat = CATEGORIES[category];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#21005D',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,1,255,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,32,164,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Category pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 16px',
            borderRadius: 999,
            background: cat.bg,
            color: cat.color,
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 32,
            width: 'fit-content',
          }}
        >
          {cat.label}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 38 : 48,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.2,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
            maxWidth: 800,
            flex: 1,
          }}
        >
          {description.length > 140 ? description.slice(0, 140) + '…' : description}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#7C01FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 500 }}>
            The Social Vision
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>·</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
            thesocialvision.co.uk/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
