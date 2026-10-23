import { describe, expect, it } from 'vitest';
import { formatClock, msUntilNextMinute } from './time';

describe('formatClock', () => {
  it('formats in WIB (UTC+7) with a 24-hour clock', () => {
    expect(formatClock(new Date('2026-01-01T06:42:10Z'), 'Asia/Jakarta')).toBe('13:42');
    expect(formatClock(new Date('2026-01-01T17:05:00Z'), 'Asia/Jakarta')).toBe('00:05');
  });
});

describe('msUntilNextMinute', () => {
  it('counts to the next full minute', () => {
    expect(msUntilNextMinute(new Date('2026-01-01T00:00:45.000Z'))).toBe(15_000);
    expect(msUntilNextMinute(new Date('2026-01-01T00:00:00.000Z'))).toBe(60_000);
  });
});
