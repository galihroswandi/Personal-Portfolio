// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  output: 'static',
  // Every page URL ends in `/` (`/id/`, `/en/proyek/x/`): files are `dir/index.html`, and Vercel
  // redirects the slash-less form with a 308 (`vercel.json` → trailingSlash). See docs/seo.md.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Keep whitespace between inline elements (Astro 7 defaults to 'jsx', which strips it).
  compressHTML: true,
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: [400, 500],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Iowan Old Style', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  // The sitemap is an endpoint (src/pages/sitemap.xml.ts) built from the page registry, so it
  // knows which pages are indexable and when they changed (docs/decisions.md 027).
  integrations: [mdx(), react()],
});
