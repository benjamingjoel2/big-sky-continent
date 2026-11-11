# Big Sky Continent

**bigskycontinent.tourground.com**: story-led, practical travel writing about Africa, published by Tourground.

Static [Astro](https://astro.build) site, deployed on Vercel (project `big-sky-continent`). No client-side JavaScript, no analytics, no cookies.

## Run it

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # astro build, then scripts/validate-build.mjs
```

`npm run build` fails if a page breaks a site rule: one `<h1>`, canonical URL, "Published by Tourground." footer, valid JSON-LD (Organization, WebSite, BreadcrumbList, plus BlogPosting on stories), last-updated date, sources and the Plan this trip box on every story, `alt`/`width`/`height` on every image, no broken internal links, and a sitemap that matches the pages.

## Where things live

| What | Where |
| --- | --- |
| Name, domain, email, disclosure wording, categories, regions | `src/data/site.ts` |
| Tourground brands per country (Plan this trip box) | `src/data/brands.json` |
| Authors | `src/data/authors.json` |
| Photos and credits | `src/assets/photos/<key>.jpg` + `src/data/photos.json` |
| Posts | `src/content/posts/<slug>.md` (see `CONTENT-GUIDE.md`) |
| JSON-LD | `src/lib/schema.ts` |
| RSS, sitemap, robots.txt, llms.txt | `src/pages/*.ts` |

## Publish a post

Add `src/content/posts/<slug>.md` following `CONTENT-GUIDE.md`, then push to `main`. The newest post with `featured: true` leads the home page; `startHere: true` posts fill the "Start here" strip.

## Photos

Only freely licensed photographs from Wikimedia Commons, credited with author and licence on the photo and on `/photo-credits/`. `scripts/commons-search.py` searches Commons for candidates.
