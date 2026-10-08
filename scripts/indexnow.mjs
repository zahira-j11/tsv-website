/**
 * Tell Bing (and the other IndexNow search engines) which pages exist or
 * have changed, so they recrawl them within hours rather than weeks. ChatGPT's
 * search leans on Bing's index, so this is how new pages reach AI answers.
 *
 *   node scripts/indexnow.mjs              every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/foo    just these paths
 *
 * Run it after a deploy that adds or changes pages. The key file it refers to
 * lives in public/ and must stay there.
 */

const SITE = 'https://www.thesocialvision.co.uk';
const KEY = 'b8ac3a55b2924800e5da0046e92b8800';

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

const paths = process.argv.slice(2);
const urlList = paths.length ? paths.map(p => new URL(p, SITE).href) : await sitemapUrls();

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

// 200 and 202 both mean accepted; 202 is normal for a key IndexNow hasn't checked yet.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) process.exit(1);
