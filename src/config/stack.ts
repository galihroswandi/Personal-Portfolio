import type { UIKey } from '@/i18n/ui';

export interface StackTier {
  labelKey: UIKey;
  variant: 'daily' | 'used';
  items: readonly string[];
}

/** Technologies by how well they are known. Names are not translated. */
export const stackTiers: readonly StackTier[] = [
  {
    labelKey: 'stack.daily',
    variant: 'daily',
    items: ['C++', 'Qt', 'TypeScript', 'Angular', 'Svelte', 'Next.js'],
  },
  {
    labelKey: 'stack.used',
    variant: 'used',
    items: [
      'React',
      'Node.js',
      'NestJS',
      'Express',
      'Laravel',
      'Tailwind CSS',
      'MySQL',
      'PostgreSQL',
      'Supabase',
      'Redis',
      'Docker',
      'Linux',
    ],
  },
];
