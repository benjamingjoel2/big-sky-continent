// Checks every built page against the site rules. Fails the build on any problem.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://bigskycontinent.tourground.com';
const errors = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const exists = (urlPath) => {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, clean)) || existsSync(join(DIST, clean, 'index.html'));
};

for (const f of html) {
  const s = readFileSync(f, 'utf8');
  const page = f.replace(DIST, '') || '/';
  const is404 = page.endsWith('404.html');
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(page, `expected one <h1>, found ${h1}`);
  if (!/<html lang="en-GB">/.test(s)) err(page, 'missing lang');
  if (!/<title>[^<]{5,}<\/title>/.test(s)) err(page, 'missing title');
  if (!/<meta name="description" content="[^"]{20,}"/.test(s)) err(page, 'missing description');
  if (!is404 && !/<link rel="canonical" href="https:\/\/bigskycontinent\.tourground\.com\//.test(s)) err(page, 'missing canonical');
  if (!s.includes('Published by Tourground.')) err(page, 'missing "Published by Tourground." footer');
  // JSON-LD
  const blocks = [...s.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  if (!blocks.length) err(page, 'no JSON-LD');
  const types = new Set();
  for (const b of blocks) {
    try { (JSON.parse(b)['@graph'] || []).forEach((n) => types.add(n['@type'])); } catch { err(page, 'invalid JSON-LD'); }
  }
  for (const t of ['Organization', 'WebSite', 'BreadcrumbList']) if (!types.has(t)) err(page, `JSON-LD missing ${t}`);
  if (page.startsWith('/stories/') && page !== '/stories/index.html') {
    if (!types.has('BlogPosting')) err(page, 'JSON-LD missing BlogPosting');
    if (!/Last updated <time datetime="\d{4}-\d{2}-\d{2}"/.test(s)) err(page, 'missing last updated date');
    if (!s.includes('id="sources-title"')) err(page, 'missing sources');
    if (!s.includes('id="plan-title"')) err(page, 'missing Plan this trip box');
    if (!s.includes('tourground.com/#/explore')) err(page, 'missing Tourground directory link');
  }
  // images
  for (const m of s.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt(="|[\s>])/.test(tag)) err(page, `img without alt: ${tag.slice(0, 80)}`);
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) err(page, `img without width/height: ${tag.slice(0, 80)}`);
  }
  // internal links
  for (const m of s.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    if (!exists(href)) err(page, `broken internal link ${href}`);
  }
  // rules
  if (/\b(ranked|best operators?|5 stars?|five stars?|testimonial)\b/i.test(s.replace(/<script.*?<\/script>/gs, ''))) err(page, 'banned ranking/review wording');
  if (/advertisement feature/i.test(s) === false && /sponsored/i.test(s) && !page.includes('disclosure')) err(page, 'sponsored content without "Advertisement feature" label');
}

// Sitemap integrity
const sm = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const l of locs) if (!exists(l.replace(SITE, ''))) err('sitemap.xml', `no page for ${l}`);
for (const f of html) {
  const p = f.replace(DIST, '').replace(/index\.html$/, '');
  if (p.endsWith('404.html')) continue;
  if (!locs.includes(SITE + p)) err('sitemap.xml', `page not in sitemap: ${p}`);
}
for (const f of ['rss.xml', 'llms.txt', 'robots.txt', 'favicon.svg']) if (!existsSync(join(DIST, f))) err(f, 'missing');

if (errors.length) {
  console.error(`\nvalidate-build: ${errors.length} problem(s)\n` + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log(`validate-build: ${html.length} pages OK, ${locs.length} sitemap URLs`);
