import type { Metadata } from 'next';
import EnterpriseTeamPage from '@/components/EnterpriseTeamPage';

export const metadata: Metadata = {
  title: 'Enterprise Team — Dr. Dorsey',
  description: 'Meet the executive leadership and board supporting Dr. Dorsey and the enterprise.',
};

export default function TeamPage() {
  return <EnterpriseTeamPage brand="dorsey" />;
}
