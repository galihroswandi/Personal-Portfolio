/** Formats a time as `HH:MM` (24-hour) in the given IANA time zone. */
export function formatClock(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '--';
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '--';
  return `${hour}:${minute}`;
}

/** Milliseconds until the next full minute, so a clock can tick exactly on the minute. */
export function msUntilNextMinute(date: Date): number {
  const MS_PER_MINUTE = 60_000;
  return MS_PER_MINUTE - (date.getTime() % MS_PER_MINUTE);
}

/** Static text shown before the clock island hydrates (and without JavaScript). */
export const CLOCK_FALLBACK = '--:--';
