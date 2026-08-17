import type { Metadata } from 'next';
import EnterpriseTeamPage from '@/components/EnterpriseTeamPage';

export const metadata: Metadata = {
  title: 'Leadership Team — The Kollective',
  description: 'Meet The Kollective executive leadership, nightlife division, and board.',
};

export default function KollectiveTeamPage() {
  return <EnterpriseTeamPage brand="kollective" />;
}
