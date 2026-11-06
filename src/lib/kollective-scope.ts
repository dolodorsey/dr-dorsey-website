/**
 * Server-side filter for feeds served on thekollectivehospitality.com. Rows
 * stay in the database and doctordorsey.com is unaffected; they are only left
 * out of what this host returns.
 */
const KOLLECTIVE_HOSTS = new Set(['thekollectivehospitality.com', 'www.thekollectivehospitality.com']);

export function isKollectiveHost(host: string | null | undefined): boolean {
  return KOLLECTIVE_HOSTS.has((host || '').split(':')[0].toLowerCase());
}

const OFF_SITE = /\brose\b|rose[-_ ](on|ball|bar)|roseon|piedmont|mister[- _]?manufacturing|casper|\bproductions?\b|synergy sounds|just print|jingle ball|diamond ball|american dragon|peace pizza|taco yaki|pasta bish|patty daddy|angel wings|mr\.? oyster|sweet tooth|toss.?d|mojo juice|morning after|espresso co/i;

/** True when any of the given fields names something this site no longer shows. */
export function isOffSite(...fields: unknown[]): boolean {
  return fields.some((field) => field != null && OFF_SITE.test(String(field)));
}

/** Removes Rose and Casper assignments from a directory team member's text. */
export function scopeTeamText(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\b(rose-on-piedmont|casper-group|casper_group)\b,?\s*/gi, '')
    .replace(/\s*\/\s*Casper\b/gi, '')
    .replace(/,\s*$/, '');
}

const DEDICATED_ROLE = /^(rose on piedmont|casper group)\b/i;
const EMPTY_ASSIGNMENT = /^responsible for:\s*$/i;

export function scopeTeamMember<T extends Record<string, unknown>>(member: T): T | null {
  if (DEDICATED_ROLE.test(String(member.role || ''))) return null;
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(member)) next[key] = scopeTeamText(value);
  if (EMPTY_ASSIGNMENT.test(String(next.detail || ''))) return null;
  if (isOffSite(next.brand, next.role, next.detail, next.name)) return null;
  return next as T;
}
