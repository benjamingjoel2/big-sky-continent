import { categories, regions, tips } from '../data/site';
import { allPosts, postUrl, isoDate } from './posts';
import { site } from '../data/site';

export async function allRoutes(): Promise<{ path: string; lastmod: string }[]> {
  const posts = await allPosts();
  const latest = posts.reduce((m, p) => (p.data.updated > m ? p.data.updated : m), new Date(site.launch));
  const l = isoDate(latest);
  const fixed = ['/', '/stories/', '/destinations/', ...Object.values(categories).map((c) => c.path),
    ...Object.values(tips).map((t) => t.path), ...Object.values(regions).map((r) => r.path)].map((path) => ({ path, lastmod: l }));
  const pages = ['/about/', '/authors/', '/disclosure/', '/privacy/', '/cookies/', '/terms/', '/photo-credits/'].map((path) => ({ path, lastmod: site.launch }));
  return [...fixed, ...posts.map((p) => ({ path: postUrl(p), lastmod: isoDate(p.data.updated) })), ...pages];
}
