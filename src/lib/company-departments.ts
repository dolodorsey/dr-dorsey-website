/**
 * Which of the fourteen departments a company belongs to.
 *
 * The registry carries an older eight-way `division` field ("Institutions &
 * Impact", "Products & Commerce", …). The enterprise now speaks in fourteen
 * departments, and the Companies pages have to say the same fourteen the
 * homepages, the customer app, and the BOH app do — otherwise a viewer reads
 * one vocabulary on the home page and a different one a click later.
 *
 * Resolution order:
 *   1. An explicit name rule below. This is what lets Rose on Piedmont stand
 *      as its own department, and the water companies split away from the
 *      institutions they were filed under.
 *   2. The company's registry division, mapped to the department that
 *      absorbed it.
 *
 * Names are matched with apostrophes and case normalised, because the registry
 * uses typographic apostrophes ("Marvin’s Room") and a straight one would
 * silently miss.
 */

import { departments, type Department } from '@/lib/departments';

export type DepartmentTitle = Department['title'];

/** Straight-quote, lowercase, collapse whitespace — so matching is not typography-dependent. */
function normalize(name: string): string {
  return name
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Companies whose department is not the one their division implies.
 * Everything not named here falls through to the division map below.
 */
const byName: Record<string, DepartmentTitle> = {};

function assign(department: DepartmentTitle, names: string[]) {
  for (const name of names) byName[normalize(name)] = department;
}

assign('Dorsey / Kollective', [
  'Dr. Dorsey',
  'The Kollective ENT.',
  'Courses',
  'Consultations',
  'The Fraternity',
  "The Gentleman's Club",
  'HugLife',
  'Iconic',
  'Black Pages',
  'The Inner Circle',
]);

assign('Nightlife', [
  'Happy Hour ATL',
  'Washington Parq',
  "Marvin's Room",
  'The London',
  'GROWN-ISH',
  'Opium ATL',
  'Sea Salt ATL',
  'Tulum ATL',
  'Hungry AF',
  'Goodfellas Pizza & Wings',
]);

assign('Rose on Piedmont', ['Rose on Piedmont']);

assign('App(s)', [
  'GOOD TIMES',
  'On Call',
  'S.O.S.',
  'Luxe on Demand',
  'The Law',
  'The Vote',
  'Mission 365',
  'The Attorney Network',
  'The Brand Studio',
]);

assign('Products / Clothing', [
  'Bodega',
  'STUSH',
  'PULSE',
  'Make Atlanta Great Again',
  'Hakuna Matata',
]);

assign('Water Sourcing', ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks']);

assign('Beverages', ['Infinity Water', 'Tribal Water', 'Pronto Energy', 'The Tribe Wine']);

assign('Help 911', ['Help 911', 'Reset Therapy', 'Umbrella Injury Network']);

assign('Sole Exchange / PSA', [
  'Sole Exchange',
  'Kid Fit ATL',
  "Let's Talk About It",
  "Playmaker's Sports Association",
  "Member's Elite",
  'Little Farmers of the Future',
  'Infinity Youth',
]);

assign('Umbrella Group', [
  'The Umbrella Group',
  'The Mind Studio',
  'Brand Studio',
  'Umbrella Auto Exchange',
  'Umbrella Realty Group',
  'Umbrella Clean Services',
  "The People's Dept.",
  'Umbrella Accounting',
  'The Automation Office',
  'Umbrella Travel',
]);

assign('Nation / Tribe', ['The Sovereign Nation', 'The Tribe - Memphis']);

assign('The University', ['The University', 'Trailblazers']);

/** Where each legacy registry division lands when no name rule applies. */
const byDivision: Record<string, DepartmentTitle> = {
  'founder & enterprise': 'Dorsey / Kollective',
  'hospitality & nightlife': 'Nightlife',
  'events & cultural ip': 'Events / Activations',
  'technology & apps': 'App(s)',
  'products & commerce': 'Products / Clothing',
  'the casper group': 'Casper Group',
  'services & umbrella group': 'Umbrella Group',
  'institutions & impact': 'The University',
};

/** The fourteen in their canonical order, so sections never shuffle. */
export const departmentOrder: DepartmentTitle[] = departments.map((d) => d.title);

const rank = new Map(departmentOrder.map((title, index) => [title, index]));

/**
 * The department a company belongs to.
 *
 * Falls back to the last department rather than dropping the company — a
 * registry entry with an unrecognised division should still be reachable
 * on the page, just filed at the end.
 */
export function departmentFor(company: { name: string; division?: string | null }): DepartmentTitle {
  const named = byName[normalize(company.name)];
  if (named) return named;

  const mapped = byDivision[normalize(company.division ?? '')];
  if (mapped) return mapped;

  return 'Umbrella Group';
}

/** Sort key for a department, for ordering sections. */
export function departmentRank(title: DepartmentTitle): number {
  return rank.get(title) ?? departmentOrder.length;
}

/** The anchor a department section uses, shared with the department cards' hrefs. */
export function departmentSlug(title: string): string {
  return title
    .replace(/[‘’ʼ]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
