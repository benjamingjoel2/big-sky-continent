import type { APIRoute } from 'astro';
import { allPosts, postUrl, isoDate } from '../lib/posts';
import { site, categories } from '../data/site';
export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const abs = (p: string) => new URL(p, site.url).href;
  const lines = [
    `# ${site.name}`, '', `> ${site.description}`, '',
    'Every story lists its sources and shows when it was published and last updated. Health, visa and safety facts link to the official source. No invented prices, statistics, reviews or quotes. Paid content, if any, is labelled "Advertisement feature".', '',
    '## Stories', '',
    ...posts.map((p) => `- [${p.data.title}](${abs(postUrl(p))}): ${p.data.description} (${categories[p.data.category].name}; updated ${isoDate(p.data.updated)})`), '',
    '## Sections', '',
    ...Object.values(categories).map((c) => `- [${c.name}](${abs(c.path)}): ${c.blurb}`),
    `- [Destinations](${abs('/destinations/')})`, '',
    '## About', '',
    `- [About](${abs('/about/')}): Published by Tourground.`,
    `- [Disclosure](${abs('/disclosure/')})`,
    `- [Photo credits](${abs('/photo-credits/')})`,
    `- [RSS](${abs('/rss.xml')})`, '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
