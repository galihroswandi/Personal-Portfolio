import { describe, expect, it } from 'vitest';
import { projectSchema } from './schemas';

const valid = {
  slug: 'hmi-qt',
  title: 'Aplikasi desktop HMI dengan Qt',
  role: 'Fullstack developer',
  company: 'Solusi 247',
  stack: ['C++', 'Qt'],
  problem: 'a',
  myRole: 'b',
  result: 'c',
  illustration: 'grid',
  featured: true,
  order: 3,
  reviewed: true,
};

describe('projectSchema', () => {
  it('accepts a complete project', () => {
    expect(projectSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a missing field', () => {
    const { result: _omitted, ...withoutResult } = valid;
    expect(projectSchema.safeParse(withoutResult).success).toBe(false);
  });

  it('rejects an unknown illustration and a bad slug', () => {
    expect(projectSchema.safeParse({ ...valid, illustration: 'photo' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...valid, slug: 'Has Spaces' }).success).toBe(false);
  });
});
