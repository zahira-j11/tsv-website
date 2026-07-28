import { getAllPosts, AUTHORS, SITE_URL } from '@/lib/blog';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(post => {
      const author = AUTHORS[post.author] ?? AUTHORS.tsv;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const link = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${author.name}</author>
      <category>${post.category}</category>
      ${post.tags.map(t => `<category>${t}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Social Vision | Blog</title>
    <description>Strategy, case studies, and platform insights from The Social Vision. Short-form content thinking for brands that want to grow without ads.</description>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>zahira@thesocialvision.co.uk (Zahira Jaigirdar)</managingEditor>
    <webMaster>zahira@thesocialvision.co.uk (Zahira Jaigirdar)</webMaster>
    <image>
      <url>${SITE_URL}/tsv-logo.svg</url>
      <title>The Social Vision</title>
      <link>${SITE_URL}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
