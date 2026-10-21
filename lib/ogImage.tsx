import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type Industry, industryPath } from '@/lib/industries';

/**
 * The share card for pages without their own (blog posts have theirs).
 * Headlines are the page's existing H1, so no new copy lives here.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type Props = {
  /** `[plain, highlighted]`: the second part gets the brand gradient, as on the page. */
  headline: [string, string];
  /** A short line under the headline, e.g. the page's category. */
  kicker: string;
  /** Path shown in the footer, e.g. '/street-interviews'. */
  path?: string;
};

/**
 * Manrope, the site font, in the weights the card uses. Fetched from Google
 * Fonts when the image is built; if that fails the card falls back to the
 * default font rather than failing the build.
 */
async function loadManrope(weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: 'Manrope', data: await (await fetch(url)).arrayBuffer(), weight: weight as 600 | 800, style: 'normal' as const };
  } catch {
    return null;
  }
}

export async function renderOgImage({ headline, kicker, path = '' }: Props) {
  const logo = await readFile(join(process.cwd(), 'public/logos/tsv-logo-mark.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  const fonts = (await Promise.all([loadManrope(600), loadManrope(800)])).filter(f => f !== null);
  const length = headline[0].length + headline[1].length;
  // One span per word, so the highlighted part wraps like the rest of the line.
  const words = [
    ...headline[0].split(' ').filter(Boolean).map(w => ({ w, hi: false })),
    ...headline[1].split(' ').filter(Boolean).map(w => ({ w, hi: true })),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#21005D',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          position: 'relative',
          fontFamily: fonts.length ? 'Manrope' : 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,1,255,0.45) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 440,
            height: 440,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,32,164,0.3) 0%, transparent 70%)',
          }}
        />

        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 26, fontWeight: 600, marginBottom: 28 }}>{kicker}</div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: length > 50 ? 64 : 78,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'white',
            maxWidth: 1000,
            flex: 1,
          }}
        >
          {words.map(({ w, hi }, i) => (
            <span
              key={i}
              style={{
                marginRight: '0.24em',
                ...(hi && {
                  backgroundImage: 'linear-gradient(135deg, #A200FF, #E820A4, #FF7ED3)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }),
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={44} height={44} style={{ borderRadius: '50%' }} alt="" />
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20, fontWeight: 600 }}>The Social Vision</div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20 }}>·</div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 20 }}>{`thesocialvision.co.uk${path}`}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}

/** The share card for an industry or format page: its H1, with the label above it. */
export function renderIndustryOgImage(ind: Industry) {
  const headline: [string, string] = ind.headline
    ? [ind.headline[0].trim(), ind.headline[1]]
    : [`${ind.headlineStart} more than`, '300\u00a0views.'];
  return renderOgImage({ headline, kicker: ind.label, path: industryPath(ind) });
}
