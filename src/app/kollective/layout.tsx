import type { Metadata } from 'next';

const KOLLECTIVE_URL = 'https://thekollectivehospitality.com';
const KOLLECTIVE_LOGO = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-black.png';

export const metadata: Metadata = {
  title: 'The Kollective — One Enterprise. Independent Brands. Direct Access.',
  description: 'The official Kollective enterprise platform: independent brands across focused divisions, direct public actions and one enterprise operating layer.',
  alternates: {
    canonical: KOLLECTIVE_URL,
  },
  openGraph: {
    title: 'The Kollective — One Enterprise. Many Worlds.',
    description: 'Explore the current focus, full enterprise portfolio, direct access routes and unified enterprise app roadmap.',
    url: KOLLECTIVE_URL,
    siteName: 'The Kollective',
    type: 'website',
    images: [KOLLECTIVE_LOGO],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Kollective — One Enterprise. Many Worlds.',
    description: 'Independent brands. Shared enterprise leverage. Direct action through one platform.',
    images: [KOLLECTIVE_LOGO],
  },
};

/**
 * The Kollective is a separate entity from Dr. Dorsey and keeps its own
 * identity — brighter gold, deeper black, its own paper and type. The surface
 * technique is shared; the brand is not. This scope supplies the Kollective
 * tokens to every surface underneath it.
 */
export default function KollectiveLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${KOLLECTIVE_URL}/#organization`,
    name: 'The Kollective Hospitality Group',
    alternateName: 'The Kollective',
    url: KOLLECTIVE_URL,
    logo: KOLLECTIVE_LOGO,
    founder: {
      '@type': 'Person',
      name: 'Dr. DoLo Dorsey',
      url: 'https://doctordorsey.com',
    },
  };

  return (
    <div data-brand="kollective">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {children}
    </div>
  );
}
