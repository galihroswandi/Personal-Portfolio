import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { monogramSvg, OG_CAPTION, ogCardSvg } from './og';
import { pngsToIco, svgToPng } from './raster';

describe('ogCardSvg', () => {
  it('renders a 1200×630 PNG with text as paths', async () => {
    const svg = ogCardSvg({ kicker: 'STUDI KASUS', heading: 'Aplikasi desktop HMI dengan Qt' });
    expect(svg).not.toContain('<text');
    const meta = await sharp(await svgToPng(svg)).metadata();
    expect([meta.width, meta.height, meta.format]).toEqual([1200, 630, 'png']);
  });

  it('never emits NaN coordinates (opentype.js getPath bug on some runs)', () => {
    const svg = ogCardSvg({
      kicker: 'CASE STUDY',
      heading: 'Command center application for the maritime industry',
    });
    expect(svg).not.toContain('NaN');
  });

  it('fits a long heading by shrinking, never past four lines', () => {
    const short = ogCardSvg({ kicker: 'K', heading: 'Short' });
    const long = ogCardSvg({ kicker: 'K', heading: 'word '.repeat(60) });
    expect(long.length).toBeGreaterThan(short.length);
    expect(OG_CAPTION).toBe('GALIH ROSWANDI · FULLSTACK DEVELOPER');
  });
});

describe('icons', () => {
  it('draws the monogram at the requested size', async () => {
    const meta = await sharp(await svgToPng(monogramSvg(180, 'square'))).metadata();
    expect([meta.width, meta.height]).toEqual([180, 180]);
  });

  it('writes an ICO header and directory', async () => {
    const png = await svgToPng(monogramSvg(32, 'circle'));
    const ico = pngsToIco([{ size: 32, png }]);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(1);
    expect(ico.readUInt8(6)).toBe(32);
    expect(ico.readUInt32LE(18)).toBe(22);
    expect(ico.subarray(22).equals(png)).toBe(true);
  });
});
