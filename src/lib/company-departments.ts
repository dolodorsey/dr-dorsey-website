import { departments, type Department } from '@/lib/departments';

export type DepartmentTitle = Department['title'];

function normalize(name: string): string {
  return name
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const byName: Record<string, DepartmentTitle> = {};
function assign(department: DepartmentTitle, names: string[]) {
  for (const name of names) byName[normalize(name)] = department;
}

assign('Nightlife / Events / Activations', [
  'Opium ATL', 'Sea Salt ATL', 'Tulum ATL', 'Hungry AF', 'Goodfellas Pizza & Wings', 'Revel',
  'Taste of Art', 'Freedom Fest', 'Freedom Fest : Juneteent Atl', 'Project X', 'Winter Wonderland',
  'Golf Tournament', 'Ball Series', 'Greek Ball', "Monster's Ball", 'Monster’s Ball', 'Monsters Ball',
  'Snow Ball', 'Champagne Ball', 'Black Ball', 'Rose Ball', 'BRAVO', 'ICONIC', 'Iconic',
]);

assign('Staples', [
  'Goodfellas Pizza & Wings', 'Hungry AF', 'Opium ATL', 'Sea Salt ATL', 'Tulum ATL',
  'Help 911',
]);

assign('Dorsey / Kollective', [
  'Dr. Dorsey', 'The Kollective ENT.', 'Courses', 'Consultations', 'HugLife', 'Hakuna Matata',
]);

assign('Production', [
  'Frequency Productions', 'Synergy Sounds', 'Just Print',
]);

assign('Our Apps', [
  'GOOD TIMES', 'On Call', 'S.O.S.', 'Luxe on Demand', 'The Law', 'The Vote', 'Mission 365',
  'Black Pages', 'The Black Pages',
]);

assign('The Inner Circle', [
  'The Fraternity', "The Gentleman's Club", 'The Gentleman’s Club', 'The Tribe', 'The Tribe - Memphis',
  'The University', 'Living Legacy Farms', 'Trailblazers', 'Little Farmers of the Future',
  "Member's Elite", 'Member’s Elite',
]);

assign('Products / Clothing', ['Bodega', 'FĚNYX', 'FENYX', 'STUSH', 'PULSE', 'Make Atlanta Great Again']);
assign('Water Sourcing', ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks']);
assign('Beverages', ['BEVCO INTL.', 'BEVCO INTL', 'Infinity Water', 'Pronto Energy', 'ORA', 'OTINI', 'TEMPO', 'Casa Cantina', 'Island Water', '00 : DOUBLE ZERO', 'Double Zero', 'NOIR — Espresso Liqueur', 'PRIVÈ VODKA', 'PRIVE VODKA', 'XXX VODKA', 'Tribal Water', 'The Tribe Wine']);
assign('Change the World', ['Sole Exchange', "Let's Talk About It", "Playmaker's Sports Association"]);

assign('Casper Group', [
  'The Casper Group', 'Angel Wings', 'Pasta Bish', 'Taco Yaki', 'Patty Daddy', 'Espresso Co.',
  'Tha Morning After', "Toss'd", 'Toss’d', 'Sweet Tooth', 'Mojo Juice', 'Mr. Oyster',
  'Peace Pizza', 'American Dragon',
]);

assign('Umbrella Group', [
  'The Umbrella Group', 'The Mind Studio',
  'Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services',
  'Umbrella Accounting', 'The Automation Office', 'Automation Office', 'Umbrella Travel',
  'Reset Therapy', 'Umbrella Injury Network',
]);

const byDivision: Record<string, DepartmentTitle> = {
  'founder & enterprise': 'Dorsey / Kollective',
  'hospitality & nightlife': 'Nightlife / Events / Activations',
  'events & cultural ip': 'Nightlife / Events / Activations',
  'production': 'Production',
  'technology & apps': 'Our Apps',
  'products & commerce': 'Products / Clothing',
  'the casper group': 'Casper Group',
  'services & umbrella group': 'Umbrella Group',
  'institutions & impact': 'The Inner Circle',
};

export const departmentOrder: DepartmentTitle[] = departments.map((department) => department.title);
const rank = new Map(departmentOrder.map((title, index) => [title, index]));

export function departmentFor(company: { name: string; division?: string | null }): DepartmentTitle {
  return byName[normalize(company.name)] || byDivision[normalize(company.division ?? '')] || 'Umbrella Group';
}

export function departmentRank(title: DepartmentTitle): number {
  return rank.get(title) ?? departmentOrder.length;
}

export function departmentSlug(title: string): string {
  return title
    .replace(/[‘’ʼ]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
