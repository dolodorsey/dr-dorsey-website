import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';

export const metadata: Metadata = {
  title: 'Links — The Kollective',
  description: 'The public command page for Kollective companies, experiences, products, services, platforms, and founder access.',
};

export default function LinksPage() {
  return (
    <SectionHub
      active="links"
      eyebrow="ONE PAGE. EVERY MOVE."
      title="The public command page."
      intro="The shortest verified routes into the enterprise—organized by what you are trying to do, not by the internal organization chart."
      metrics={[
        { value: 'DISCOVER', label: 'Companies, events, platforms, and active worlds' },
        { value: 'ACT', label: 'Reserve, RSVP, buy, apply, partner, or request service' },
        { value: 'CONNECT', label: 'Reach the correct brand, division, or enterprise owner' },
      ]}
      features={[
        {
          eyebrow: 'ENTER THE ENTERPRISE',
          title: 'The Companies',
          description: 'Browse every division and move directly into the correct independent company or platform.',
          href: '/companies',
          meta: 'Open company directory',
          badge: 'Directory',
        },
        {
          eyebrow: 'WHAT IS HAPPENING',
          title: 'Current',
          description: 'Open the live event calendar, featured experiences, RSVPs, reservations, and cultural programming.',
          href: '/events',
          meta: 'Open current culture',
          badge: 'Live',
        },
        {
          eyebrow: 'CUSTOMER PLATFORM',
          title: 'The Kollective App',
          description: 'Use one customer-facing platform for discovery, access, forms, reservations, and enterprise updates.',
          href: '/app',
          meta: 'Open the app',
          badge: 'Primary Access',
        },
        {
          eyebrow: 'FOUNDER WORLD',
          title: 'Dr. Dorsey',
          description: 'Enter the founder platform for Hakuna Matata, strategy, speaking, media, and enterprise leadership.',
          href: 'https://doctordorsey.com',
          meta: 'Open founder site',
          badge: 'Founder',
        },
      ]}
      groups={[
        {
          eyebrow: 'EXPERIENCES & HOSPITALITY',
          title: 'Go somewhere. Do something.',
          description: 'Culture, nightlife, reservations, guest lists, hospitality, and active experiences.',
          items: [
            { title: 'Current Kollective Events', description: 'See what is moving now and use each official event listing.', href: '/events', meta: 'View Calendar' },
            { title: 'GOOD TIMES', description: 'Discover nightlife, culture, experiences, and what is happening around you.', href: 'https://www.thegoodtimesworldwide.com', meta: 'Open Platform' },
            { title: 'Casper Group', description: 'Explore the independent hospitality portfolio and its operating brands.', href: 'https://caspergroupworldwide.com', meta: 'Explore Group' },
            { title: 'Reserve / RSVP', description: 'Start the correct guest-list, table, birthday, or nightlife request.', href: '/app', meta: 'Open Access' },
          ],
        },
        {
          eyebrow: 'PRODUCTS & COMMERCE',
          title: 'Buy from the right brand.',
          description: 'Each product brand keeps its own identity, store, offer, fulfillment, and customer relationship.',
          items: [
            { title: 'Hakuna Matata', description: 'Buy Dr. Dorsey’s founder field manual and enter the philosophy behind the enterprise.', href: 'https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey', meta: 'Buy Book' },
            { title: 'STUSH', description: 'Enter the independent fashion and culture brand.', href: 'https://stushusa.com', meta: 'Shop' },
            { title: 'Bodega', description: 'Explore the independent product, apparel, and culture world.', href: 'https://bodegabodegabodega.com', meta: 'Shop' },
            { title: 'Pronto Energy', description: 'Enter the energy-drink product world and current sales destination.', href: 'https://prontoenergydrink.com', meta: 'Explore Product' },
            { title: 'Infinity Water', description: 'Explore the premium consumer-water brand and product destination.', href: 'https://watertoinfinity.com', meta: 'Explore Water' },
          ],
        },
        {
          eyebrow: 'SERVICES, IMPACT & SYSTEMS',
          title: 'Get help. Build something.',
          description: 'Services, emergency support, community programs, partnerships, and enterprise opportunities.',
          items: [
            { title: 'Umbrella Group', description: 'Enter the services ecosystem for property, travel, wellness, people, and operating support.', href: 'https://theumbrella.group', meta: 'Request Service' },
            { title: 'Help 911', description: 'Enter the personal-injury support and response concierge platform.', href: 'https://www.help911.help', meta: 'Get Help' },
            { title: 'Sole Exchange', description: 'Support the independent footwear donation and community impact platform.', href: 'https://soleexchangeworldwide.com', meta: 'Support Mission' },
            { title: 'Partner with The Kollective', description: 'Submit a defined sponsorship, distribution, property, technology, or strategic opportunity.', href: '/app/forms/partnership', meta: 'Partner' },
            { title: 'Careers / Hiring', description: 'Apply for operating, management, creative, technology, or specialist opportunities.', href: '/app/forms/hiring', meta: 'Apply' },
          ],
        },
      ]}
      primaryAction={{ label: 'Open All Access', href: '/app' }}
      secondaryAction={{ label: 'Browse Companies', href: '/companies' }}
    />
  );
}
