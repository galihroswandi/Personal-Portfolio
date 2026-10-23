import type { UIKey } from '@/i18n/ui';

/**
 * Primary links (navbar and footer). Section ids are fixed (Indonesian) in both languages so
 * links and anchors stay stable.
 */
export const navLinks: readonly { id: string; key: UIKey }[] = [
  { id: 'proyek', key: 'nav.projects' },
  { id: 'tentang', key: 'nav.about' },
  { id: 'pengalaman', key: 'nav.experience' },
  { id: 'layanan', key: 'nav.services' },
  { id: 'kontak', key: 'nav.contact' },
];
