/**
 * Scroll reveal. One shared IntersectionObserver marks `[data-reveal]` elements with
 * `data-revealed="true"` the first time they enter the viewport, then stops watching them.
 * CSS does the transition. Content is only hidden while `<html>` has the `js` class, and
 * everything is marked revealed when IntersectionObserver is missing.
 */

const VISIBLE_RATIO = 0.15;
/** Elements reveal a little after their top edge crosses the bottom of the viewport. */
const ROOT_MARGIN = '0px 0px -8% 0px';

function reveal(element: Element): void {
  element.setAttribute('data-revealed', 'true');
}

const targets = [...document.querySelectorAll('[data-reveal]:not([data-revealed])')];

if (!('IntersectionObserver' in window)) {
  targets.forEach(reveal);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold: VISIBLE_RATIO, rootMargin: ROOT_MARGIN },
  );

  // Anything already on screen at load is shown right away instead of waiting for a callback.
  const viewportHeight = window.innerHeight;
  for (const target of targets) {
    const { top, bottom } = target.getBoundingClientRect();
    if (top < viewportHeight && bottom > 0) reveal(target);
    else observer.observe(target);
  }
}
