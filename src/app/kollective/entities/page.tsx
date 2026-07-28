import type { Metadata } from 'next';
import EntityDirectory from './EntityDirectory';

export const metadata: Metadata = {
  title: 'Entity Universe — The Kollective',
  description: 'The complete public company, brand, platform, institution, hospitality, service, water, and impact identity system.',
};

export default function EntitiesPage() {
  return <EntityDirectory />;
}
