import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Kollective — Multi-City Enterprise',
  description: 'The Kollective is a multi-city ecosystem spanning hospitality, food, events, products, services, technology and institutions.',
  openGraph: {
    title: 'The Kollective — One Enterprise. Many Worlds.',
    description: 'Independent brands. Shared leverage. Built for scale.',
    images: ['https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-black.png'],
  },
};

export default function KollectiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
