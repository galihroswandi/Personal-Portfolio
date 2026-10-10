import type { UIKey } from '@/i18n/ui';

export interface StackTier {
  labelKey: UIKey;
  variant: 'daily' | 'used' | 'learning';
  items: readonly string[];
}

/** Technologies by how well they are known. Names are not translated. */
export const stackTiers: readonly StackTier[] = [
  { labelKey: 'stack.daily', variant: 'daily', items: ['C++', 'Qt', 'TypeScript', 'React'] },
  {
    labelKey: 'stack.used',
    variant: 'used',
    items: ['Next.js', 'Node.js', 'NestJS', 'Express', 'Laravel', 'MySQL', 'Docker', 'Linux'],
  },
  { labelKey: 'stack.learning', variant: 'learning', items: ['Three.js'] },
];
