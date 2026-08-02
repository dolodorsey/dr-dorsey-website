import { notFound, redirect } from 'next/navigation';

const FORMS = new Set([
  'bulk-orders',
  'speaking',
  'book-club',
  'media',
  'general-inquiry',
]);

export default function HakunaMatataFormAlias({ params }: { params: { form: string } }) {
  if (!FORMS.has(params.form)) notFound();
  redirect(`https://khg-forms.vercel.app/hakuna-matata/${params.form}`);
}
