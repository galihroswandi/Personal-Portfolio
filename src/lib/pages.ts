/**
 * The page registry: every localized page with its title, description, alternates, dates and
 * whether it may be indexed. Pages, the sitemap and the Open Graph images all read from here, so
 * they cannot disagree.
 */
import { site } from '@/config/site';
import { reviewedLangs, ui, type Lang } from '@/i18n/ui';
import { interpolate, langs, localePath } from '@/i18n/utils';
import { getAbout, getAllProjects, projectLang, type Project } from '@/lib/content';
import {
  articleNode,
  breadcrumbNode,
  graph,
  personNode,
  profilePageNode,
  webPageNode,
  websiteNode,
  type Crumb,
  type Graph,
} from '@/lib/jsonld';
import { firstPublished, lastModified } from '@/lib/lastmod';
import { hasPlaceholder } from '@/lib/placeholders';
import { buildDescription, buildTitle, ogImagePath, type HeadMeta } from '@/lib/seo';

export interface OgCard {
  /** Mono line above the title (amber). */
  kicker: string;
  /** Large display text. */
  heading: string;
  /** Image path, `/og/….png`. */
  image: string;
  alt: string;
}

export interface SitePage {
  kind: 'home' | 'case-study' | 'learning';
  lang: Lang;
  /** Path with a trailing slash, e.g. `/id/proyek/hmi-qt/`. */
  path: string;
  /** Visible page heading (for breadcrumbs and structured data). */
  heading: string;
  /** Full `<title>`. */
  title: string;
  description: string;
  /** False while copy is unreviewed or a case study still has placeholders. */
  indexable: boolean;
  /** Every language version of this page, itself included. */
  alternates: Partial<Record<Lang, string>>;
  published: Date;
  modified: Date;
  og: OgCard;
}

/** Files whose edits change what the home page shows. */
const homeSources = (lang: Lang) => [
  'src/i18n/ui.ts',
  'src/config',
  'src/components',
  `src/content/about/${lang}.mdx`,
  `src/content/projects/${lang}`,
];

/** Files whose edits change what the learning page shows. */
const learningSources = ['src/i18n/ui.ts', 'src/config/learning.ts', 'src/data/learning.json'];

const projectSource = (entry: Project) => `src/content/projects/${entry.id}.mdx`;

function ogCard(lang: Lang, path: string, kicker: string, heading: string): OgCard {
  return {
    kicker,
    heading,
    image: ogImagePath(path),
    alt: interpolate(ui[lang]['og.alt'], { title: heading }),
  };
}

export async function getHomePage(lang: Lang): Promise<SitePage> {
  const about = await getAbout(lang);
  const path = localePath(lang);
  const t = ui[lang];
  return {
    kind: 'home',
    lang,
    path,
    heading: site.name,
    title: buildTitle(undefined, lang),
    description: t['meta.description'],
    indexable: reviewedLangs[lang] && about.data.reviewed && !hasPlaceholder(about.body ?? ''),
    alternates: Object.fromEntries(langs.map((code) => [code, localePath(code)])),
    published: new Date(site.createdAt),
    modified: lastModified(homeSources(lang)),
    og: ogCard(lang, path, t['og.homeKicker'], t['og.homeTitle']),
  };
}

export function getLearningPage(lang: Lang): SitePage {
  const t = ui[lang];
  const path = localePath(lang, 'belajar');
  return {
    kind: 'learning',
    lang,
    path,
    heading: t['learning.title'],
    title: buildTitle(t['learning.seoTitle'], lang),
    description: t['learning.metaDescription'],
    indexable: reviewedLangs[lang],
    alternates: Object.fromEntries(langs.map((code) => [code, localePath(code, 'belajar')])),
    published: firstPublished('src/config/learning.ts'),
    modified: lastModified([...learningSources, 'src/pages/[lang]/belajar']),
    og: ogCard(lang, path, t['og.learningKicker'], t['learning.title']),
  };
}

