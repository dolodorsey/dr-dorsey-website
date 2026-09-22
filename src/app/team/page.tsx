import type { Metadata } from 'next';
import EnterpriseTeamPage from '@/components/EnterpriseTeamPage';

export const metadata: Metadata = {
  title: 'Enterprise Team — Dr. Dorsey',
  description: 'Meet the enterprise command and current owner-operators supporting Dr. Dorsey and the portfolio.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeamPage() {
  return <EnterpriseTeamPage brand="dorsey" />;
}
