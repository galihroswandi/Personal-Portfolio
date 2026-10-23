/** Web app manifest. Mostly for icons: the site is a normal web page (`display: browser`). */
import { site } from '@/config/site';
import { colors } from '@/lib/design';

export const MANIFEST_ICON_SIZES = [192, 512] as const;

export function buildManifest() {
  return {
    name: `${site.name} · Fullstack Developer`,
    short_name: site.name,
    lang: 'id',
    start_url: '/',
    display: 'browser',
    background_color: colors.surface,
    theme_color: colors.surface,
    icons: MANIFEST_ICON_SIZES.flatMap((size) => [
      { src: `/icons/${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' },
      ...(size === 512
        ? [
            {
              src: `/icons/${size}.png`,
              sizes: `${size}x${size}`,
              type: 'image/png',
              purpose: 'maskable',
            },
          ]
        : []),
    ]),
  };
}
