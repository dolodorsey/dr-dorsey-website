import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hakuna Matata — The Book by Dr. Dorsey',
  description: 'Official home of Hakuna Matata by Dr. DoLo Dorsey.',
};

export default function BookPage() {
  redirect('/hakuna-matata');
}
