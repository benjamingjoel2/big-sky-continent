# Big Sky Continent: content guide

Big Sky Continent is a Tourground travel blog for people planning a trip to Africa,
from first safaris to gorilla treks, beaches and cities. Posts are story-led,
practical and written in a warm voice. It is published by Tourground.

## Where posts live

One Markdown file per post in `src/content/posts/<slug>.md`. The file name is the
URL: `src/content/posts/great-migration-month-by-month.md` becomes
`/stories/great-migration-month-by-month/`.

## Frontmatter

```yaml
---
title: "The Great Migration, month by month"
description: "One or two sentences for listings and search results, under 200 characters."
category: safari            # safari | gorillas-primates | beach-islands | itineraries | travel-tips
regions: [east-africa]      # any of: east-africa, southern-africa, north-africa, west-africa, indian-ocean
countries: [tanzania, kenya]  # slugs from src/data/brands.json; drives the "Plan this trip" box (first 3 shown)
tips: []                    # travel-tips sub-topics, any of: health, visas, money
hero: mara-river      # photo key from src/data/photos.json
heroAlt: "Short, literal description of the hero photo"
author: editors             # key in src/data/authors.json
published: 2026-11-11
updated: 2026-11-11         # change whenever facts are re-checked; shown on the page
featured: false             # the newest featured post leads the home page
startHere: false            # appears in the "Start here" strip for first safaris
sources:
  - label: "Publisher: page title"
    url: "https://official.example/page"
---
```

## Body rules

- 1,200 to 2,000 words. Use `##` section headings (never `#`; the title is the H1).
- Story-led: open on a scene or a moment, then get practical. Warm, direct, second
  person ("you"), British spelling.
- **No invented facts.** No made-up statistics, prices, reviews, testimonials,
  quotes, people or personal anecdotes. If a fact cannot be sourced, leave it out
  or describe it qualitatively ("permits sell out early in peak months").
- Prices only when they come from an official tariff (park authority, permit
  office) and are cited, with the date checked. Never quote tour or lodge prices.
- **Health, visa, entry and safety facts** must link the official source inline
  (CDC, NHS fitfortravel / TravelHealthPro, UK FCDO, US State Department, WHO,
  official e-visa portals, park authorities) and say when it was checked, e.g.
  "(checked November 2026)". Tell readers to re-check before they travel.
- Cite sources inline as Markdown links and list every one in `sources`.
- Link other posts as `/stories/<slug>/`.
- Do not name or recommend specific private tour operators, lodges or camps.
  The "Plan this trip" box at the end is generated from `countries`; do not write
  your own booking call to action at the end of the body.
- No emoji, no decorative symbols.
- Paid content must be labelled "Advertisement feature". There is none at launch.
