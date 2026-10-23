import { describe, expect, it } from 'vitest';
import { TILT_MAX_DEG, TILT_REST, isSettled, stepTilt, tiltTarget } from './tilt';

const box = { left: 100, top: 100, width: 400, height: 400 };

describe('tiltTarget', () => {
  it('is at rest in the centre', () => {
    expect(tiltTarget(300, 300, box)).toEqual(TILT_REST);
  });

  it('reaches the maximum at the edges and leans toward the pointer', () => {
    expect(tiltTarget(500, 300, box)).toEqual({ x: 0, y: TILT_MAX_DEG });
    expect(tiltTarget(300, 100, box)).toEqual({ x: TILT_MAX_DEG, y: 0 });
    expect(tiltTarget(200, 400, box)).toEqual({ x: -TILT_MAX_DEG / 2, y: -TILT_MAX_DEG / 2 });
  });

  it('clamps pointers outside the frame', () => {
    expect(tiltTarget(5000, -5000, box)).toEqual({ x: TILT_MAX_DEG, y: TILT_MAX_DEG });
  });

  it('stays at rest for an empty box', () => {
    expect(tiltTarget(10, 10, { left: 0, top: 0, width: 0, height: 0 })).toEqual(TILT_REST);
  });
});

describe('stepTilt / isSettled', () => {
  it('moves a fixed share of the way and converges', () => {
    const target = { x: 6, y: -6 };
    const first = stepTilt(TILT_REST, target, 0.08);
    expect(first.x).toBeCloseTo(0.48);
    expect(first.y).toBeCloseTo(-0.48);

    let current = TILT_REST;
    let frames = 0;
    while (!isSettled(current, target) && frames < 1000) {
      current = stepTilt(current, target);
      frames += 1;
    }
    expect(isSettled(current, target)).toBe(true);
    // About 77 frames (1.3s at 60fps) from the maximum; most of the way within a few hundred ms.
    expect(frames).toBeLessThan(120);
  });
});
