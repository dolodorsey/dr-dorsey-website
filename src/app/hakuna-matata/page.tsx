import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hakuna Matata — The Book by Dr. Dorsey',
  description: 'Bulk orders, speaking requests, book clubs, media inquiries and general information for Hakuna Matata by Dr. Dorsey.',
};

export default function HakunaMatataPage() {
  redirect('https://khg-forms.vercel.app/hakuna-matata');
}
