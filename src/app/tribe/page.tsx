import { redirect } from 'next/navigation';

export const metadata = {
  title: 'The Tribe — Property, Community & Enterprise',
  description: 'Property, tenancy, community, vendor and employment inquiries for The Tribe campus initiative.',
};

export default function TribeAlias() {
  redirect('https://khg-forms.vercel.app/tribe');
}
