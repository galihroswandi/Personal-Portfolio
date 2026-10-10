import { describe, expect, it } from 'vitest';
import { readEvent } from './analytics';

const element = (attributes: Record<string, string>) => ({
  getAttribute: (name: string) => attributes[name] ?? null,
});

describe('readEvent', () => {
  it('reads known events with an optional label', () => {
    expect(
      readEvent(element({ 'data-event': 'profile_click', 'data-event-label': 'github' })),
    ).toEqual({ name: 'profile_click', label: 'github' });
    expect(readEvent(element({ 'data-event': 'cv_download' }))).toEqual({ name: 'cv_download' });
  });

  it('ignores unknown events and missing elements', () => {
    expect(readEvent(element({ 'data-event': 'anything' }))).toBeUndefined();
    expect(readEvent(null)).toBeUndefined();
  });
});
