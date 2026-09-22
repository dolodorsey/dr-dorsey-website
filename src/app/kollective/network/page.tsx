import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';

export const metadata: Metadata = {
  title: 'Network — The Kollective',
  description: 'The current Kollective operating network across beverages, entertainment, consumer brands, apps, food, and community.',
};

export default function NetworkPage() {
  return (
    <SectionHub
      active="network"
      eyebrow="THE CONNECTED NETWORK"
      title="Focused companies. Shared leverage."
      intro="A cleaner view of the operating lanes we are actively pushing now. Every company remains distinct while the enterprise connects capital, distribution, technology, marketing, and execution."
      metrics={[
        { value: 'BEVCO', label: 'A full beverage house with distinct consumer brands' },
        { value: 'ICONIC', label: 'Live entertainment, music, concerts, and activations' },
        { value: 'ONE OS', label: 'Shared enterprise leverage without merging brand identities' },
      ]}
      features={[
        {
          eyebrow: 'BEVERAGE HOUSE',
          title: 'BEVCO INTL.',
          description: 'The parent beverage company coordinating Infinity Water, Pronto Energy, ORA, OTINI, TEMPO, Casa Cantina, Island Water, Double Zero, NOIR Espresso Liqueur, PRIVÈ Vodka, and XXX Vodka.',
          href: 'https://bevco-intl.vercel.app',
          meta: 'Open BEVCO',
          badge: 'Portfolio',
        },
        {
          eyebrow: 'LIVE ENTERTAINMENT',
          title: 'ICONIC',
          description: 'Concerts, live entertainment, music, cultural moments, and scalable event IP.',
          href: 'https://iconic-atl.com',
          meta: 'Enter ICONIC',
          badge: 'Entertainment',
        },
        {
          eyebrow: 'FASHION / LIFESTYLE',
          title: 'FĚNYX',
          description: 'A distinct fashion and lifestyle brand built around bold identity, product drops, and culture.',
          href: 'https://fenyx-gules.vercel.app',
          meta: 'Open FĚNYX',
          badge: 'Fashion',
        },
        {
          eyebrow: 'DISCOVERY PLATFORM',
          title: 'GOOD TIMES',
          description: 'A consumer discovery platform connecting people to nightlife, culture, experiences, and places worth knowing.',
          href: 'https://thegoodtimesworldwide.com',
          meta: 'Open GOOD TIMES',
          badge: 'App',
        },
      ]}
      groups={[
        {
          eyebrow: 'CONSUMER',
          title: 'Brands people can touch.',
          description: 'Each product world has its own identity, audience, offer, site, and operating plan.',
          items: [
            { title: 'STUSH', description: 'Elevated streetwear and fashion drops.', href: 'https://stushusa.com', meta: 'Shop / Explore' },
            { title: 'FĚNYX', description: 'Fashion, performance, and lifestyle product world.', href: 'https://fenyx-gules.vercel.app', meta: 'Explore Brand' },
            { title: 'BEVCO INTL.', description: 'The beverage parent and route into the complete brand portfolio.', href: 'https://bevco-intl.vercel.app', meta: 'Open Portfolio' },
          ],
        },
        {
          eyebrow: 'ENTERTAINMENT & CULTURE',
          title: 'Attention into ownership.',
          description: 'Entertainment, discovery, and community platforms built to create durable audience relationships.',
          items: [
            { title: 'ICONIC', description: 'Live entertainment, concert, music, and activation platform.', href: 'https://iconic-atl.com', meta: 'Enter ICONIC' },
            { title: 'GOOD TIMES', description: 'Culture and experience discovery platform.', href: 'https://thegoodtimesworldwide.com', meta: 'Open Platform' },
            { title: 'Sole Exchange', description: 'Sneaker recovery, community impact, and restoration programming.', href: 'https://soleexchangeworldwide.com', meta: 'Enter Initiative' },
          ],
        },
        {
          eyebrow: 'OPERATING PLATFORMS',
          title: 'Systems that compound.',
          description: 'Food, service, productivity, and enterprise infrastructure that can expand market by market.',
          items: [
            { title: 'The Casper Group', description: 'Distinct food concepts built under one operating food house.', href: 'https://caspergroupworldwide.com', meta: 'Open Casper' },
            { title: 'S.O.S.', description: 'Roadside-assistance and service-routing platform.', href: 'https://sos-app-website.vercel.app', meta: 'Open S.O.S.' },
            { title: 'Mission 365', description: 'Mission and productivity platform for consistent daily execution.', href: 'https://mission-365.vercel.app', meta: 'Open Mission 365' },
          ],
        },
      ]}
      primaryAction={{ label: 'Explore Companies', href: '/companies' }}
      secondaryAction={{ label: 'Bring an Opportunity', href: '/app/forms/inquiry' }}
    />
  );
}
