import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hakuna Matata — The Book by Dr. Dorsey',
  description: 'Live for today, plan for tomorrow, party tonight. The mindset that built an empire — in your hands.',
};

// /book is a bookmarkable shortcut. The shop page features THE BOOK as its hero,
// so we send visitors straight there.
export default function BookPage() {
  redirect('/shop');
}
