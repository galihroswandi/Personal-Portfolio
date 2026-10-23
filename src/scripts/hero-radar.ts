/**
 * Hero radar: pauses its loops while it is off-screen, and tilts the frame toward a fine
 * pointer. The tilt runs one requestAnimationFrame loop only while the frame is moving, and only
 * with motion 'full', a hover-capable fine pointer, a visible tab and the radar on screen.
 */
import { TILT_REST, isSettled, stepTilt, tiltTarget, type Tilt } from '@/lib/tilt';

const area = document.querySelector<HTMLElement>('[data-tilt-area]');
const frame = area?.querySelector<HTMLElement>('[data-tilt]');

if (area && frame) {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let current: Tilt = TILT_REST;
  let target: Tilt = TILT_REST;
  let rafId = 0;

  const write = (tilt: Tilt) => {
    frame.style.setProperty('--tilt-x', `${tilt.x.toFixed(2)}deg`);
    frame.style.setProperty('--tilt-y', `${tilt.y.toFixed(2)}deg`);
  };

  const step = () => {
    current = stepTilt(current, target);
    if (isSettled(current, target)) {
      current = target;
      rafId = 0;
    } else {
      rafId = requestAnimationFrame(step);
    }
    write(current);
  };

  const easeTo = (next: Tilt) => {
    target = next;
    if (rafId === 0) rafId = requestAnimationFrame(step);
  };

  /** Back to rest at once (motion switched off, tab hidden, radar scrolled away). */
  const reset = () => {
    cancelAnimationFrame(rafId);
    rafId = 0;
    current = target = TILT_REST;
    write(current);
  };

  const canTilt = () =>
    finePointer.matches &&
    document.documentElement.dataset.motion === 'full' &&
    document.visibilityState === 'visible' &&
    !frame.hasAttribute('data-offscreen');

  area.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !canTilt()) {
      if (current !== TILT_REST) reset();
      return;
    }
    easeTo(tiltTarget(event.clientX, event.clientY, frame.getBoundingClientRect()));
  });
  area.addEventListener('pointerleave', () => easeTo(TILT_REST));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') reset();
  });

  // Loops inside the frame (sweep, blips, pings) pause via [data-offscreen] in motion.css.
  new IntersectionObserver(([entry]) => {
    if (!entry) return;
    frame.toggleAttribute('data-offscreen', !entry.isIntersecting);
    if (!entry.isIntersecting) reset();
  }).observe(frame);
}
