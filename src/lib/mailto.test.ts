import { describe, expect, it } from 'vitest';
import { buildMailto, splitEmail } from './mailto';

describe('buildMailto', () => {
  it('returns a bare address without options', () => {
    expect(buildMailto({ to: 'a@b.test' })).toBe('mailto:a@b.test');
  });

  it('encodes the subject per language', () => {
    expect(buildMailto({ to: 'a@b.test', subject: 'Diskusi proyek: Dasbor data' })).toBe(
      'mailto:a@b.test?subject=Diskusi%20proyek%3A%20Dasbor%20data',
    );
    expect(buildMailto({ to: 'a@b.test', subject: 'Project discussion: Data dashboards' })).toBe(
      'mailto:a@b.test?subject=Project%20discussion%3A%20Data%20dashboards',
    );
  });

  it('encodes reserved characters and joins subject and body', () => {
    expect(buildMailto({ to: 'a@b.test', subject: 'A & B?', body: 'x=1' })).toBe(
      'mailto:a@b.test?subject=A%20%26%20B%3F&body=x%3D1',
    );
  });
});

describe('splitEmail', () => {
  it('splits on the last @', () => {
    expect(splitEmail('hi@example.com')).toEqual({ user: 'hi', domain: 'example.com' });
  });

  it('keeps a value without @ as the user part', () => {
    expect(splitEmail('[email Anda]')).toEqual({ user: '[email Anda]', domain: '' });
  });
});
