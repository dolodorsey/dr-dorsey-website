import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';

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
        { value: 'AUG 07', label: 'GROWN-ISH returns to Atlanta' },
        { value: 'AUG 22', label: 'Taste of Art cultural experience' },
        { value: 'ONE APP', label: 'RSVP, reserve, discover, and receive updates' },
      ]}
      features={[
        {
          eyebrow: 'FRIDAY · AUGUST 07',
          title: 'GROWN-ISH',
          description: 'The Friday night experience built for grown energy, culture, music, and direct VIP access.',
          href: 'https://www.eventbrite.com/e/the-grown-ish-aug-07-tickets-1988881854165',
          meta: 'Official Eventbrite listing',
          badge: 'Featured',
        },
        {
          eyebrow: 'SATURDAY · AUGUST 08',
          title: 'Back to School Drive',
          description: 'A community activation connecting school support, families, partners, and direct participation.',
          href: 'https://www.eventbrite.com/e/the-back-to-school-drive-aug-08-tickets-1988881869210',
          meta: 'Official Eventbrite listing',
        },
        {
          eyebrow: 'SUNDAY · AUGUST 09',
          title: 'Soul Session',
          description: 'A culture-forward Sunday program centered on music, connection, atmosphere, and community.',
          href: 'https://www.eventbrite.com/e/the-soul-session-aug-09-tickets-1988881865198',
          meta: 'Official Eventbrite listing',
        },
        {
          eyebrow: 'SATURDAY · AUGUST 22',
          title: 'Taste of Art',
          description: 'Art, music, food, people, and experience design brought together as one cultural environment.',
          href: 'https://www.eventbrite.com/e/the-taste-of-art-aug-22-tickets-1988881972519',
          meta: 'Official Eventbrite listing',
          badge: 'Major Event',
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
            { title: 'Rose on Piedmont', description: 'Enter current Rose programming, reservations, birthdays, and VIP access.', href: '/app/forms/reserve-table', meta: 'Plan a Visit' },
            { title: 'Enterprise Event Inquiry', description: 'Bring a venue, sponsorship, activation, media, or partnership opportunity.', href: '/app/forms/inquiry', meta: 'Start Inquiry' },
          ],
        },
      ]}
      primaryAction={{ label: 'Open Current Access', href: '/app' }}
      secondaryAction={{ label: 'Reserve a Table', href: '/app/forms/reserve-table' }}
    />
  );
}
