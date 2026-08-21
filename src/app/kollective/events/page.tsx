import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';
import { eventMotion } from '@/lib/event-motion';

export const metadata: Metadata = {
  title: 'Current — The Kollective',
  description: 'Current Kollective events, cultural programming, reservations, RSVPs, and direct access.',
};

export default function CurrentPage() {
  return (
    <SectionHub
      active="current"
      eyebrow="CURRENT CULTURE"
      title="What is moving now."
      intro="The live calendar, featured experiences, reservations, RSVPs, and the shortest path into what The Kollective is producing right now."
      metrics={[
        { value: 'SEP 04–07', label: 'Labor Day Weekend programming in Atlanta' },
        { value: '4 LIVE', label: 'New event animations now powering current discovery' },
        { value: 'ONE APP', label: 'RSVP, reserve, discover, and receive updates' },
      ]}
      features={[
        {
          eyebrow: 'FRIDAY · LABOR DAY WEEKEND',
          title: 'Taste of Art',
          description: 'Art, food, music, people, and experience design brought together as one cultural environment.',
          href: 'https://111atl.com',
          meta: 'Open official event hub',
          badge: 'Featured',
          animation: eventMotion.tasteOfArt,
        },
        {
          eyebrow: 'SUNDAY · LABOR DAY WEEKEND',
          title: 'BLOW',
          description: 'The all-white nightlife experience at Seven Midtown with a direct path to event access.',
          href: 'https://111atl.com',
          meta: 'Open official event hub',
          badge: 'All White',
          animation: eventMotion.blow,
        },
        {
          eyebrow: 'MONDAY · LABOR DAY WEEKEND',
          title: 'TEA TIME',
          description: 'Business, brotherhood, competition, and culture on the course for the Labor Day golf tournament.',
          href: 'https://111atl.com',
          meta: 'Open official event hub',
          badge: 'Golf',
          animation: eventMotion.teaTime,
        },
        {
          eyebrow: 'NEW YEAR’S EVE',
          title: 'BRAVO',
          description: 'The premium New Year’s Eve celebration built as the closing statement for the year.',
          href: 'https://111atl.com',
          meta: 'Open official event hub',
          badge: 'NYE',
          animation: eventMotion.bravo,
        },
      ]}
      groups={[
        {
          eyebrow: 'PLAN THE NIGHT',
          title: 'Access before arrival.',
          description: 'Handle the practical move first. Use the correct path for guest lists, tables, celebrations, and event questions.',
          items: [
            { title: 'RSVP / Guest List', description: 'Submit attendance details for the current experience.', href: '/app/forms/rsvp', meta: 'RSVP' },
            { title: 'Reserve a Table', description: 'Start a table, birthday, or nightlife reservation request.', href: '/app/forms/reserve-table', meta: 'Reserve' },
            { title: 'Open the Kollective App', description: 'Discover active companies, events, access routes, and updates in one place.', href: '/app', meta: 'Open App' },
          ],
        },
        {
          eyebrow: 'CURRENT PLATFORMS',
          title: 'Keep discovery live.',
          description: 'Use the customer platforms for ongoing discovery while every event keeps its own verified listing and terms.',
          items: [
            { title: 'GOOD TIMES', description: 'Discover culture, nightlife, experiences, and what is happening around you.', href: 'https://www.thegoodtimesworldwide.com', meta: 'Visit Platform' },
            { title: '111ATL', description: 'Open the current Atlanta event hub and move directly into active event inventory.', href: 'https://111atl.com', meta: 'Open Events' },
            { title: 'Enterprise Event Inquiry', description: 'Bring a venue, sponsorship, activation, media, or partnership opportunity.', href: '/app/forms/inquiry', meta: 'Start Inquiry' },
          ],
        },
      ]}
      primaryAction={{ label: 'Open Current Access', href: 'https://111atl.com' }}
      secondaryAction={{ label: 'Reserve a Table', href: '/app/forms/reserve-table' }}
    />
  );
}
