/**
 * Schema.org JSON-LD, as one `@graph` per page with stable `@id`s. Only facts that are visible on
 * the site: no email, phone, street address, ratings or reviews. Checked against Google's
 * ProfilePage, Article and Breadcrumb documentation (docs/seo.md); rich results are not promised.
 */
import { site } from '@/config/site';
import type { Lang } from '@/i18n/ui';
import { isRealUrl } from '@/lib/placeholders';
import { absoluteUrl } from '@/lib/seo';

interface Ref {
  '@id': string;
}

export interface PersonNode extends Ref {
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  knowsLanguage: string[];
  sameAs?: string[];
  worksFor?: { '@type': 'Organization'; name: string };
}

export interface WebSiteNode extends Ref {
  '@type': 'WebSite';
  name: string;
  url: string;
  inLanguage: string[];
  publisher: Ref;
}

export interface ProfilePageNode extends Ref {
  '@type': 'ProfilePage';
  url: string;
  name: string;
  inLanguage: string;
  isPartOf: Ref;
  mainEntity: Ref;
  dateCreated: string;
  dateModified: string;
}

export interface BreadcrumbNode extends Ref {
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export interface ArticleNode extends Ref {
  '@type': 'Article';
  url: string;
  headline: string;
  description: string;
  inLanguage: string;
  image: string;
  author: Ref & { name: string; url: string };
  publisher: Ref;
  isPartOf: Ref;
  datePublished: string;
  dateModified: string;
}

export type GraphNode = PersonNode | WebSiteNode | ProfilePageNode | BreadcrumbNode | ArticleNode;

export interface Graph {
  '@context': 'https://schema.org';
  '@graph': GraphNode[];
}

/** Topics from the stack and services sections. */
export const KNOWS_ABOUT = [
  'Web development',
  'C++',
  'Qt',
  'TypeScript',
  'React',
  'HMI',
  'Data dashboards',
];

export const ids = {
  person: absoluteUrl('/#person'),
  website: absoluteUrl('/#website'),
} as const;

export interface PersonInput {
  description: string;
  social?: Readonly<Record<string, string>>;
  publishEmployer?: boolean;
}

export function personNode(input: PersonInput): PersonNode {
  const sameAs = Object.values(input.social ?? site.social).filter(isRealUrl);
  const publishEmployer = input.publishEmployer ?? site.publishEmployer;
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: site.name,
    url: absoluteUrl('/'),
    jobTitle: 'Fullstack Developer',
    description: input.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ['id', 'en'],
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(publishEmployer ? { worksFor: { '@type': 'Organization', name: site.employer } } : {}),
  };
}

export function websiteNode(): WebSiteNode {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: site.name,
    url: absoluteUrl('/'),
    inLanguage: ['id', 'en'],
    publisher: { '@id': ids.person },
  };
}

const isoDateTime = (date: Date) => date.toISOString();

export interface ProfilePageInput {
  path: string;
  title: string;
  lang: Lang;
  created: Date;
  modified: Date;
}

export function profilePageNode(input: ProfilePageInput): ProfilePageNode {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'ProfilePage',
    '@id': `${url}#profilepage`,
    url,
    name: input.title,
    inLanguage: input.lang,
    isPartOf: { '@id': ids.website },
    mainEntity: { '@id': ids.person },
    dateCreated: isoDateTime(input.created),
    dateModified: isoDateTime(input.modified),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(pagePath: string, crumbs: readonly Crumb[]): BreadcrumbNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface ArticleInput {
  path: string;
  headline: string;
  description: string;
  lang: Lang;
  image: string;
  published: Date;
  modified: Date;
}

export function articleNode(input: ArticleInput): ArticleNode {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: input.headline,
    description: input.description,
    inLanguage: input.lang,
    image: absoluteUrl(input.image),
    author: { '@id': ids.person, name: site.name, url: absoluteUrl('/') },
    publisher: { '@id': ids.person },
    isPartOf: { '@id': ids.website },
    datePublished: isoDateTime(input.published),
    dateModified: isoDateTime(input.modified),
  };
}

export function graph(nodes: GraphNode[]): Graph {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
