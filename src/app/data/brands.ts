export type BrandStatus = 'flagship' | 'active' | 'seasonal' | 'legacy' | 'dev';

export interface Brand {
  name: string;
  division: string;
  status: BrandStatus;
  featured?: boolean;
}

export const brands: Brand[] = [
  { name: 'HugLife Events', division: 'Events', status: 'flagship', featured: true },
  { name: 'Forever Futbol', division: 'Museums', status: 'flagship', featured: true },
  { name: 'Casper Group', division: 'F&B', status: 'flagship', featured: true },
  { name: 'Good Times', division: 'Technology', status: 'active' },
  { name: 'Mind Studio', division: 'Wellness', status: 'active' },
  { name: 'Infinity Water', division: 'Products', status: 'active' },
  { name: 'Pronto Energy', division: 'Products', status: 'active' },
  { name: 'NOIR', division: 'Events', status: 'active' },
  { name: 'Taste of Art', division: 'Events', status: 'active' },
  { name: 'REMIX', division: 'Events', status: 'active' },
  { name: 'Gangsta Gospel', division: 'Events', status: 'seasonal' },
  { name: 'WRST BHVR', division: 'Events', status: 'seasonal' },
  { name: 'Underground King', division: 'Events', status: 'active' },
  { name: 'Soul Sessions', division: 'Events', status: 'active' },
  { name: 'The Kulture', division: 'Events', status: 'active' },
  { name: 'Cravings', division: 'Events', status: 'active' },
  { name: 'Stella', division: 'Events', status: 'active' },
  { name: "Sunday's Best", division: 'Events', status: 'legacy' },
  { name: 'Paparazzi', division: 'Events', status: 'legacy' },
  { name: 'Bodegea', division: 'F&B', status: 'legacy' },
  { name: 'Scented Flowers', division: 'Lifestyle', status: 'legacy' },
  { name: 'Rule Radar', division: 'Technology', status: 'dev' },
  { name: 'UTube University', division: 'Technology', status: 'dev' },
  { name: 'Mission 365', division: 'Technology', status: 'dev' },
  { name: 'Living Legends', division: 'Museums', status: 'dev' },
  { name: 'On Call', division: 'Services', status: 'legacy' },
  { name: 'Roadside', division: 'Services', status: 'legacy' },
  { name: 'S.O.S', division: 'Services', status: 'active' },
  { name: 'Umbrella Group', division: 'Services', status: 'active' },
  { name: 'ICONIC', division: 'Events', status: 'active' },
  { name: 'Pawchella', division: 'Events', status: 'seasonal' },
];

export const statusColors: Record<BrandStatus, string> = {
  flagship: '#C8A96E',
  active: 'rgba(111,168,111,0.8)',
  seasonal: 'rgba(111,143,168,0.8)',
  legacy: 'rgba(138,118,80,0.5)',
  dev: 'rgba(168,111,111,0.7)',
};
