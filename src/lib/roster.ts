/**
 * Roster control.
 *
 * One list, applied everywhere a company or event can surface, so a brand
 * pulled from the enterprise never reappears through a hardcoded array or a
 * registry row somebody forgot to update.
 */

/** Pulled from both sites. Matching is case- and punctuation-insensitive. */
const RETIRED_NAMES = [
  // Events & Cultural IP
  'NOIR',
  'Paparazzi',
  'Gangsta Gospel',
  'Black Ball',
  'Snow Ball',
  'Monsters Ball',
  "Monster's Ball",
  'Pawchella',
  'WRST BHVR',
  "Sunday's Best",
  'REMIX',
  'The Kulture',
  'Winter Wonderland',
  'Haunted House',

  // Products & Commerce
  'Stitch',
  'The Puff Dept.',
  'Canvas Club',
  'MYXX',
  'Ace Theory',
  'BARE',
  'AMARA',
  'HALO',
  'Mr. Mister',
  'Ms. Misses',
  'Theory',
  'Ritual',
  'Dream',
  'CASA',
  'Body Call',

  // Hospitality & Nightlife
  'Clicks',
  'Recess',
  "Breakfast at Tiffany's",
  'Pinkie Promise',
  'Opium HTX',
  'Tulum HTX',
];

/**
 * Currently in production — animations are being made for these now, so they
 * lead the Companies page ahead of the department sections.
 */
export const PRIORITY_NAMES = [
  'Opium ATL',
  'Sea Salt ATL',
  'Tulum ATL',
  'Hungry AF',
  'Goodfellas Pizza & Wings',
];

function normalise(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’'`.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const RETIRED = new Set(RETIRED_NAMES.map(normalise));
const PRIORITY = new Map(PRIORITY_NAMES.map((name, index) => [normalise(name), index]));

/** True when this brand has been pulled from the enterprise. */
export function isRetired(name: string | undefined | null): boolean {
  if (!name) return false;
  return RETIRED.has(normalise(name));
}

/** Drop retired brands from any list, whatever shape its records are. */
export function withoutRetired<T>(items: T[], nameOf: (item: T) => string | undefined | null): T[] {
  return items.filter((item) => !isRetired(nameOf(item)));
}

/** Drop retired names from a plain string list. */
export function pruneNames(names: string[]): string[] {
  return names.filter((name) => !isRetired(name.split('—')[0].trim()));
}

/** Rank within the production list, or -1. Used to pin these to the top. */
export function priorityRank(name: string | undefined | null): number {
  if (!name) return -1;
  const rank = PRIORITY.get(normalise(name));
  return rank === undefined ? -1 : rank;
}
