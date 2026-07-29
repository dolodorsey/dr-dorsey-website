import { notFound, redirect } from 'next/navigation';

const FORMS = new Set([
  'bulk-orders',
  'speaking',
  'book-club',
  'media',
  'general-inquiry',
]);

export default async function HakunaMatataFormAlias(props: { params: Promise<{ form: string }> }) {
  const params = await props.params;
  if (!FORMS.has(params.form)) notFound();
  redirect(`https://khg-forms.vercel.app/hakuna-matata/${params.form}`);
}
