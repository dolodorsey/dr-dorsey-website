/**
 * Roster control.
 *
 * One list, applied everywhere a company or event can surface, so a brand
 * pulled from the public enterprise never reappears through a hardcoded array
 * or a registry row somebody forgot to update.
 */

/** Pulled from both sites. Matching is case- and punctuation-insensitive. */
const RETIRED_NAMES = [
  // Explicit enterprise removals
  'The Inner Circle',
  'Inner Circle',
  'Iconic',
  'Washington Parq',
  "Marvin's Room",
  'The London',
  'The Attorney Network',
  'Attorney Network',
  'Kid Fit ATL',
  'Kids Fit ATL',
  'Infinity Youth',
  'The Sovereign Nation',
  'Sovereign Nation',

  // Events & Cultural IP already retired
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
  'Whip Addict',
  'Freedom Run',
  '5K Freedom Run',
  'Freedom 5K',
  'Freedom 5K Run',
];

/** Event brands that have historically lived outside the Events division. */
const EVENT_ENTITY_NAMES = [
  'GROWN-ISH',
  'Project X',
  'HugLife',
];

/**
 * Core public staples. Goodfellas and Hungry AF intentionally lead together
 * so they always share a row before the remaining hospitality brands.
 */
export const PRIORITY_NAMES = [
  'Goodfellas Pizza & Wings',
  'Hungry AF',
  'Opium ATL',
  'Sea Salt ATL',
  'Tulum ATL',
];

function normalise(name: string): string {
  return name
    .toLowerCase()
    .replace(/[’'`.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const RETIRED = new Set(RETIRED_NAMES.map(normalise));
const EVENT_ENTITIES = new Set(EVENT_ENTITY_NAMES.map(normalise));
const PRIORITY = new Map(PRIORITY_NAMES.map((name, index) => [normalise(name), index]));

/** True when this brand has been pulled from the public enterprise. */
export function isRetired(name: string | undefined | null): boolean {
  if (!name) return false;
  return RETIRED.has(normalise(name));
}

/** Only these event properties remain public. */
export function isPublicEvent(name: string | undefined | null): boolean {
  if (!name) return false;
  const value = normalise(name);
  return value.includes('taste of art') || value.includes('freedom fest');
}

/**
 * True when a registry row represents an event property, even if an old
 * division filed it under Nightlife or Founder & Enterprise.
 */
export function isEventEntity(
  name: string | undefined | null,
  division?: string | undefined | null,
): boolean {
  if (!name) return false;
  if (EVENT_ENTITIES.has(normalise(name))) return true;
  const divisionKey = normalise(division || '');
  return divisionKey.includes('events cultural ip') || divisionKey.includes('events activations');
}

/** Drop retired brands from any list, whatever shape its records are. */
export function withoutRetired<T>(items: T[], nameOf: (item: T) => string | undefined | null): T[] {
  return items.filter((item) => !isRetired(nameOf(item)));
}

/** Drop retired names from a plain string list. */
export function pruneNames(names: string[]): string[] {
  return names.filter((name) => !isRetired(name.split('—')[0].trim()));
}

/** Rank within the Staples list, or -1. */
export function priorityRank(name: string | undefined | null): number {
  if (!name) return -1;
  const rank = PRIORITY.get(normalise(name));
  return rank === undefined ? -1 : rank;
}

/** Keep related public-facing brands beside their parent without changing the rest of the roster. */
export function placeRelatedTogether<T>(items: T[], nameOf: (item: T) => string): T[] {
  const output = withoutRetired([...items], nameOf);
  for (const [anchor, related] of [['Rose on Piedmont', 'GROWN-ISH']] as const) {
    const anchorIndex = output.findIndex((item) => normalise(nameOf(item)) === normalise(anchor));
    const relatedIndex = output.findIndex((item) => normalise(nameOf(item)) === normalise(related));
    if (anchorIndex >= 0 && relatedIndex >= 0 && relatedIndex !== anchorIndex + 1) {
      const [entry] = output.splice(relatedIndex, 1);
      const refreshedAnchor = output.findIndex((item) => normalise(nameOf(item)) === normalise(anchor));
      output.splice(refreshedAnchor + 1, 0, entry);
    }
  }
  return output;
}
