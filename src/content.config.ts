import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectSchema } from '@/lib/schemas';

// Entry ids keep the language folder (`id/hmi-qt`). Without `generateId` the `slug` field would
// become the id and the two languages would collide.
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.mdx$/, '');

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*/*.mdx', generateId: idFromPath }),
  schema: projectSchema,
});

const about = defineCollection({
  loader: glob({ base: './src/content/about', pattern: '*.mdx', generateId: idFromPath }),
  schema: ({ image }) =>
    z.object({
      reviewed: z.boolean(),
      /** Optional portrait, e.g. `photo: ./galih.jpg` next to the MDX file. */
      photo: image().optional(),
    }),
});

export const collections = { projects, about };
