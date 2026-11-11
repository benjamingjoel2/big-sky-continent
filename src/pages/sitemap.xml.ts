import type { APIRoute } from 'astro';
import { allRoutes } from '../lib/routes';
import { site } from '../data/site';
export const GET: APIRoute = async () => {
  const urls = (await allRoutes()).map((r) => `<url><loc>${new URL(r.path, site.url).href}</loc><lastmod>${r.lastmod}</lastmod></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
