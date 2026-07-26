import { redirect } from 'next/navigation';

export const metadata = {
  title: 'The University — Trades, Entrepreneurship & Workforce',
  description: 'Admissions, program, employer, instructor and campus inquiries for The University workforce initiative.',
};

export default function UniversityAlias() {
  redirect('https://khg-forms.vercel.app/university');
}
