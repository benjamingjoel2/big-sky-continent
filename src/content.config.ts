import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    category: z.enum(['safari', 'gorillas-primates', 'beach-islands', 'itineraries', 'travel-tips']),
    regions: z.array(z.enum(['east-africa', 'southern-africa', 'north-africa', 'west-africa', 'indian-ocean'])).default([]),
    countries: z.array(z.string()).default([]),
    tips: z.array(z.enum(['health', 'visas', 'money'])).default([]),
    hero: z.string(),
    heroAlt: z.string(),
    author: z.string().default('editors'),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    featured: z.boolean().default(false),
    startHere: z.boolean().default(false),
    advertisement: z.boolean().default(false),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { posts };
