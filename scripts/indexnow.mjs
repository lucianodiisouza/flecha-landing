// Tells IndexNow (Bing, Yandex, Seznam, Naver and others) about every page in the live
// sitemaps. Run after a deploy: node scripts/indexnow.mjs. The key file sits at the site root.
const host = 'flecha.dev';
const key = 'a1c46e71ed5ab4025dcd70713fbf76f6';
const sitemaps = [`https://${host}/sitemap.xml`, `https://${host}/docs/sitemap-index.xml`];

async function locs(url) {
  const xml = await (await fetch(url)).text();
  const found = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // A sitemap index lists more sitemaps; follow them.
  if (xml.includes('<sitemapindex')) return (await Promise.all(found.map(locs))).flat();
  return found;
}

const urlList = [...new Set((await Promise.all(sitemaps.map(locs))).flat())];
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
