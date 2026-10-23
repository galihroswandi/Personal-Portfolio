import type { Lang } from '@/i18n/ui';

/** GitHub account behind the snapshot in `src/data/github.json` (`pnpm data:github`). */
export const githubUser = 'galihroswandi';

/** Languages shown by name in the chart; the rest fold into one "other" bar. */
export const GITHUB_TOP_LANGUAGES = 6;

/**
 * Public repositories worth a look, in display order. Descriptions are written from each repo's
 * README and description; language, year, stars and links come from the snapshot.
 */
export const featuredRepos: readonly {
  name: string;
  title: string;
  stack: readonly string[];
  text: Record<Lang, string>;
}[] = [
  {
    name: 'E-comerce',
    title: 'Garuda Store',
    stack: ['React', 'Firebase', 'Tailwind CSS'],
    text: {
      id: 'Toko online dari login sampai checkout: katalog, keranjang, pesanan, dan profil.',
      en: 'An online store from sign-in to checkout: catalog, cart, orders and profile.',
    },
  },
  {
    name: 'crud_barang_firebase',
    title: 'CRUD barang + Firebase',
    stack: ['React', 'Redux', 'Firebase'],
    text: {
      id: 'Kelola data barang dengan Redux Thunk, Firebase, dan unggah gambar ke Firebase Storage.',
      en: 'Manage product data with Redux Thunk, Firebase, and image uploads to Firebase Storage.',
    },
  },
  {
    name: 'rest-api-ecomerce',
    title: 'REST API e-commerce',
    stack: ['Express', 'MySQL'],
    text: {
      id: 'Backend REST untuk aplikasi e-commerce dengan Express dan MySQL.',
      en: 'A REST backend for an e-commerce app with Express and MySQL.',
    },
  },
  {
    name: 'Personal-Portfolio',
    title: 'Portofolio versi sebelumnya',
    stack: ['Next.js', 'TypeScript'],
    text: {
      id: 'Situs portofolio pertama saya dengan Next.js, sebelum versi ini.',
      en: 'My first portfolio site, built with Next.js, before this one.',
    },
  },
];
