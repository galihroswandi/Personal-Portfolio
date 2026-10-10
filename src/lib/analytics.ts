/**
 * Analytics events, declared in markup as `data-event` (+ optional `data-event-label`). Labels
 * are fixed identifiers (slug, profile name, language); never personal data.
 */

export const ANALYTICS_EVENTS = [
  'cv_download',
  'email_click',
  'case_study_click',
  'profile_click',
  'lang_switch',
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  label?: string;
}

const isEventName = (value: string | undefined): value is AnalyticsEventName =>
  (ANALYTICS_EVENTS as readonly string[]).includes(value ?? '');

/** The event declared on `element`, or undefined if it carries none (or an unknown one). */
export function readEvent(element: { getAttribute(name: string): string | null } | null) {
  const name = element?.getAttribute('data-event') ?? undefined;
  if (!isEventName(name)) return undefined;
  const label = element?.getAttribute('data-event-label') ?? undefined;
  return label ? { name, label } : { name };
}
