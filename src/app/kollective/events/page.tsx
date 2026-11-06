import type { Metadata } from 'next';
import SectionHub from '../_components/SectionHub';
import { eventMotion } from '@/lib/event-motion';
import { BLACK_BALL_TICKETS, kollectiveSeason } from '@/lib/kollective-season';

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
      heroAnimation={eventMotion.blackBall}
      metrics={[
        { value: 'NOV 21–DEC 31', label: 'The current season in Atlanta' },
        { value: '4 LIVE', label: 'Focused event discovery without portfolio clutter' },
        { value: 'ONE APP', label: 'RSVP, reserve, discover, and receive updates' },
      ]}
      features={kollectiveSeason.map((event) => ({
        eyebrow: event.date,
        title: event.title,
        description: event.description,
        href: event.href,
        meta: event.cta,
        badge: event.badge,
        animation: event.animation,
      }))}
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
      primaryAction={{ label: 'Get Black Ball Tickets', href: BLACK_BALL_TICKETS }}
      secondaryAction={{ label: 'Reserve a Table', href: '/app/forms/reserve-table' }}
    />
  );
}
