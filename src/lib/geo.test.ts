import { describe, expect, it } from 'vitest';
import { formatCoordinates } from './geo';

describe('formatCoordinates', () => {
  it('uses hemisphere letters instead of signs', () => {
    expect(formatCoordinates(-7.33, 108.22)).toBe('7.33°S 108.22°E');
    expect(formatCoordinates(51.5, -0.12)).toBe('51.50°N 0.12°W');
  });
});
