import { redirect } from 'next/navigation';
import { CART_ORIGIN } from '@/lib/shopify';

export const metadata = {
  title: 'Hakuna Matata — The Book by Dr. Dorsey',
  description: 'Live for today, plan for tomorrow, party tonight. The mindset that built an empire — in your hands.',
};

// /book is a bookmarkable, shareable 1-click buy link.
// Uses CART_ORIGIN from lib/shopify so this stays in sync with the shop page
// whenever the Bodega storefront host changes.
export default function BookPage() {
  redirect(`${CART_ORIGIN}/products/hakuna-matata-by-dr-dorsey`);
}
