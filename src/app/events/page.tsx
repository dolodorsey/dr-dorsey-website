'use client';

import MotionCover from '@/components/MotionCover';
import { motion } from '@/lib/motion';
import { eventMotion } from '@/lib/event-motion';

const items = [
  {
    name: 'Taste of Art',
    eyebrow: 'FRIDAY · LABOR DAY WEEKEND',
    description: 'Art, food, music, people, and experience design brought together in one cultural environment.',
    href: 'https://111atl.com',
    animation: eventMotion.tasteOfArt,
  },
  {
    name: 'BLOW',
    eyebrow: 'SUNDAY · ALL WHITE PARTY',
    description: 'The Labor Day Weekend all-white nightlife experience at Seven Midtown.',
    href: 'https://111atl.com',
    animation: eventMotion.blow,
  },
  {
    name: 'TEA TIME',
    eyebrow: 'MONDAY · GOLF TOURNAMENT',
    description: 'Business, brotherhood, competition, and culture on the course for Labor Day Weekend.',
    href: 'https://111atl.com',
    animation: eventMotion.teaTime,
  },
  {
    name: 'BRAVO',
    eyebrow: 'NEW YEAR’S EVE',
    description: 'The New Year’s Eve celebration built as a premium closing statement for the year.',
    href: 'https://111atl.com',
    animation: eventMotion.bravo,
  },
  {
    name: 'Rose on Piedmont',
    eyebrow: 'VENUE',
    description: 'Weekly programming, tables, birthdays, and direct venue access.',
    href: '/app/forms/rsvp?venue=Rose%20on%20Piedmont',
    animation: motion.rose,
  },
];

export default function EventsPage() {
  return (
    <main style={{ minHeight: '100svh', background: '#050505', color: '#f5f0e8', fontFamily: 'Manrope, Inter, sans-serif' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '18px clamp(18px,4vw,64px)', background: 'rgba(5,5,5,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(216,176,76,.18)' }}>
        <a href="/" style={{ color: '#f5f0e8', textDecoration: 'none', fontWeight: 900, letterSpacing: '.18em' }}>DR. DORSEY</a>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/companies" style={{ color: '#b9b2a4', textDecoration: 'none', fontSize: 12 }}>Companies</a>
          <a href="/app?install=1" style={{ color: '#0a0804', background: '#d8b04c', textDecoration: 'none', padding: '11px 16px', borderRadius: 999, fontSize: 11, fontWeight: 900 }}>DOWNLOAD APP</a>
        </div>
      </nav>

      <header style={{ maxWidth: 1500, margin: '0 auto', padding: 'clamp(70px,10vw,150px) clamp(18px,4vw,60px) 50px' }}>
        <p style={{ margin: 0, color: '#d8b04c', fontSize: 10, fontWeight: 900, letterSpacing: '.22em' }}>CURRENT / EVENTS</p>
        <h1 style={{ maxWidth: 900, margin: '16px 0 18px', fontSize: 'clamp(48px,9vw,112px)', lineHeight: '.88', letterSpacing: '-.07em' }}>What is moving now. No digging.</h1>
        <p style={{ maxWidth: 650, color: '#aaa396', fontSize: 'clamp(14px,2vw,18px)', lineHeight: 1.65 }}>Open the current event, move directly to the official event hub, or handle venue access in one step.</p>
      </header>

      <section id="current" style={{ maxWidth: 1500, margin: '0 auto', padding: '0 clamp(18px,4vw,60px) 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 16 }}>
        {items.map((item) => (
          <a key={item.name} href={item.href} style={{ minWidth: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,.12)', borderRadius: 28, background: '#0d0b08', color: '#fff', textDecoration: 'none' }}>
            <div style={{ aspectRatio: '16/11', position: 'relative' }}><MotionCover animation={item.animation} alt={item.name} veil /></div>
            <div style={{ padding: 22 }}>
              <small style={{ color: '#d8b04c', fontWeight: 900, letterSpacing: '.16em' }}>{item.eyebrow}</small>
              <h2 style={{ margin: '10px 0 9px', fontSize: 31, lineHeight: .95, letterSpacing: '-.05em' }}>{item.name}</h2>
              <p style={{ minHeight: 48, margin: 0, color: '#aaa396', fontSize: 12, lineHeight: 1.55 }}>{item.description}</p>
              <b style={{ display: 'block', marginTop: 22, color: '#d8b04c', fontSize: 10, letterSpacing: '.14em' }}>OPEN DIRECTLY ↗</b>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
