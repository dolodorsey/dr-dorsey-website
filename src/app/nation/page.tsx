import { redirect } from 'next/navigation';

export const metadata = {
  title: 'The Nation — Governance, Community & Enterprise',
  description: 'Citizenship, membership, business, sponsorship and participation inquiries for The Nation initiative.',
};

export default function NationAlias() {
  redirect('https://khg-forms.vercel.app/nation');
}
