/**
 * Vercel Web Analytics (cookieless), only on Vercel builds (`<html data-analytics="on">`). The
 * library is a separate chunk, loaded when the browser is idle or on the first tracked click, so
 * it never competes with first paint. Clicks on `[data-event]` elements become custom events.
 */
import type * as VercelAnalytics from '@vercel/analytics';
import { readEvent } from '@/lib/analytics';

type Analytics = typeof VercelAnalytics;

if (document.documentElement.dataset.analytics === 'on') {
  let loading: Promise<Analytics> | undefined;
  const ready = () =>
    (loading ??= import('@vercel/analytics').then((analytics) => {
      analytics.inject({ framework: 'astro', mode: 'production' });
      return analytics;
    }));

  if ('requestIdleCallback' in window) requestIdleCallback(() => void ready(), { timeout: 5000 });
  else setTimeout(() => void ready(), 3000);

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('[data-event]') : null;
    const tracked = readEvent(target);
    if (!tracked) return;
    void ready().then((analytics) =>
      analytics.track(tracked.name, tracked.label ? { label: tracked.label } : undefined),
    );
  });
}
