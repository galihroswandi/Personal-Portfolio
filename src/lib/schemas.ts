import { z } from 'astro/zod';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX } from '@/lib/seo-limits';

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
  illustration: z.enum([
    'bars',
    'gauge',
    'grid',
    'finance',
    'storefront',
    'gantt',
    'maritime',
    'hmi',
  ]),
  featured: z.boolean(),
  order: z.number().int(),
  reviewed: z.boolean(),
  /**
   * Invitation to try one of the owner's own public apps. Until `url` is a real link the button
   * stays hidden, and a bracketed placeholder there blocks a production build.
   */
  promo: z
    .object({
      name: z.string(),
      headline: z.string(),
      text: z.string(),
      points: z.array(z.string()).min(2).max(4),
      cta: z.string(),
      url: z.string(),
    })
    .optional(),
  /**
   * Search title, when `title` is too long for `<title>` (the site name is appended, so the whole
   * title stays within the limit). Falls back to `title`.
   */
  seoTitle: z
    .string()
    .trim()
    .min(1)
    .max(TITLE_MAX - ' | Galih Roswandi'.length)
    .optional(),
  /** Search snippet. Falls back to `problem` (+ `myRole` if that is too short). */
  seoDescription: z.string().trim().min(DESCRIPTION_MIN).max(DESCRIPTION_MAX).optional(),
  /** First publication and last meaningful edit. Fall back to the file's git history. */
  publishedDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
});

export type ProjectData = z.infer<typeof projectSchema>;
