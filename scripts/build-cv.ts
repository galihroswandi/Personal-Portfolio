/**
 * `pnpm build:cv`: renders `public/cv/galih-roswandi-{id,en}.pdf` (A4) and a `-preview.webp` of
 * the page (shown in the site's preview dialog) from the site's own data, using the browser
 * Playwright already ships for the e2e tests. Run it after changing the job,
 * skills, projects, education or contact details, then commit the PDFs.
 *
 * Built to be read by applicant tracking systems (ATS) as well as people: one column, no tables,
 * icons or text boxes, standard section names, plain "Month YYYY – Month YYYY" dates, contact
 * details as text on the first lines, real list bullets, and a tagged PDF with a title. Decoration
 * is limited to colour, a rule under headings and a bar in the margin. Letter-spacing and
 * text-transform are avoided because some parsers split such text into separate letters.
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { site } from '../src/config/site';
import { stackTiers } from '../src/config/stack';
import { languages, ui, type Lang } from '../src/i18n/ui';
import { cvFile, cvPreviewHref } from '../src/lib/cv';
import { cvCopy } from './lib/cv-content';

const font = (file: string) =>
  `data:font/woff;base64,${readFileSync(`src/assets/fonts/${file}`).toString('base64')}`;

const escape = (text: string) => text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const intro = (lang: Lang) =>
  readFileSync(`src/content/about/${lang}.mdx`, 'utf8')
    .replace(/^---[\s\S]*?---\n/, '')
    .trim()
    .split(/\n{2,}/)[0] ?? '';

const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function html(lang: Lang): string {
  const t = ui[lang];
  const copy = cvCopy[lang];
  const available = new Date(site.availableFrom).toLocaleDateString(
    lang === 'id' ? 'id-ID' : 'en-GB',
    { month: 'long', year: 'numeric' },
  );
  const contactLines = [
    [`${site.location.city}, ${site.location.region}`, site.email],
    [pretty(site.url), pretty(site.social.github), pretty(site.social.linkedin)],
  ];

  const skills = stackTiers
    .map(
      (tier) =>
        `<p><strong>${escape(t[tier.labelKey])}:</strong> ${tier.items.map(escape).join(', ')}</p>`,
    )
    .join('');
  const projects = copy.projects
    .map(
      (project) =>
        `<h3>${escape(project.title)}</h3><p class="meta">${escape(project.meta)}</p><p>${escape(project.text)}</p>`,
    )
    .join('');

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escape(
    `${site.name} - CV`,
  )}</title><style>
@font-face{font-family:Fraunces;src:url(${font('fraunces-latin-500-normal.woff')});font-weight:500}
@font-face{font-family:JetBrainsMono;src:url(${font('jetbrains-mono-latin-500-normal.woff')});font-weight:500}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
body{width:210mm;min-height:297mm;padding:15mm 17mm 14mm 20mm;color:#11161c;font:9.4pt/1.45 "Helvetica Neue",Arial,sans-serif;position:relative}
body::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5mm;background:#b25e00}
h1{font:500 28pt/1.05 Fraunces,Georgia,serif}
.role{margin:2mm 0 2mm;color:#9a5200;font:500 10pt JetBrainsMono,monospace}
.contact{margin-top:1.2mm;color:#3a4552;font:500 8pt JetBrainsMono,monospace}
header{padding-bottom:4.5mm;border-bottom:.5mm solid #b25e00}
section{margin-top:5mm}
h2{margin-bottom:2mm;padding-bottom:1mm;border-bottom:.25mm solid #d5dce4;color:#9a5200;font:500 12pt Fraunces,Georgia,serif}
h3{margin-top:3mm;font:500 11.2pt/1.25 Fraunces,Georgia,serif}
h3:first-of-type{margin-top:0}
.meta{margin:.6mm 0 1mm;color:#4a5663;font:500 7.8pt JetBrainsMono,monospace}
p+p{margin-top:1mm}
ul{margin:1mm 0 0 4.5mm;padding:0}
li{margin-top:.8mm;padding-left:.5mm}
li::marker{color:#b25e00}
.avail{margin-top:5mm;padding:2.5mm 4mm;border-left:1.2mm solid #b25e00;background:#fbe7c7;font:500 8.6pt JetBrainsMono,monospace}
</style></head><body>
<header><h1>${escape(site.name)}</h1><p class="role">${escape(copy.role)}</p>${contactLines
    .map((line) => `<p class="contact">${line.map(escape).join(' | ')}</p>`)
    .join('')}</header>
<section><h2>${escape(copy.headings.profile)}</h2><p>${escape(intro(lang))}</p></section>
<section><h2>${escape(copy.headings.experience)}</h2><h3>${escape(
    t['timeline.job.title'],
  )}</h3><p class="meta">${escape(t['timeline.job.place'])} | ${escape(copy.jobPeriod)}</p><ul>${copy.jobBullets
    .map((bullet) => `<li>${escape(bullet)}</li>`)
    .join('')}</ul></section>
<section><h2>${escape(copy.headings.projects)}</h2>${projects}</section>
<section><h2>${escape(copy.headings.education)}</h2><h3>${escape(
    copy.education.school,
  )}</h3><p class="meta">${escape(copy.education.program)} | ${escape(
    copy.education.period,
  )}</p></section>
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
  await page.pdf({
    path: cvFile(lang),
    format: 'A4',
    printBackground: true,
    tagged: true,
    outline: true,
  });
  // Same HTML as an A4-sized screenshot (96 dpi: 794 x 1123), shrunk to a light WebP.
  await page.setViewportSize({ width: 794, height: 1123 });
  const shot = await page.screenshot({ clip: { x: 0, y: 0, width: 794, height: 1123 } });
  await sharp(shot)
    .resize({ width: 1100 })
    .webp({ quality: 88 })
    .toFile(`public${cvPreviewHref(lang)}`);
  await page.close();
  process.stdout.write(`build:cv: ${cvFile(lang)} + preview\n`);
}
await browser.close();
