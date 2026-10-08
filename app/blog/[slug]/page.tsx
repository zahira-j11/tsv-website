import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '../../SiteNav';
import TrackedLink from '../../case-studies/TrackedLink';
import { BOOK_CALL_HREF } from '@/lib/caseStudies';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  extractHeadings,
  CATEGORIES,
  AUTHORS,
  SITE_URL,
  type Post,
  type Category,
} from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

const BG  = '#FEFDF8';
const WH  = '#FFFFFF';
const P   = '#7C01FF';
const PD  = '#21005D';
const MAG = '#E820A4';
const MU  = 'rgba(33,0,93,0.64)';
const SU  = 'rgba(33,0,93,0.28)';
const BR  = '#E4DCFF';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const author = AUTHORS[post.author] ?? AUTHORS.tsv;
  return {
    title: `${post.title} | The Social Vision`,
    description: post.description,
    authors: [{ name: author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'The Social Vision',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [author.name],
      tags: post.tags,
      images: [{ url: `${SITE_URL}/blog/${slug}/opengraph-image` }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  };
}

function JsonLd({ post }: { post: Post }) {
  const author = AUTHORS[post.author] ?? AUTHORS.tsv;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Person', name: author.name },
    publisher: { '@type': 'Organization', name: 'The Social Vision', logo: { '@type': 'ImageObject', url: `${SITE_URL}/tsv-logo.svg` } },
    url: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    keywords: post.tags.join(', '),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function CategoryChip({ category }: { category: Category }) {
  const cat = CATEGORIES[category];
  return (
    <span style={{ color: cat.color, background: cat.bg, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, display: 'inline-block' }}>
      {cat.label}
    </span>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(slug, post.category, 3);
  const author = AUTHORS[post.author] ?? AUTHORS.tsv;

  return (
    <>
      <JsonLd post={post} />
      <div style={{ minHeight: '100vh', background: BG, fontFamily: 'var(--font-sans)' }}>
        <style>{`
          .blog-nav-link:hover { color: ${PD} !important; }
          .blog-back:hover { color: ${PD} !important; }
          .blog-toc-link:hover { color: ${P} !important; }
          .blog-related:hover { box-shadow: 0 8px 32px rgba(124,1,255,0.10); transform: translateY(-2px); }
          .prose-tsv h2 { font-size: 1.5rem; font-weight: 700; color: ${PD}; margin-top: 2.5rem; margin-bottom: 0.75rem; font-family: var(--font-display); }
          .prose-tsv h3 { font-size: 1.2rem; font-weight: 700; color: ${PD}; margin-top: 2rem; margin-bottom: 0.5rem; font-family: var(--font-display); }
          .prose-tsv p { color: ${MU}; line-height: 1.8; margin-bottom: 1.2rem; font-size: 16px; }
          .prose-tsv strong { color: ${PD}; font-weight: 700; }
          .prose-tsv em { color: ${MU}; font-style: italic; }
          .prose-tsv a { color: ${P}; text-decoration: none; font-weight: 600; }
          .prose-tsv a:hover { text-decoration: underline; }
          .prose-tsv ul, .prose-tsv ol { color: ${MU}; padding-left: 1.5rem; margin-bottom: 1.2rem; line-height: 1.8; font-size: 16px; }
          .prose-tsv li { margin-bottom: 0.35rem; }
          .prose-tsv hr { border: none; border-top: 1px solid ${BR}; margin: 2.5rem 0; }
          .prose-tsv blockquote { border-left: 3px solid ${P}; padding-left: 1.2rem; color: ${MU}; margin: 1.5rem 0; font-style: italic; }
          /* One column on phones and small tablets: the article first, then contents and the call-to-action. */
          @media (max-width: 900px) {
            .blog-post-grid { grid-template-columns: minmax(0,1fr) !important; gap: 40px !important; }
            .blog-post-aside { position: static !important; }
          }
          .prose-tsv code { color: ${P}; background: rgba(124,1,255,0.08); padding: 2px 6px; border-radius: 5px; font-size: 14px; }
        `}</style>

        {/* Same nav as the homepage */}
        <SiteNav active="blog" />

        <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 1200, margin: '0 auto' }}>
          <div className="blog-post-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 64, alignItems: 'start' }}>

            {/* Main */}
            <article>
              <Link href="/blog" className="blog-back" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: MU, textDecoration: 'none', marginBottom: 32, transition: 'color 150ms' }}>
                ← All posts
              </Link>

              <header style={{ marginBottom: 48 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <CategoryChip category={post.category} />
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: 12, color: SU }}>#{tag}</span>
                  ))}
                </div>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: PD, lineHeight: 1.15, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h1>
                <p style={{ fontSize: 18, color: MU, lineHeight: 1.6, marginBottom: 28 }}>
                  {post.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 28, borderBottom: `1px solid ${BR}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: WH, flexShrink: 0 }}>
                    {author.avatar ? <img src={author.avatar} alt={author.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 58%' }} /> : author.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: PD, margin: 0 }}>{author.name}</p>
                    <p style={{ fontSize: 12, color: SU, margin: 0 }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readingTime}
                    </p>
                  </div>
                </div>
              </header>

              {post.coverImage && (
                <div style={{ marginBottom: 40, borderRadius: 16, overflow: 'hidden' }}>
                  <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              <div className="prose-tsv">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                    },
                  }}
                />
              </div>

              {/* Author bio */}
              <div style={{ marginTop: 56, padding: 28, background: WH, border: `1px solid ${BR}`, borderRadius: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: P, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: WH, flexShrink: 0 }}>
                    {author.avatar ? <img src={author.avatar} alt={author.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 58%' }} /> : author.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: PD, marginBottom: 2, fontSize: 15 }}>{author.name}</p>
                    <p style={{ fontSize: 12, color: SU, marginBottom: 10 }}>{author.role}</p>
                    <p style={{ fontSize: 14, color: MU, lineHeight: 1.6 }}>{author.bio}</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="blog-post-aside" style={{ position: 'sticky', top: 88 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* TOC */}
                {headings.length > 0 && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SU, marginBottom: 14 }}>
                      Contents
                    </p>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {headings.map(h => (
                        <a key={h.id} href={`#${h.id}`} className="blog-toc-link"
                          style={{ fontSize: 13, color: MU, textDecoration: 'none', padding: '4px 0', lineHeight: 1.4, transition: 'color 150ms', paddingLeft: h.level === 3 ? 14 : 0 }}>
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA */}
                <div style={{ padding: 24, background: WH, border: `1px solid ${BR}`, borderRadius: 20, boxShadow: '0 4px 20px rgba(124,1,255,0.07)' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: PD, marginBottom: 8 }}>Want to know what we'd build for your brand?</p>
                  <p style={{ fontSize: 13, color: MU, lineHeight: 1.6, marginBottom: 16 }}>
                    Book a call.
                  </p>
                  <TrackedLink href={BOOK_CALL_HREF} location={`blog_sidebar_${post.slug}`}
                    style={{ display: 'block', textAlign: 'center', fontSize: 13, fontWeight: 700, color: WH, background: PD, borderRadius: 100, padding: '12px 20px', textDecoration: 'none' }}>
                    Book a call
                  </TrackedLink>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SU, marginBottom: 12 }}>Tags</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 12, color: MU, background: WH, border: `1px solid ${BR}`, borderRadius: 999, padding: '4px 12px' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div style={{ marginTop: 80, paddingTop: 48, borderTop: `1px solid ${BR}` }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SU, marginBottom: 24 }}>Related posts</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
                {related.map(rel => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="blog-related"
                    style={{ display: 'block', background: WH, border: `1px solid ${BR}`, borderRadius: 20, padding: 24, textDecoration: 'none', transition: 'box-shadow 200ms, transform 200ms' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: CATEGORIES[rel.category].color, background: CATEGORIES[rel.category].bg, padding: '3px 10px', borderRadius: 999 }}>
                        {CATEGORIES[rel.category].label}
                      </span>
                      <span style={{ fontSize: 12, color: SU }}>{rel.readingTime}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: PD, lineHeight: 1.35, fontFamily: 'var(--font-display)' }}>{rel.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
