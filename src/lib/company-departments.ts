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
  'GROWN-ISH', 'Taste of Art', 'Freedom Fest', 'Freedom Fest : Juneteent Atl', 'Project X',
]);

assign('Staples', ['Rose on Piedmont', 'Help 911']);

assign('Dorsey / Kollective', [
  'Dr. Dorsey', 'The Kollective ENT.', 'Courses', 'Consultations', 'HugLife', 'Hakuna Matata',
]);

assign('Inner Circle', [
  'GOOD TIMES', 'On Call', 'S.O.S.', 'Luxe on Demand', 'The Law', 'The Vote', 'Mission 365',
  'Black Pages', 'The Black Pages', 'The Fraternity', "The Gentleman's Club", 'The Gentleman’s Club',
  'The Tribe', 'The Tribe - Memphis', 'Trailblazers', 'Little Farmers of the Future',
  "Member's Elite", 'Member’s Elite',
]);

assign('Products / Clothing', ['Bodega', 'STUSH', 'PULSE', 'Make Atlanta Great Again']);
assign('Water Sourcing', ['Everyday Water Group', 'Aquifer Waterworks', 'Nativa Waterworks']);
assign('Beverages', ['Infinity Water', 'Tribal Water', 'Pronto Energy', 'The Tribe Wine']);
assign('Change the World', ['Sole Exchange', "Let's Talk About It", "Playmaker's Sports Association"]);

assign('Casper Group', [
  'The Casper Group', 'Angel Wings', 'Pasta Bish', 'Taco Yaki', 'Patty Daddy', 'Espresso Co.',
  'Tha Morning After', "Toss'd", 'Toss’d', 'Sweet Tooth', 'Mojo Juice', 'Mr. Oyster',
  'Peace Pizza', 'American Dragon',
]);

assign('Umbrella Group', [
  'The Umbrella Group', 'The Mind Studio', 'Brand Studio', 'The Brand Studio',
  'Umbrella Auto Exchange', 'Umbrella Realty Group', 'Umbrella Clean Services',
  "The People's Dept.", "The People's Department", 'Umbrella Accounting',
  'The Automation Office', 'Automation Office', 'Umbrella Travel', 'Reset Therapy',
  'Umbrella Injury Network',
]);

assign('The University', ['The University']);

const byDivision: Record<string, DepartmentTitle> = {
  'founder & enterprise': 'Dorsey / Kollective',
  'hospitality & nightlife': 'Nightlife / Events / Activations',
  'events & cultural ip': 'Nightlife / Events / Activations',
  'technology & apps': 'Inner Circle',
  'products & commerce': 'Products / Clothing',
  'the casper group': 'Casper Group',
  'services & umbrella group': 'Umbrella Group',
  'institutions & impact': 'Inner Circle',
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
