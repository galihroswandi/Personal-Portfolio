/**
 * The subset of Vercel's `headers` rules this project uses (a `source` pattern plus `has` /
 * `missing` host conditions), evaluated locally so tests can check what production and preview
 * hosts receive. Not a full reimplementation of Vercel routing.
 */

type HostValue = string | { eq: string };

interface Condition {
  type: 'host' | 'header' | 'cookie' | 'query';
  key?: string;
  value?: HostValue;
}

export interface HeaderRule {
  source: string;
  has?: Condition[];
  missing?: Condition[];
  headers: { key: string; value: string }[];
}

export interface VercelConfig {
  trailingSlash?: boolean;
  headers?: HeaderRule[];
}

function hostMatches(condition: Condition, host: string): boolean {
  if (condition.type !== 'host') throw new Error(`Unsupported condition type: ${condition.type}`);
  const { value } = condition;
  if (value === undefined) return true;
  return typeof value === 'string' ? new RegExp(`^${value}$`).test(host) : value.eq === host;
}

/** `/(.*)` style sources: the parenthesised groups are regular expressions. */
function sourceMatches(source: string, path: string): boolean {
  return new RegExp(`^${source}$`).test(path);
}

/** Response headers Vercel adds for `path` on `host`. Keys are lower-cased. */
export function resolveHeaders(
  config: VercelConfig,
  path: string,
  host: string,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const rule of config.headers ?? []) {
    if (!sourceMatches(rule.source, path)) continue;
    if (rule.has && !rule.has.every((condition) => hostMatches(condition, host))) continue;
    if (rule.missing && rule.missing.some((condition) => hostMatches(condition, host))) continue;
    for (const { key, value } of rule.headers) result[key.toLowerCase()] = value;
  }
  return result;
}

/** Hosts named in `eq` host conditions (to compare with the canonical origin). */
export function namedHosts(config: VercelConfig): string[] {
  return (config.headers ?? []).flatMap((rule) =>
    [...(rule.has ?? []), ...(rule.missing ?? [])].flatMap((condition) =>
      condition.type === 'host' && typeof condition.value === 'object' ? [condition.value.eq] : [],
    ),
  );
}
