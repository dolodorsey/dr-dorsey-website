/** Public roster controls shared by both domains. */
const RETIRED_NAMES = [
  'Iconic', 'Washington Parq', "Marvin's Room", 'The London',
  'The Attorney Network', 'Attorney Network', 'Kid Fit ATL', 'Kids Fit ATL',
  'Infinity Youth', 'The Sovereign Nation', 'Sovereign Nation', 'Happy Hour', 'Happy Hour ATL',
  'NOIR', 'Paparazzi', 'Gangsta Gospel', 'Pawchella', 'WRST BHVR', "Sunday's Best", 'REMIX', 'The Kulture',
  'Haunted House', 'Stitch', 'The Puff Dept.', 'Canvas Club',
  'MYXX', 'Ace Theory', 'BARE', 'AMARA', 'HALO', 'Mr. Mister', 'Ms. Misses',
  'Theory', 'Ritual', 'Dream', 'CASA', 'Body Call', 'Clicks', 'Recess',
  "Breakfast at Tiffany's", 'Pinkie Promise', 'Opium HTX', 'Tulum HTX', 'Whip Addict',
  'Freedom Run', '5K Freedom Run', 'Freedom 5K', 'Freedom 5K Run',
  "The People's Dept.", "The People's Department", 'The People’s Dept.', 'The People’s Department',
];

const PUBLIC_EVENT_NAMES = [
  'GROWN-ISH', 'GROWNISH', 'Taste of Art', 'Freedom Fest', 'Freedom Fest : Juneteent Atl', 'Project X',
  'Winter Wonderland', 'Parking Lot Pimpin', 'Secret Society', 'Underground King', 'Golf Tournament',
  'BALL', 'Greek Ball', "Monster's Ball", 'Monster’s Ball', 'Monsters Ball', 'Snow Ball',
  'Champagne Ball', 'Black Ball', 'One Big Ass Party', 'Exclamation Point',
];

const EVENT_ENTITY_NAMES = [...PUBLIC_EVENT_NAMES];

export const PRIORITY_NAMES = [
  'Goodfellas Pizza & Wings',
  'Hungry AF',
  'Opium ATL',
  'Sea Salt ATL',
  'Tulum ATL',
  'Rose on Piedmont',
  'Help 911',
];

function normalise(name: string): string {
  return name.toLowerCase().replace(/[’'`.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

const RETIRED = new Set(RETIRED_NAMES.map(normalise));
const EVENT_ENTITIES = new Set(EVENT_ENTITY_NAMES.map(normalise));
const PUBLIC_EVENTS = new Set(PUBLIC_EVENT_NAMES.map(normalise));
const PRIORITY = new Map(PRIORITY_NAMES.map((name, index) => [normalise(name), index]));

export function isRetired(name: string | undefined | null): boolean {
  return Boolean(name && RETIRED.has(normalise(name)));
}

export function isPublicEvent(name: string | undefined | null): boolean {
  return Boolean(name && PUBLIC_EVENTS.has(normalise(name)));
}

export function isEventEntity(name: string | undefined | null, division?: string | null): boolean {
  if (!name) return false;
  if (EVENT_ENTITIES.has(normalise(name))) return true;
  const key = normalise(division || '');
  return key === 'events cultural ip' || key === 'events activations';
}

export function withoutRetired<T>(items: T[], nameOf: (item: T) => string | undefined | null): T[] {
  return items.filter((item) => !isRetired(nameOf(item)));
}

export function pruneNames(names: string[]): string[] {
  return names.filter((name) => !isRetired(name.split('—')[0].trim()));
}

export function priorityRank(name: string | undefined | null): number {
  if (!name) return -1;
  return PRIORITY.get(normalise(name)) ?? -1;
}

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
