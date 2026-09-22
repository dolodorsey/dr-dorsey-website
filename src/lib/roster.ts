/** Public roster controls shared by both domains. */
const RETIRED_NAMES = [
  'Washington Parq', "Marvin's Room", 'The London',
  'The Attorney Network', 'Attorney Network', 'Kid Fit ATL', 'Kids Fit ATL',
  'Infinity Youth', 'The Sovereign Nation', 'Sovereign Nation', 'Happy Hour', 'Happy Hour ATL',
  'NOIR', 'Paparazzi', 'Gangsta Gospel', 'Pawchella', 'WRST BHVR', "Sunday's Best", 'REMIX', 'The Kulture',
  'Haunted House', 'Stitch', 'The Puff Dept.', 'Canvas Club',
  'MYXX', 'Ace Theory', 'BARE', 'AMARA', 'HALO', 'Mr. Mister', 'Ms. Misses',
  'Theory', 'Ritual', 'Dream', 'CASA', 'Body Call', 'Clicks', 'Recess',
  "Breakfast at Tiffany's", 'Pinkie Promise', 'Opium HTX', 'Tulum HTX', 'Whip Addict',
  'Freedom Run', '5K Freedom Run', 'Freedom 5K', 'Freedom 5K Run',
  "The People's Dept.", "The People's Department", 'The People’s Dept.', 'The People’s Department',
  // Removed from public website surfaces by executive direction.
  'Secret Society', 'Parking Lot Pimpin', 'Underground King',
  'New Year’s Eve', "New Year's Eve", 'NEW YEARS EVE',
  'Exclamation Point', 'The Brand Studio', 'Brand Studio',
  'GROWN-ISH', 'GROWNISH', 'Grownish', 'Grown-ish',
  'One Big Ass Party',
];

/**
 * Temporarily hidden from public listings without deleting registry rows,
 * integrations, destinations, or operating records.
 */
const PUBLICLY_HIDDEN_NAMES = [
  'Help 911',
  'Rose Ball',
  'Project X',
  'Black Ball',
  'Greek Ball',
  'Snow Ball',
  'Champagne Ball',
  'Ball Series',
  "Monster's Ball",
  'Monster’s Ball',
  'Monsters Ball',
  'Golf Tournament',
  'Tea Time',
  'TEA TIME',
  'Just Print',
  'Synergy Sounds',
  'Frequency Productions',
  'On Call',
  'Black Pages',
  'The Black Pages',
  'The Law',
  'Luxe on Demand',
  'The Vote',
  'The Tribe',
  'The Tribe - Memphis',
  'The Tribe — Memphis',
  'The University',
  'The Fraternity',
  'Little Farmers of the Future',
  'Living Legacy Farms',
  'Trailblazers',
  'Everyday Water Group',
  'Aquifer Waterworks',
  'Nativa Waterworks',
  'Tribal Water',
  'The Mind Studio',
  'Umbrella Auto Exchange',
  'The Umbrella Group',
  'Umbrella Realty Group',
  'Reset Therapy',
  'Umbrella Accounting',
  'Umbrella Clean Services',
  'The Automation Office',
  'Automation Office',
  'Umbrella Travel',
  'The Inner Circle',
];

const PUBLIC_EVENT_NAMES = [
  'Taste of Art', 'Freedom Fest', 'Freedom Fest : Juneteent Atl', 'Project X',
  'Winter Wonderland', 'Golf Tournament',
  'Ball Series', 'Greek Ball', "Monster's Ball", 'Monster’s Ball', 'Monsters Ball', 'Snow Ball',
  'Champagne Ball', 'Black Ball', 'Rose Ball', 'BRAVO',
];

const EVENT_ENTITY_NAMES = [
  ...PUBLIC_EVENT_NAMES,
  'BALL',
];

export const PRIORITY_NAMES = [
  'Goodfellas Pizza & Wings',
  'Hungry AF',
  'Opium ATL',
  'Sea Salt ATL',
  'Tulum ATL',
  'Rose on Piedmont',
];

function normalise(name: string): string {
  return name.toLowerCase().replace(/[’'`.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

const RETIRED = new Set(RETIRED_NAMES.map(normalise));
const HIDDEN = new Set(PUBLICLY_HIDDEN_NAMES.map(normalise));
const EVENT_ENTITIES = new Set(EVENT_ENTITY_NAMES.map(normalise));
const PUBLIC_EVENTS = new Set(PUBLIC_EVENT_NAMES.map(normalise));
const PRIORITY = new Map(PRIORITY_NAMES.map((name, index) => [normalise(name), index]));

export function isRetired(name: string | undefined | null): boolean {
  return Boolean(name && RETIRED.has(normalise(name)));
}

export function isPubliclyHidden(name: string | undefined | null): boolean {
  return Boolean(name && HIDDEN.has(normalise(name)));
}

export function isPublicEvent(name: string | undefined | null): boolean {
  return Boolean(name && !isPubliclyHidden(name) && PUBLIC_EVENTS.has(normalise(name)));
}

export function isEventEntity(name: string | undefined | null, division?: string | null): boolean {
  if (!name) return false;
  if (EVENT_ENTITIES.has(normalise(name))) return true;
  const key = normalise(division || '');
  return key === 'events cultural ip' || key === 'events activations' || key === 'nightlife events activations';
}

export function withoutRetired<T>(items: T[], nameOf: (item: T) => string | undefined | null): T[] {
  return items.filter((item) => {
    const name = nameOf(item);
    return !isRetired(name) && !isPubliclyHidden(name);
  });
}

export function pruneNames(names: string[]): string[] {
  return names.filter((name) => {
    const base = name.split('—')[0].trim();
    return !isRetired(base) && !isPubliclyHidden(base);
  });
}

export function priorityRank(name: string | undefined | null): number {
  if (!name) return -1;
  return PRIORITY.get(normalise(name)) ?? -1;
}

export function placeRelatedTogether<T>(items: T[], nameOf: (item: T) => string): T[] {
  return withoutRetired([...items], nameOf);
}
