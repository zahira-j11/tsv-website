import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/blog';

/**
 * Search and AI-answer crawlers are allowed by name: ChatGPT already sends us
 * enquiries, and its search relies on these crawlers (and on Bing).
 *
 * Google-Extended is allowed on the same public paths. It is separate from
 * Googlebot and AI Overviews.
 *
 * Crawlers that only collect training data are blocked. Blocking them does
 * not affect search results or AI answers.
 */
const SEARCH_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'Applebot',
  'DuckDuckBot',
];

const TRAINING_ONLY_CRAWLERS = ['GPTBot', 'ClaudeBot', 'Applebot-Extended', 'CCBot', 'meta-externalagent'];

const PRIVATE = ['/admin', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: PRIVATE })),
      { userAgent: 'Google-Extended', allow: '/', disallow: PRIVATE },
      { userAgent: TRAINING_ONLY_CRAWLERS, disallow: '/' },
      { userAgent: '*', allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
