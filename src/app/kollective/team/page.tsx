import type { Metadata } from 'next';
import EnterpriseTeamPage from '@/components/EnterpriseTeamPage';

export const metadata: Metadata = {
  title: 'Leadership Team — The Kollective',
  description: 'Meet The Kollective enterprise command and current owner-operators by operating lane.',
};

export default function KollectiveTeamPage() {
  return <EnterpriseTeamPage brand="kollective" />;
}
