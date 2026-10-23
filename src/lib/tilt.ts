/** Pointer tilt for the hero radar frame: the target angle, clamping and smoothing. */

export const TILT_MAX_DEG = 6;
/** Share of the remaining distance covered each animation frame. */
export const TILT_SMOOTHING = 0.08;
/** Below this many degrees from the target the frame counts as settled (the loop stops). */
export const TILT_EPSILON = 0.01;

export interface Tilt {
  /** rotateX in degrees. */
  x: number;
  /** rotateY in degrees. */
  y: number;
}

export const TILT_REST: Tilt = { x: 0, y: 0 };

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Target tilt for a pointer position: the frame leans toward the pointer, at most `max` degrees
 * per axis (reached at the frame's edge; anything further out is clamped).
 */
export function tiltTarget(
  pointerX: number,
  pointerY: number,
  box: Box,
  max: number = TILT_MAX_DEG,
): Tilt {
  const halfWidth = box.width / 2;
  const halfHeight = box.height / 2;
  if (halfWidth <= 0 || halfHeight <= 0) return TILT_REST;
  const dx = clamp((pointerX - (box.left + halfWidth)) / halfWidth, -1, 1);
  const dy = clamp((pointerY - (box.top + halfHeight)) / halfHeight, -1, 1);
  // Pointer above the centre lifts the top edge away (positive rotateX); right of it, the right
  // edge (positive rotateY). `+ 0` turns -0 into 0.
  return { x: -dy * max + 0, y: dx * max + 0 };
}

/** One smoothing step toward the target (exponential ease, frame by frame). */
export function stepTilt(current: Tilt, target: Tilt, factor: number = TILT_SMOOTHING): Tilt {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  };
}

export function isSettled(current: Tilt, target: Tilt, epsilon: number = TILT_EPSILON): boolean {
  return Math.abs(current.x - target.x) < epsilon && Math.abs(current.y - target.y) < epsilon;
}
