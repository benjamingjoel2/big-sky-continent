import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'posts'>;

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) =>
    b.data.published.getTime() - a.data.published.getTime() ||
    Number(b.data.featured) - Number(a.data.featured) ||
    a.data.title.localeCompare(b.data.title));
}

export const postUrl = (p: Post) => `/stories/${p.id}/`;

export function readingMinutes(body = ''): number {
  const words = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function related(post: Post, posts: Post[], n = 3): Post[] {
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score: (p.data.category === post.data.category ? 3 : 0) +
        p.data.countries.filter((c) => post.data.countries.includes(c)).length * 2 +
        p.data.regions.filter((r) => post.data.regions.includes(r)).length,
    }))
    .sort((a, b) => b.score - a.score || a.p.data.title.localeCompare(b.p.data.title))
    .slice(0, n)
    .map((x) => x.p);
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
