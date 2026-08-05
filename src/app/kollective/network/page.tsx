import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';

export const metadata: Metadata = {
  title: 'Network — The Kollective',
  description: 'The Kollective water, infrastructure, consumer, community, and education network.',
};

export default function NetworkPage() {
  return (
    <SectionHub
      active="network"
      eyebrow="THE CONNECTED NETWORK"
      title="From source to culture."
      intro="A clear view of the water, infrastructure, consumer, education, and community systems—without collapsing the companies into one brand."
      metrics={[
        { value: 'SOURCE', label: 'Aquifer intelligence and raw-water strategy' },
        { value: 'SYSTEM', label: 'Infrastructure, treatment, and portfolio coordination' },
        { value: 'CULTURE', label: 'Consumer products, education, and community worlds' },
      ]}
      features={[
        {
          eyebrow: 'PORTFOLIO COORDINATION',
          title: 'Everyday Water Group',
          description: 'The coordinating enterprise for water sourcing, infrastructure, treatment, production, and long-term market development.',
          href: 'https://everydaywatergroup.com',
          meta: 'Open company site',
          badge: 'System',
        },
        {
          eyebrow: 'SOURCE INTELLIGENCE',
          title: 'Aquifer Waterworks',
          description: 'Source-led water intelligence, rights, access, and raw-water strategy connected to the Memphis aquifer system.',
          href: 'https://aquiferwaterworks.com',
          meta: 'Open company site',
          badge: 'Source',
        },
        {
          eyebrow: 'INFRASTRUCTURE',
          title: 'Nativa Waterworks',
          description: 'Place-led water infrastructure, clean filtered water, treatment, production, and regional system development.',
          href: 'https://nativawaterworks.com',
          meta: 'Open company site',
          badge: 'Operations',
        },
        {
          eyebrow: 'PREMIUM CONSUMER WATER',
          title: 'Infinity Water',
          description: 'A distinct premium consumer-water brand with its own identity, market, product promise, and sales path.',
          href: 'https://watertoinfinity.com',
          meta: 'Open brand site',
          badge: 'Consumer',
        },
      ]}
      groups={[
        {
          eyebrow: 'SOURCE & INFRASTRUCTURE',
          title: 'The operating water layer.',
          description: 'Each company keeps a defined job. Coordination creates leverage; responsibility remains company-specific.',
          items: [
            { title: 'Everyday Water Group', description: 'Portfolio coordination, development, treatment strategy, production, and expansion.', href: 'https://everydaywatergroup.com', meta: 'Coordinate' },
            { title: 'Aquifer Waterworks', description: 'Raw-water source intelligence, access, rights, and supply strategy.', href: 'https://aquiferwaterworks.com', meta: 'Source' },
            { title: 'Nativa Waterworks', description: 'Filtered water, infrastructure, production, and place-led operations.', href: 'https://nativawaterworks.com', meta: 'Operate' },
          ],
        },
        {
          eyebrow: 'CONSUMER & COMMUNITY',
          title: 'Distinct worlds built from the system.',
          description: 'Consumer water, cultural identity, gathering, and learning remain independent public brands with direct destinations.',
          items: [
            { title: 'Infinity Water', description: 'Premium consumer water positioned as a separate luxury product world.', href: 'https://watertoinfinity.com', meta: 'Shop / Explore' },
            { title: 'Tribal Water', description: 'A separate consumer-water brand rooted in community, identity, and purpose.', href: 'https://tribal-water.vercel.app', meta: 'Explore Brand' },
            { title: 'The Tribe', description: 'The gathering, culture, enterprise, and community world connected to the broader network.', href: 'https://the-tribe-wine.vercel.app', meta: 'Enter World' },
            { title: 'The University', description: 'A national trade-school and workforce platform built for practical skills and economic mobility.', href: 'https://the-university.vercel.app', meta: 'Explore Programs' },
          ],
        },
        {
          eyebrow: 'WORK WITH THE NETWORK',
          title: 'Bring a real opportunity.',
          description: 'Distribution, land, infrastructure, production, logistics, retail, institutional, and community opportunities need a defined scope and accountable owner.',
          items: [
            { title: 'Distribution / Retail', description: 'Introduce a qualified route to market for a specific water or beverage brand.', href: '/app/forms/partnership', meta: 'Partner' },
            { title: 'Infrastructure / Property', description: 'Submit land, facility, production, treatment, or logistics opportunities.', href: '/app/forms/inquiry', meta: 'Submit Opportunity' },
            { title: 'Enterprise Access', description: 'Route the request to the correct company without merging brand responsibilities.', href: '/access', meta: 'Open Access' },
          ],
        },
      ]}
      primaryAction={{ label: 'Explore the Network', href: 'https://everydaywatergroup.com' }}
      secondaryAction={{ label: 'Bring an Opportunity', href: '/app/forms/inquiry' }}
    />
  );
}
