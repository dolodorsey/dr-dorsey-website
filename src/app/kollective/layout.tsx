import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Kollective — One Enterprise. Independent Brands. Direct Access.',
  description: 'The official Kollective enterprise platform: twenty current-focus entities, eight independent divisions, direct public actions and the roadmap for one unified member app.',
  openGraph: {
    title: 'The Kollective — One Enterprise. Many Worlds.',
    description: 'Explore the current focus, full enterprise portfolio, direct access routes and unified enterprise app roadmap.',
    images: ['https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-black.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Kollective — One Enterprise. Many Worlds.',
    description: 'Independent brands. Shared enterprise leverage. Direct action through one platform.',
  },
};

/**
 * The Kollective is a separate entity from Dr. Dorsey and keeps its own
 * identity — brighter gold, deeper black, its own paper and type. The surface
 * technique is shared; the brand is not. This scope supplies the Kollective
 * tokens to every surface underneath it.
 */
export default function KollectiveLayout({ children }: { children: React.ReactNode }) {
  return <div data-brand="kollective">{children}</div>;
}
