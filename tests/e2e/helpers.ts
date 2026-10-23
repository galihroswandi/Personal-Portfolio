import type { Page } from '@playwright/test';

/** Emulates `prefers-reduced-motion: reduce` for the following navigations. */
export async function emulateReducedMotion(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' });
}

/** Animations on the page, split into infinite and running ones (playState 'running'). */
export async function countAnimations(
  page: Page,
): Promise<{ total: number; infinite: number; runningInfinite: number }> {
  return page.evaluate(() => {
    const animations = document.getAnimations();
    const infinite = animations.filter(
      (animation) => animation.effect?.getComputedTiming().iterations === Infinity,
    );
    return {
      total: animations.length,
      infinite: infinite.length,
      runningInfinite: infinite.filter((animation) => animation.playState === 'running').length,
    };
  });
}

/** Scrolls to the bottom in viewport steps, so every reveal has a chance to fire. */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 50)));
    }
  });
}

/**
 * Starts collecting layout shifts (Layout Instability API) before the page loads. Read the total
 * with `readCls`. Shifts right after user input are excluded, as in the CLS metric.
 */
export async function trackCls(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const store = window as unknown as { __cls: number };
    store.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entry.hadRecentInput) store.__cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
}

export async function readCls(page: Page): Promise<number> {
  return page.evaluate(() => (window as unknown as { __cls: number }).__cls);
}
