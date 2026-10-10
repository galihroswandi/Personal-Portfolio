import { describe, expect, it } from 'vitest';
import {
  articleNode,
  breadcrumbNode,
  graph,
  ids,
  personNode,
  profilePageNode,
  websiteNode,
} from './jsonld';
import { absoluteUrl, serializeJsonLd } from './seo';

const created = new Date('2026-10-10T00:00:00Z');
const modified = new Date('2026-10-11T08:00:00Z');

/** Every string in the tree, with its path. */
function strings(value: unknown, path = '$'): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value))
    return value.flatMap((item, index) => strings(item, `${path}[${index}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => strings(item, `${path}.${key}`));
  }
  return [];
}

const homeGraph = graph([
  personNode({ description: 'Fullstack developer di Tasikmalaya.' }),
  websiteNode(),
  profilePageNode({ path: '/id/', title: 'Galih Roswandi', lang: 'id', created, modified }),
]);

const caseGraph = graph([
  personNode({ description: 'Fullstack developer.' }),
  websiteNode(),
  breadcrumbNode('/id/proyek/hmi-qt/', [
    { name: 'Beranda', path: '/id/' },
    { name: 'Proyek', path: '/id/#proyek' },
    { name: 'Aplikasi desktop HMI dengan Qt', path: '/id/proyek/hmi-qt/' },
  ]),
  articleNode({
    path: '/id/proyek/hmi-qt/',
    headline: 'Aplikasi desktop HMI dengan Qt',
    description: 'Studi kasus.',
    lang: 'id',
    image: '/og/id/proyek/hmi-qt.png',
    published: created,
    modified,
  }),
]);

describe('JSON-LD graphs', () => {
  it('round-trips as valid JSON', () => {
    for (const data of [homeGraph, caseGraph]) {
      expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
    }
  });

  it('never contains empty strings, placeholders or personal contact data', () => {
    for (const data of [homeGraph, caseGraph]) {
      for (const [path, value] of strings(data)) {
        expect(value.trim(), path).not.toBe('');
        expect(value, path).not.toMatch(/\[[^\]]+\]|^#$|@|mailto:|tel:/);
      }
      const json = JSON.stringify(data);
      for (const forbidden of [
        'email',
        'telephone',
        'streetAddress',
        'aggregateRating',
        'review',
      ]) {
        expect(json).not.toContain(forbidden);
      }
    }
  });

  it('resolves every @id reference inside the same graph', () => {
    for (const data of [homeGraph, caseGraph]) {
      const defined = new Set(data['@graph'].map((node) => node['@id']));
      const referenced = strings(data)
        .filter(([path]) => path.endsWith('.@id') && !/\$\.@graph\[\d+\]\.@id$/.test(path))
        .map(([, value]) => value);
      for (const ref of referenced) expect(defined, ref).toContain(ref);
    }
  });

  it('describes the person with the required ProfilePage fields', () => {
    const person = personNode({ description: 'x' });
    expect(person['@id']).toBe(ids.person);
    expect(person.name).toBe('Galih Roswandi');
    expect(person.address.addressLocality).toBe('Tasikmalaya');
    expect(person.knowsLanguage).toEqual(['id', 'en']);
    const page = profilePageNode({ path: '/en/', title: 't', lang: 'en', created, modified });
    expect(page.mainEntity).toEqual({ '@id': ids.person });
    expect(page.dateModified).toBe('2026-10-11T08:00:00.000Z');
  });

  it('keeps unset profiles out of sameAs and the employer off by default', () => {
    const unset = personNode({ description: 'x', social: { github: '#', linkedin: '' } });
    expect(unset.sameAs).toBeUndefined();
    expect(unset.worksFor).toBeUndefined();
    const set = personNode({
      description: 'x',
      social: { github: 'https://github.com/galihroswandi', linkedin: '#' },
      publishEmployer: true,
    });
    expect(set.sameAs).toEqual(['https://github.com/galihroswandi']);
    expect(set.worksFor?.name).toBeTruthy();
  });

  it('uses absolute URLs on the canonical origin', () => {
    const urls = strings(caseGraph)
      .map(([, value]) => value)
      .filter((value) => value.startsWith('http'));
    for (const url of urls.filter((value) => !value.startsWith('https://schema.org'))) {
      expect(url.startsWith(absoluteUrl('/'))).toBe(true);
    }
  });
});
