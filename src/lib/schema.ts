import { site } from '../data/site';

const abs = (path: string) => new URL(path, site.url).href;
export const ORG_ID = `${site.url}/#publisher`;
export const SITE_ID = `${site.url}/#website`;

export const organization = () => ({
  '@type': 'Organization', '@id': ORG_ID, name: site.publisher.name, url: site.publisher.url,
  email: site.email,
});
export const website = () => ({
  '@type': 'WebSite', '@id': SITE_ID, name: site.name, url: `${site.url}/`, description: site.description,
  inLanguage: 'en', publisher: { '@id': ORG_ID },
});
export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});
export const blogPosting = (p: {
  title: string; description: string; path: string; image: string; width: number; height: number;
  published: string; updated: string; authorName: string; authorUrl: string; section: string; words: number;
}) => ({
  '@type': 'BlogPosting', '@id': `${abs(p.path)}#post`, headline: p.title, description: p.description,
  url: abs(p.path), mainEntityOfPage: abs(p.path),
  image: { '@type': 'ImageObject', url: abs(p.image), width: p.width, height: p.height },
  datePublished: p.published, dateModified: p.updated, inLanguage: 'en', articleSection: p.section, wordCount: p.words,
  author: { '@type': 'Organization', name: p.authorName, url: abs(p.authorUrl) },
  publisher: { '@id': ORG_ID }, isPartOf: { '@id': SITE_ID },
});
export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': [organization(), website(), ...nodes] });
