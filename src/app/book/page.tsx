import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Hakuna Matata — The Book by Dr. Dorsey',
  description: 'Live for today, plan for tomorrow, party tonight. The mindset that built an empire — in your hands.',
};

// /book is a bookmarkable, shareable 1-click buy link.
// Sends visitors DIRECTLY to the product page on the Bodega store
// (bodegabodegabodega.com custom domain -> bodgeaworldwide.myshopify.com backend).
const BOOK_PRODUCT_URL =
  'https://www.bodegabodegabodega.com/products/hakuna-matata-by-dr-dorsey';

export default function BookPage() {
  redirect(BOOK_PRODUCT_URL);
}
