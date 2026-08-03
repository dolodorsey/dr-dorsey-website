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

assign('Dorsey / Kollective', [
  'Dr. Dorsey', 'The Kollective ENT.', 'Courses', 'Consultations', 'HugLife', 'Black Pages',
]);

assign('Nightlife', [
  'Opium ATL', 'Sea Salt ATL', 'Tulum ATL', 'Hungry AF', 'Goodfellas Pizza & Wings', 'Revel',
]);

assign('Rose on Piedmont', ['Rose on Piedmont']);
assign('Events / Activations', ['GROWN-ISH', 'Taste of Art', 'Freedom Fest', 'Freedom Fest : Juneteent Atl']);

assign('App(s)', [
  'GOOD TIMES', 'On Call', 'S.O.S.', 'Luxe on Demand', 'The Law', 'The Vote', 'Mission 365',
]);

assign('Products / Clothing', ['Bodega', 'STUSH', 'PULSE', 'Make Atlanta Great Again', 'Hakuna Matata']);
assign('Water Sourcing', ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks']);
assign('Beverages', ['Infinity Water', 'Tribal Water', 'Pronto Energy', 'The Tribe Wine']);
assign('Help 911', ['Help 911', 'Reset Therapy', 'Umbrella Injury Network']);
assign('Sole Exchange / PSA', ['Sole Exchange', "Let's Talk About It", "Playmaker's Sports Association"]);

assign('Casper Group', [
  'The Casper Group', 'Angel Wings', 'Pasta Bish', 'Taco Yaki', 'Patty Daddy', 'Espresso Co.',
  'Tha Morning After', "Toss'd", 'Toss’d', 'Sweet Tooth', 'Mojo Juice', 'Mr. Oyster',
  'Peace Pizza', 'American Dragon',
]);

assign('Umbrella Group', [
  'The Umbrella Group', 'The Mind Studio', 'Brand Studio', 'The Brand Studio',
  'Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services',
  "The People's Dept.", 'Umbrella Accounting', 'The Automation Office', 'Umbrella Travel',
]);

assign('The Inner Circle', [
  'The Fraternity', "The Gentleman's Club", 'The Gentleman’s Club', 'The Tribe', 'The Tribe - Memphis',
  'Trailblazers', 'Little Farmers of the Future', "Member's Elite", 'Member’s Elite',
]);

assign('The University', ['The University']);

const byDivision: Record<string, DepartmentTitle> = {
  'founder & enterprise': 'Dorsey / Kollective',
  'hospitality & nightlife': 'Nightlife',
  'events & cultural ip': 'Events / Activations',
  'technology & apps': 'App(s)',
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
