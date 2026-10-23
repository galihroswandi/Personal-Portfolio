/**
 * Motion preference: the OS setting (`prefers-reduced-motion`) plus the in-page pause control.
 * The state is mirrored on `<html data-motion>`; CSS (src/styles/motion.css) reads it.
 * The pure helpers take their inputs as arguments so they can be tested without a browser.
 */

/** localStorage key that remembers the pause control. Also read by the inline script in Base. */
export const MOTION_STORAGE_KEY = 'gr-motion';
/** Stored value for "paused"; anything else (or nothing) means motion follows the OS setting. */
export const MOTION_PAUSED_VALUE = 'paused';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export type MotionState = 'full' | 'paused' | 'reduced';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** The OS setting wins over the pause control: reduced users never get loops back. */
export function resolveMotionState(reduced: boolean, paused: boolean): MotionState {
  if (reduced) return 'reduced';
  return paused ? 'paused' : 'full';
}

/** Reads the stored pause choice. Blocked or missing storage counts as "not paused". */
export function readPaused(storage: StorageLike | null): boolean {
  try {
    return storage?.getItem(MOTION_STORAGE_KEY) === MOTION_PAUSED_VALUE;
  } catch {
    return false;
  }
}

/** Stores the pause choice. Returns false when storage is blocked (the choice then lasts a page). */
export function writePaused(storage: StorageLike | null, paused: boolean): boolean {
  try {
    if (!storage) return false;
    if (paused) storage.setItem(MOTION_STORAGE_KEY, MOTION_PAUSED_VALUE);
    else storage.removeItem(MOTION_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

function getStorage(): StorageLike | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function getMotionState(): MotionState {
  return resolveMotionState(prefersReducedMotion(), readPaused(getStorage()));
}

export function applyMotionState(state: MotionState = getMotionState()): MotionState {
  document.documentElement.dataset.motion = state;
  return state;
}

export function setMotionPaused(paused: boolean): MotionState {
  writePaused(getStorage(), paused);
  return applyMotionState(resolveMotionState(prefersReducedMotion(), paused));
}

/** Calls `listener` when the OS setting changes. */
export function onReducedMotionChange(listener: () => void): void {
  window.matchMedia(REDUCED_QUERY).addEventListener('change', listener);
}
