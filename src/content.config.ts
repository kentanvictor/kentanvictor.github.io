import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry ids are "<lang>/<slug>", e.g. "zh/tile-geotiff-format-file".
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Early study notes (2016–2020), shown in their own section.
    legacy: z.boolean().default(false),
    // Address of the post on the old Hexo site, for redirects.
    hexoUrl: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { blog, pages };
