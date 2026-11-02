import { MetadataRoute } from 'next';
import { getAllPosts, SITE_URL } from '@/lib/blog';
import { CASES, CASES_PUBLISHED } from '@/lib/caseStudies';
import { DOCS, DOCS_UPDATED, docPath } from '@/lib/docs';
import { INDUSTRIES, industryPath } from '@/lib/industries';

// Real change dates, not the build date: a lastmod that changes on every
// deploy teaches Google to ignore it. Bump these when the page's content changes.
const HOME_UPDATED = '2026-10-24';
const UGC_AGENCY_UPDATED = '2026-11-02';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts.map(p => p.updatedAt ?? p.publishedAt).sort().at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(HOME_UPDATED),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-10-08'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(CASES_PUBLISHED),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...CASES.map(c => ({
      url: `${SITE_URL}/case-studies/${c.slug}`,
      lastModified: new Date(CASES_PUBLISHED),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...INDUSTRIES.map(i => ({
      url: `${SITE_URL}${industryPath(i)}`,
      lastModified: new Date('2026-10-09'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date('2026-10-09'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/ugc-agency`,
      lastModified: new Date(UGC_AGENCY_UPDATED),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...DOCS.map(doc => ({
      url: `${SITE_URL}${docPath(doc)}`,
      lastModified: new Date(DOCS_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: doc.slug === '' || doc.slug === 'briefing-ugc-creators' || doc.slug === 'reference/pricing' || doc.slug === 'faq' ? 0.8 : 0.6,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost ? new Date(latestPost) : undefined,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
