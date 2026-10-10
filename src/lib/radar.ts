/**
 * Radar geometry and timing. The single source for every radar renderer: the SVG fallback
 * (RadarFallback.astro writes these as inline custom properties) and any future 3D scene, so
 * both sweep with the same period and phase.
 */

/** One full sweep, clockwise, starting at 12 o'clock. */
export const RADAR_PERIOD_MS = 8000;
/** A ping ring expands and fades over this long when the sweep passes its blip. */
export const RADAR_PING_MS = 1200;
export const RADAR_BLIP_BLINK_MS = 3200;
/** Rings fade in from the centre outward on load, this far apart. */
export const RADAR_RING_STAGGER_MS = 80;
/** Prism revolution for a 3D renderer (the SVG prism is static). */
export const RADAR_PRISM_PERIOD_MS = 20_000;

/** SVG coordinate system: a 400 × 400 view box centred on (200, 200). */
export const RADAR_VIEWBOX = 400;
export const RADAR_CENTER = RADAR_VIEWBOX / 2;
export const RADAR_RADIUS = 170;
/** Ring radii, inner to outer (the load fade runs in this order). */
export const RADAR_RINGS = [70, 120, RADAR_RADIUS] as const;

export interface Blip {
  x: number;
  y: number;
  r: number;
  accent: boolean;
}

export const RADAR_BLIPS: readonly Blip[] = [
  { x: 288, y: 128, r: 6, accent: true },
  { x: 112, y: 264, r: 4, accent: false },
  { x: 262, y: 286, r: 3, accent: false },
];

/** Angle of a point around the centre, in degrees clockwise from 12 o'clock, in [0, 360). */
export function blipAngle(x: number, y: number, center: number = RADAR_CENTER): number {
  // SVG y grows downwards, so "up" is -y; atan2(dx, -dy) is 0 at 12 o'clock, clockwise.
  const degrees = (Math.atan2(x - center, center - y) * 180) / Math.PI;
  return (degrees + 360) % 360;
}

/** When the sweep line (starting at 0°) reaches `angle`: the ping's animation-delay. */
export function pingDelayMs(angle: number, periodMs: number = RADAR_PERIOD_MS): number {
  const normalized = ((angle % 360) + 360) % 360;
  return Math.round((normalized / 360) * periodMs);
}

/**
 * The ping runs inside a keyframe animation as long as the sweep (so it repeats in step) and is
 * visible for the first `RADAR_PING_MS` of it. This is that keyframe stop, as a percentage;
 * `@keyframes radar-ping` in motion.css must use it (a unit test checks).
 */
export function pingKeyframeStop(
  pingMs: number = RADAR_PING_MS,
  periodMs: number = RADAR_PERIOD_MS,
): number {
  return (pingMs / periodMs) * 100;
}

/** Sweep angle at a time since the sweep started, for renderers that draw frame by frame. */
export function sweepAngleAt(elapsedMs: number, periodMs: number = RADAR_PERIOD_MS): number {
  return ((((elapsedMs % periodMs) + periodMs) % periodMs) / periodMs) * 360;
}
