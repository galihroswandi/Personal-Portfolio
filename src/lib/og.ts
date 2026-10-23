/**
 * Build-time artwork: Open Graph cards (1200×630) and the "GR" monogram icons. Text is drawn as
 * SVG paths from the bundled fonts (`src/assets/fonts/`, OFL), so output never depends on fonts
 * installed on the build machine. Colors come from the design tokens.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import type * as OpenType from 'opentype.js';
import type { Font } from 'opentype.js';
import { colors, themeColors } from '@/lib/design';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/lib/seo';

// opentype.js is CommonJS under Node and its named exports are not detectable from ESM.
const opentype = createRequire(import.meta.url)('opentype.js') as typeof OpenType;

function loadFont(file: string): Font {
  const buffer = readFileSync(`src/assets/fonts/${file}`);
  return opentype.parse(
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
  );
}

const fonts = {
  display: loadFont('fraunces-latin-500-normal.woff'),
  mono: loadFont('jetbrains-mono-latin-500-normal.woff'),
};

/** Greedy word wrap: lines no wider than `maxWidth` at `size` (a single long word stays whole). */
export function wrapText(font: Font, text: string, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && font.getAdvanceWidth(candidate, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** One decimal place; `toFixed` never yields NaN for finite input. */
const num = (value: number) => {
  if (!Number.isFinite(value)) throw new Error(`Non-finite path coordinate: ${value}`);
  return String(Math.round(value * 10) / 10);
};

/**
 * SVG path data for a line of text. Serialized here because `Path.toPathData()` in opentype.js
 * 2.0.0 prints NaN for some coordinates (seen with "maritime industry" in Fraunces).
 */
export function textPathData(font: Font, text: string, x: number, y: number, size: number): string {
  return font
    .getPath(text, x, y, size)
    .commands.map((command) => {
      switch (command.type) {
        case 'M':
        case 'L':
          return `${command.type}${num(command.x)} ${num(command.y)}`;
        case 'Q':
          return `Q${num(command.x1)} ${num(command.y1)} ${num(command.x)} ${num(command.y)}`;
        case 'C':
          return `C${num(command.x1)} ${num(command.y1)} ${num(command.x2)} ${num(command.y2)} ${num(command.x)} ${num(command.y)}`;
        case 'Z':
          return 'Z';
      }
    })
    .join('');
}

const textPath = (font: Font, text: string, x: number, y: number, size: number, fill: string) =>
  `<path fill="${fill}" d="${textPathData(font, text, x, y, size)}"/>`;

export interface OgCardText {
  kicker: string;
  heading: string;
}

/** Caption on every card. */
export const OG_CAPTION = 'GALIH ROSWANDI · FULLSTACK DEVELOPER';

const PAD = 80;
/** Leaves clear space before the radar on the right. */
const HEADING_WIDTH = 640;
const HEADING_SIZES = [68, 60, 52, 44] as const;
const MAX_LINES = 4;

/** The largest heading size whose wrapped text fits in four lines. */
function fitHeading(text: string): { size: number; lines: string[] } {
  for (const size of HEADING_SIZES) {
    const lines = wrapText(fonts.display, text, size, HEADING_WIDTH);
    if (lines.length <= MAX_LINES) return { size, lines };
  }
  const size = HEADING_SIZES[HEADING_SIZES.length - 1] ?? 44;
  return { size, lines: wrapText(fonts.display, text, size, HEADING_WIDTH).slice(0, MAX_LINES) };
}

/** Radar rings on the right, echoing the hero (decorative, no real system). */
function radar(cx: number, cy: number): string {
  const rings = [90, 160, 230]
    .map(
      (r) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors.hairline}" stroke-width="2"/>`,
    )
    .join('');
  return [
    rings,
    `<line x1="${cx - 230}" y1="${cy}" x2="${cx + 230}" y2="${cy}" stroke="${colors.hairline}" stroke-width="2"/>`,
    `<line x1="${cx}" y1="${cy - 230}" x2="${cx}" y2="${cy + 230}" stroke="${colors.hairline}" stroke-width="2"/>`,
    `<line x1="${cx}" y1="${cy}" x2="${cx + 163}" y2="${cy - 163}" stroke="${colors.accent}" stroke-width="3" stroke-linecap="round"/>`,
    `<circle cx="${cx + 70}" cy="${cy - 120}" r="7" fill="${colors.accent}"/>`,
    `<circle cx="${cx - 110}" cy="${cy + 60}" r="5" fill="${colors.accentInk}" fill-opacity="0.6"/>`,
  ].join('');
}

export function ogCardSvg({ kicker, heading }: OgCardText): string {
  const { size, lines } = fitHeading(heading);
  const lineHeight = Math.round(size * 1.15);
  const blockHeight = lineHeight * lines.length;
  // Heading block is centered between the kicker and the caption.
  const top = 200 + Math.max(0, (300 - blockHeight) / 2);
  const headingPaths = lines
    .map((line, index) =>
      textPath(fonts.display, line, PAD, top + size + index * lineHeight, size, colors.ink),
    )
    .join('');
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}">`,
    `<rect width="100%" height="100%" fill="${colors.surface}"/>`,
    radar(1010, 315),
    `<rect x="${PAD}" y="120" width="48" height="4" fill="${colors.accent}"/>`,
    textPath(fonts.mono, kicker, PAD, 172, 26, colors.accentInk),
    headingPaths,
    `<rect x="0" y="${OG_IMAGE_HEIGHT - 96}" width="${OG_IMAGE_WIDTH}" height="1" fill="${colors.hairline}"/>`,
    textPath(fonts.mono, OG_CAPTION, PAD, OG_IMAGE_HEIGHT - 40, 22, colors.inkMuted),
    '</svg>',
  ].join('');
}

/**
 * The "GR" monogram, as in the navbar: surface-colored letters on ink. `shape: 'circle'` for the
 * favicon; `'square'` fills the canvas for app icons (the platform applies its own mask, and the
 * letters stay inside the maskable safe zone).
 */
export function monogramSvg(size: number, shape: 'circle' | 'square'): string {
  const fontSize = size * (shape === 'circle' ? 0.46 : 0.36);
  const box = fonts.display.getPath('GR', 0, 0, fontSize).getBoundingBox();
  const x = (size - (box.x2 - box.x1)) / 2 - box.x1;
  const y = (size - (box.y2 - box.y1)) / 2 - box.y1;
  const background =
    shape === 'circle'
      ? `<circle class="bg" cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${colors.ink}"/>`
      : `<rect class="bg" width="${size}" height="${size}" fill="${colors.ink}"/>`;
  // Dark is the default (and what PNG rasterizers see). Browsers that honor the media query in an
  // SVG favicon invert the monogram on a light browser UI so it stays visible.
  const light = themeColors.light;
  const lightScheme = `@media (prefers-color-scheme: light){.bg{fill:${light.ink}}.fg{fill:${light.surface}}}`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    `<style>${lightScheme}</style>`,
    background,
    textPath(fonts.display, 'GR', x, y, fontSize, colors.surface).replace(
      '<path ',
      '<path class="fg" ',
    ),
    '</svg>',
  ].join('');
}
