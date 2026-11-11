import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, postUrl } from '../lib/posts';
import { site, categories } from '../data/site';
export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title, description: p.data.description, link: postUrl(p),
      pubDate: p.data.published, categories: [categories[p.data.category].name],
    })),
    customData: '<language>en-gb</language>',
  });
}