/** Text of a case study that must be real before the page may be indexed. */
function projectText(entry: Project): string {
  const { title, problem, myRole, result, seoTitle, seoDescription } = entry.data;
  return [title, problem, myRole, result, seoTitle, seoDescription, entry.body].join('\n');
}

export function getProjectPage(entry: Project, all: readonly Project[]): SitePage {
  const lang = projectLang(entry);
  const { data } = entry;
  const path = localePath(lang, `proyek/${data.slug}`);
  const versions = all.filter((other) => other.data.slug === data.slug);
  return {
    kind: 'case-study',
    lang,
    path,
    heading: data.title,
    title: buildTitle(data.seoTitle ?? data.title, lang),
    description: buildDescription(data.seoDescription, [data.problem, data.myRole]),
    indexable: reviewedLangs[lang] && data.reviewed && !hasPlaceholder(projectText(entry)),
    alternates: Object.fromEntries(
      versions.map((version) => {
        const versionLang = projectLang(version);
        return [versionLang, localePath(versionLang, `proyek/${data.slug}`)];
      }),
    ),
    published: firstPublished(projectSource(entry), data.publishedDate),
    modified: lastModified([projectSource(entry)], data.updatedDate),
    og: ogCard(lang, path, ui[lang]['og.caseKicker'], data.title),
  };
}

/** Every localized page, home pages first. */
export async function getSitePages(): Promise<SitePage[]> {
  const projects = await getAllProjects();
  const homes = await Promise.all(langs.map(getHomePage));
  return [
    ...homes,
    ...langs.map(getLearningPage),
    ...projects.map((entry) => getProjectPage(entry, projects)),
  ];
}

/** Head tags for a registry page. Case studies are articles with publication dates. */
export function headMeta(page: SitePage, jsonLd?: object): HeadMeta {
  const article = page.kind === 'case-study';
  return {
    lang: page.lang,
    path: page.path,
    title: page.title,
    description: page.description,
    indexable: page.indexable,
    alternates: page.alternates,
    og: {
      type: article ? 'article' : 'website',
      image: page.og.image,
      imageAlt: page.og.alt,
      published: article ? page.published : undefined,
      modified: article ? page.modified : undefined,
    },
    jsonLd,
  };
}

/**
 * Home > Projects > case study, or Home > page. Shown on the page and in the BreadcrumbList.
 */
export function breadcrumbs(page: SitePage): Crumb[] {
  const t = ui[page.lang];
  const home = localePath(page.lang);
  const trail: Crumb[] = [{ name: t['breadcrumb.home'], path: home }];
  if (page.kind === 'case-study') trail.push({ name: t['nav.projects'], path: `${home}#proyek` });
  return [...trail, { name: page.heading, path: page.path }];
}

const person = (lang: Lang) => personNode({ description: ui[lang]['meta.description'] });

/** Home: the person, the site, and the page as their profile. */
export function homeJsonLd(page: SitePage): Graph {
  return graph([
    person(page.lang),
    websiteNode(),
    profilePageNode({
      path: page.path,
      title: page.title,
      lang: page.lang,
      created: page.published,
      modified: page.modified,
    }),
  ]);
}

/** Case study: an article by the person, with its breadcrumb trail. */
export function caseStudyJsonLd(page: SitePage): Graph {
  return graph([
    person(page.lang),
    websiteNode(),
    breadcrumbNode(page.path, breadcrumbs(page)),
    articleNode({
      path: page.path,
      headline: page.heading,
      description: page.description,
      lang: page.lang,
      image: page.og.image,
      published: page.published,
      modified: page.modified,
    }),
  ]);
}

/** Learning page: a page about the person, with its breadcrumb trail. */
export function learningJsonLd(page: SitePage): Graph {
  return graph([
    person(page.lang),
    websiteNode(),
    breadcrumbNode(page.path, breadcrumbs(page)),
    webPageNode({
      path: page.path,
      title: page.title,
      description: page.description,
      lang: page.lang,
      modified: page.modified,
    }),
  ]);
}
