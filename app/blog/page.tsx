import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, CATEGORIES, AUTHORS, type Category, type Post } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | The Social Vision',
  description:
    'Strategy, case studies, and platform insights from the team behind 200M+ organic views. Short-form content thinking for brands that want to grow without ads.',
  openGraph: {
    title: 'Blog | The Social Vision',
    description: 'Strategy, case studies, and platform insights from The Social Vision.',
    url: 'https://thesocialvision.co.uk/blog',
    siteName: 'The Social Vision',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | The Social Vision',
    description: 'Strategy, case studies, and platform insights from The Social Vision.',
  },
  alternates: {
    canonical: 'https://thesocialvision.co.uk/blog',
    types: { 'application/rss+xml': '/feed.xml' },
  },
};

const BG  = '#FEFDF8';
const WH  = '#FFFFFF';
const P   = '#7C01FF';
const PD  = '#21005D';
const MAG = '#E820A4';
const MU  = 'rgba(33,0,93,0.52)';
const SU  = 'rgba(33,0,93,0.28)';
const BR  = '#E4DCFF';

function CategoryChip({ category }: { category: Category }) {
  const cat = CATEGORIES[category];
  return (
    <span
      style={{ color: cat.color, background: cat.bg, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, display: 'inline-block' }}
    >
      {cat.label}
    </span>
  );
}

function PostCard({ post }: { post: Post }) {
  const author = AUTHORS[post.author] ?? AUTHORS.tsv;
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: WH, border: `1px solid ${BR}`, borderRadius: 20, overflow: 'hidden', transition: 'box-shadow 200ms, transform 200ms', color: 'inherit' }}
      className="blog-card">
      {post.coverImage && (
        <div style={{ width: '100%', height: 180, overflow: 'hidden', flexShrink: 0 }}>
          <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <CategoryChip category={post.category} />
        <span style={{ fontSize: 12, color: SU }}>{post.readingTime}</span>
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: PD, lineHeight: 1.35, marginBottom: 10, fontFamily: 'var(--font-display)' }}>
        {post.title}
      </h2>
      <p style={{ fontSize: 14, color: MU, lineHeight: 1.6, flex: 1, marginBottom: 20 }}>
        {post.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: `1px solid ${BR}` }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: WH, flexShrink: 0 }}>
          {author.avatar ? <img src={author.avatar} alt={author.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 58%' }} /> : author.name.charAt(0)}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: PD, margin: 0 }}>{author.name}</p>
          <p style={{ fontSize: 12, color: SU, margin: 0 }}>
            {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
      </div>
    </Link>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured || p.slug !== featured?.slug);

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="mkt-orb-c" style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, #FFD600CC 0%, #FFD600AA 60%, #FFD60022 85%, transparent 100%)', opacity: 0.28, filter: 'blur(3px)', top: '2%', left: '-6%' }} />
        <div className="mkt-orb-a" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #7C01FFCC 0%, #7C01FFAA 60%, #7C01FF22 85%, transparent 100%)', opacity: 0.12, filter: 'blur(3px)', top: '-6%', right: '-4%' }} />
        <div className="mkt-orb-b" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, #E820A4CC 0%, #E820A4AA 60%, #E820A422 85%, transparent 100%)', opacity: 0.14, filter: 'blur(3px)', bottom: '10%', right: '2%' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <style>{`
        .blog-card:hover { box-shadow: 0 8px 32px rgba(124,1,255,0.10); transform: translateY(-2px); }
        .blog-featured:hover { box-shadow: 0 12px 48px rgba(124,1,255,0.13); }
        .blog-read-link:hover { opacity: 0.7; }
        .blog-nav-link:hover { color: ${PD} !important; }
      `}</style>

      {/* Nav — matches main site pill style */}
      <nav style={{ position: 'fixed', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'min(1200px,calc(100% - 32px))', height: 54, background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(24px)', borderRadius: 100, border: `1px solid ${BR}`, boxShadow: '0 4px 28px rgba(33,0,93,0.10), 0 1px 0 rgba(255,255,255,0.8) inset' }}>
        <div style={{ height: '100%', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/tsv-logo.jpeg" alt="The Social Vision" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
          </Link>
          <div style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center' }}>
            {(['How it works', 'Services', 'Case Studies', 'Pricing', 'Testimonials'] as string[]).map(l => (
              <Link key={l} href={`/#${l.toLowerCase().replace(/\s+/g, '-')}`} className="blog-nav-link" style={{ color: MU, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'color 150ms' }}>{l}</Link>
            ))}
            <span style={{ color: P, fontSize: 13, fontWeight: 700 }}>Blog</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link href="/coming-soon" style={{ display: 'inline-block', background: 'transparent', color: P, fontSize: 13, fontWeight: 700, padding: '9px 16px', borderRadius: 100, textDecoration: 'none', border: `1.5px solid ${P}` }}>
              Client portal
            </Link>
            <Link href="/coming-soon" style={{ display: 'inline-block', background: MAG, color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 16px', borderRadius: 100, textDecoration: 'none' }}>
              Creator signup
            </Link>
            <Link href="https://meetings-eu1.hubspot.com/thesocialvision/social-discovery-call-" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: PD, color: '#fff', fontSize: 13, fontWeight: 700, padding: '11px 24px', borderRadius: 100, textDecoration: 'none' }}>
              Book a call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 48, paddingLeft: 24, paddingRight: 24, maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: MAG, marginBottom: 16 }}>
          The Social Vision · Insights
        </p>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, color: PD, lineHeight: 1.05, marginBottom: 20, fontFamily: 'var(--font-display)' }}>
          The TSV blog.
        </h1>
        <p style={{ fontSize: 18, color: MU, maxWidth: 560, lineHeight: 1.6 }}>
          Everything we know about building brands through organic short-form content, written for the people doing it.
        </p>
      </section>

      {/* Featured */}
      {featured && (
        <section style={{ padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
          <Link href={`/blog/${featured.slug}`} className="blog-featured"
            style={{ display: 'block', background: WH, border: `1px solid ${BR}`, borderRadius: 24, overflow: 'hidden', textDecoration: 'none', transition: 'box-shadow 200ms' }}>
            {featured.coverImage && (
              <div style={{ width: '100%', height: 220, overflow: 'hidden' }}>
                <img src={featured.coverImage} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            <div style={{ padding: '40px 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: P }}>Featured</span>
              <span style={{ color: BR }}>·</span>
              <CategoryChip category={featured.category} />
              <span style={{ color: BR }}>·</span>
              <span style={{ fontSize: 12, color: SU }}>{featured.readingTime}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: PD, lineHeight: 1.2, marginBottom: 12, fontFamily: 'var(--font-display)', maxWidth: 800 }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 16, color: MU, lineHeight: 1.6, maxWidth: 680, marginBottom: 28 }}>
              {featured.description}
            </p>
            <span className="blog-read-link" style={{ fontSize: 14, fontWeight: 700, color: P, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'opacity 150ms' }}>
              Read article →
            </span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section style={{ padding: '0 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SU, marginBottom: 24 }}>
            All posts
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {rest.map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </section>
      )}

      {/* Footer strip */}
      <footer style={{ borderTop: `1px solid ${BR}`, padding: '24px', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: SU }}>© {new Date().getFullYear()} The Social Vision</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/feed.xml" style={{ fontSize: 12, color: SU, textDecoration: 'none' }}>RSS</Link>
          <Link href="/sitemap.xml" style={{ fontSize: 12, color: SU, textDecoration: 'none' }}>Sitemap</Link>
        </div>
      </footer>
      </div>
    </div>
  );
}
