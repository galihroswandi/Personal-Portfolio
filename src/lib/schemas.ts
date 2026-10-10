import { z } from 'astro/zod';

/** Frontmatter of one case study. One MDX file per language: `projects/<lang>/<slug>.mdx`. */
export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  role: z.string(),
  company: z.string(),
  stack: z.array(z.string()).min(1),
  problem: z.string(),
  myRole: z.string(),
  result: z.string(),
  illustration: z.enum(['bars', 'gauge', 'grid']),
  featured: z.boolean(),
  order: z.number().int(),
  reviewed: z.boolean(),
});

export type ProjectData = z.infer<typeof projectSchema>;
