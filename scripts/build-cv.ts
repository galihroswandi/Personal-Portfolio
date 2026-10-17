/**
 * `pnpm build:cv`: renders `public/cv/galih-roswandi-{id,en}.pdf` (one A4 page each) from the
 * site's own data, using the browser Playwright already ships for the e2e tests. Run it after
 * changing the job, skills, projects or contact details, then commit the PDFs.
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { stackTiers } from '../src/config/stack';
import { site } from '../src/config/site';
import { languages, ui, type Lang } from '../src/i18n/ui';
import { cvFile } from '../src/lib/cv';
import { cvCopy } from './lib/cv-content';

const font = (file: string) =>
  `data:font/woff;base64,${readFileSync(`src/assets/fonts/${file}`).toString('base64')}`;

const escape = (text: string) => text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const about = (lang: Lang) =>
  readFileSync(`src/content/about/${lang}.mdx`, 'utf8')
    .replace(/^---[\s\S]*?---\n/, '')
    .trim()
    .split(/\n{2,}/);

const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function html(lang: Lang): string {
  const t = ui[lang];
  const copy = cvCopy[lang];
  const [intro = ''] = about(lang);
  const links = [
    site.email,
    pretty(site.url),
    pretty(site.social.github),
    pretty(site.social.linkedin),
  ];
  const available = new Date(site.availableFrom).toLocaleDateString(
    lang === 'id' ? 'id-ID' : 'en-GB',
    { month: 'long', year: 'numeric' },
  );

  const skills = stackTiers
    .map(
      (tier) =>
        `<div class="skill"><span class="label">${escape(t[tier.labelKey])}</span><span>${tier.items
          .map(escape)
          .join(' · ')}</span></div>`,
    )
    .join('');
  const projects = copy.projects
    .map(
      (project) =>
        `<div class="item"><h3>${escape(project.title)}</h3><p class="meta">${escape(
          project.meta,
        )}</p><p>${escape(project.text)}</p></div>`,
    )
    .join('');

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escape(
    site.name,
  )} · CV</title><style>
@font-face{font-family:Fraunces;src:url(${font('fraunces-latin-500-normal.woff')});font-weight:500}
@font-face{font-family:JetBrainsMono;src:url(${font('jetbrains-mono-latin-500-normal.woff')});font-weight:500}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
body{width:210mm;height:297mm;padding:16mm 17mm;color:#11161c;font:9.6pt/1.5 "Helvetica Neue",Arial,sans-serif;position:relative}
body::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5mm;background:#b25e00}
h1{font:500 29pt/1.05 Fraunces,Georgia,serif;letter-spacing:-.015em}
.role{margin-top:2mm;color:#9a5200;font:500 9pt JetBrainsMono,monospace;letter-spacing:.08em;text-transform:uppercase}
.links{display:flex;flex-wrap:wrap;gap:1mm 5mm;margin-top:4mm;color:#4a5663;font:500 8pt JetBrainsMono,monospace}
header{padding-bottom:5mm;border-bottom:.3mm solid #d5dce4}
section{margin-top:6mm}
h2{display:flex;align-items:center;gap:3mm;margin-bottom:2.5mm;color:#9a5200;font:500 8pt JetBrainsMono,monospace;letter-spacing:.12em;text-transform:uppercase}
h2::after{content:"";flex:1;height:.3mm;background:#d5dce4}
h3{font:500 12pt/1.25 Fraunces,Georgia,serif}
.item+.item{margin-top:3.5mm}
.meta{margin:.6mm 0 1mm;color:#5f6b78;font:500 7.8pt JetBrainsMono,monospace}
p+p{margin-top:1.5mm}
.lead{font-size:10.4pt}
.skill{display:grid;grid-template-columns:34mm 1fr;gap:3mm;margin-top:1.4mm}
.label{color:#5f6b78;font:500 7.8pt JetBrainsMono,monospace}
.avail{margin-top:6mm;padding:3mm 4mm;border-left:1.2mm solid #b25e00;background:#fbe7c7;font:500 8.6pt JetBrainsMono,monospace}
</style></head><body>
<header><h1>${escape(site.name)}</h1><p class="role">${escape(copy.role)} · ${escape(
    site.location.city,
  )}, ${escape(site.location.region)}</p><p class="links">${links
    .map((link) => `<span>${escape(link)}</span>`)
    .join('')}</p></header>
<section><h2>${escape(copy.headings.profile)}</h2><p class="lead">${escape(intro)}</p></section>
<section><h2>${escape(copy.headings.experience)}</h2><div class="item"><h3>${escape(
    t['timeline.job.title'],
  )}</h3><p class="meta">${escape(t['timeline.job.place'])} · ${escape(
    t['timeline.job.period'],
  )}</p><p>${escape(t['timeline.job.text'])}</p></div><div class="item"><h3>${escape(
    t['timeline.learn.title'],
  )}</h3><p class="meta">${escape(t['timeline.learn.period'])}</p><p>${escape(
    t['timeline.learn.text'],
  )}</p></div></section>
<section><h2>${escape(copy.headings.projects)}</h2>${projects}</section>
<section><h2>${escape(copy.headings.skills)}</h2>${skills}</section>
<p class="avail">${escape(copy.available)} ${escape(available)}</p>
</body></html>`;
}

const browser = await chromium.launch();
mkdirSync('public/cv', { recursive: true });
for (const lang of Object.keys(languages) as Lang[]) {
  const page = await browser.newPage();
  await page.setContent(html(lang), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: cvFile(lang), format: 'A4', printBackground: true });
  await page.close();
  process.stdout.write(`build:cv: ${cvFile(lang)}\n`);
}
await browser.close();
