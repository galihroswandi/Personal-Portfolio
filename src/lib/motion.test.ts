import { describe, expect, it } from 'vitest';
import { MOTION_STORAGE_KEY, readPaused, resolveMotionState, writePaused } from './motion';

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
    removeItem: (key: string) => void map.delete(key),
  };
}

const blocked = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('SecurityError');
  },
  removeItem: () => {
    throw new Error('SecurityError');
  },
};

describe('resolveMotionState', () => {
  it('lets the OS setting win over the pause control', () => {
    expect(resolveMotionState(false, false)).toBe('full');
    expect(resolveMotionState(false, true)).toBe('paused');
    expect(resolveMotionState(true, false)).toBe('reduced');
    expect(resolveMotionState(true, true)).toBe('reduced');
  });
});

describe('readPaused / writePaused', () => {
  it('round-trips the choice under the named key', () => {
    const storage = memoryStorage();
    expect(readPaused(storage)).toBe(false);
    expect(writePaused(storage, true)).toBe(true);
    expect(storage.getItem(MOTION_STORAGE_KEY)).toBe('paused');
    expect(readPaused(storage)).toBe(true);
    writePaused(storage, false);
    expect(storage.getItem(MOTION_STORAGE_KEY)).toBeNull();
    expect(readPaused(storage)).toBe(false);
  });

  it('is safe when storage is missing or blocked', () => {
    expect(readPaused(null)).toBe(false);
    expect(writePaused(null, true)).toBe(false);
    expect(readPaused(blocked)).toBe(false);
    expect(writePaused(blocked, true)).toBe(false);
  });
});
