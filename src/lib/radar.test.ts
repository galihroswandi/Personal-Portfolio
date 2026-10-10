import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  RADAR_BLIPS,
  RADAR_CENTER,
  RADAR_PERIOD_MS,
  blipAngle,
  pingDelayMs,
  pingKeyframeStop,
  sweepAngleAt,
} from './radar';

describe('blipAngle', () => {
  it('measures clockwise from 12 o’clock', () => {
    const c = RADAR_CENTER;
    expect(blipAngle(c, c - 100)).toBe(0);
    expect(blipAngle(c + 100, c)).toBe(90);
    expect(blipAngle(c, c + 100)).toBe(180);
    expect(blipAngle(c - 100, c)).toBe(270);
    expect(blipAngle(c + 100, c - 100)).toBeCloseTo(45);
  });
});

describe('pingDelayMs', () => {
  it('is the time the sweep needs to reach the angle', () => {
    expect(pingDelayMs(0)).toBe(0);
    expect(pingDelayMs(90)).toBe(RADAR_PERIOD_MS / 4);
    expect(pingDelayMs(270)).toBe((RADAR_PERIOD_MS * 3) / 4);
    expect(pingDelayMs(450)).toBe(RADAR_PERIOD_MS / 4);
    expect(pingDelayMs(-90)).toBe((RADAR_PERIOD_MS * 3) / 4);
  });

  it('gives every blip a delay within one sweep', () => {
    for (const blip of RADAR_BLIPS) {
      const delay = pingDelayMs(blipAngle(blip.x, blip.y));
      expect(delay).toBeGreaterThanOrEqual(0);
      expect(delay).toBeLessThan(RADAR_PERIOD_MS);
    }
  });
});

describe('sweepAngleAt', () => {
  it('wraps once per period', () => {
    expect(sweepAngleAt(0)).toBe(0);
    expect(sweepAngleAt(RADAR_PERIOD_MS / 2)).toBe(180);
    expect(sweepAngleAt(RADAR_PERIOD_MS * 3 + RADAR_PERIOD_MS / 4)).toBe(90);
  });

  it('agrees with the ping delay (same phase)', () => {
    expect(sweepAngleAt(pingDelayMs(123))).toBeCloseTo(123, 0);
  });
});

describe('pingKeyframeStop', () => {
  it('matches the stop used by @keyframes radar-ping in motion.css', () => {
    const css = readFileSync(new URL('../styles/motion.css', import.meta.url), 'utf8');
    const keyframes = css.match(/@keyframes radar-ping\s*{([\s\S]*?)\n}/)?.[1] ?? '';
    expect(keyframes).toContain(`${pingKeyframeStop()}%`);
  });
});
