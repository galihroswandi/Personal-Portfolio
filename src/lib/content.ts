import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { isLang } from '@/i18n/utils';
import type { Lang } from '@/i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** Language of a project entry, read from its folder (`en/hmi-qt` → `en`). */
export function projectLang(entry: Project): Lang {
  const [folder] = entry.id.split('/');
  if (!isLang(folder)) throw new Error(`Project "${entry.id}" is not inside a language folder.`);
  return folder;
}

/** Every project in every language. */
export function getAllProjects(): Promise<Project[]> {
  return getCollection('projects');
}

/** Projects of one language, sorted by `order`. */
export async function getProjects(lang: Lang, { featuredOnly = false } = {}): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    (entry) => projectLang(entry) === lang && (!featuredOnly || entry.data.featured),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** The About entry for a language. */
export async function getAbout(lang: Lang) {
  const entry = await getEntry('about', lang);
  if (!entry) throw new Error(`Missing src/content/about/${lang}.mdx`);
  return entry;
}
