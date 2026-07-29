import type { Metadata } from 'next';
import Reveal from '@/components/flagship/Reveal';
import SectionHead from '@/components/flagship/SectionHead';
import PathGrid from '@/components/flagship/PathGrid';
import Timeline from '@/components/flagship/Timeline';
import { careerDepartments, EMBLEM } from '@/lib/flagship-kollective';
import sections from '@/components/flagship/sections.module.css';
import styles from '../kollective.module.css';

export const metadata: Metadata = {
  title: 'Careers — The Kollective Hospitality Group',
  description:
    'Hospitality, creative, technology, food, growth, and enterprise operations roles across The Kollective portfolio.',
};

const APPLY = 'https://doctordorsey.com/forms/hiring_inquiry';

const culture = [
  {
    era: '01',
    title: 'The room is the standard.',
    body:
      'Every role here eventually touches a guest, a customer, or a partner. The test is the same one hospitality has always used: would they come back, and would they bring someone.',
  },
  {
    era: '02',
    title: 'Ownership over instruction.',
    body:
      'Divisions run lean on purpose. You are given a mandate and the enterprise leverage behind it, not a queue of tickets. The work is judged on what shipped and what it changed.',
  },
  {
    era: '03',
    title: 'Cross-brand by default.',
    body:
      'A creative role touches nightlife, food, and commerce in the same week. The portfolio is the training — few places let you operate across this many categories this quickly.',
  },
];

const paths = [
  {
    audience: 'Open application',
    line: 'No role posted that fits? Tell us what you do and which division you belong in.',
    href: APPLY,
    cta: 'Apply directly',
  },
  {
    audience: 'Venue & event staff',
    line: 'Bar, floor, security, production, and hospitality crew for weekly programming in Atlanta.',
    href: `${APPLY}?role=venue`,
    cta: 'Join the crew',
  },
  {
    audience: 'Creative network',
    line: 'Photographers, videographers, designers, and editors working across the portfolio on a project basis.',
    href: `${APPLY}?role=creative`,
    cta: 'Join the network',
  },
  {
    audience: 'Vendors & suppliers',
    line: 'Companies that want to supply or service the enterprise across any of the nine divisions.',
    href: 'https://doctordorsey.com/forms/vendor',
    cta: 'Register as a vendor',
  },
];

export default function CareersPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/kollective">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={EMBLEM} alt="The Kollective" />
        </a>
        <div className={styles.navLinks}>
          <a href="/kollective#philosophy">Philosophy</a>
          <a href="/kollective#portfolio">Portfolio</a>
          <a href="/kollective/locations">Locations</a>
          <a href="/kollective/entities">Entities</a>
        </div>
        <a className={styles.navCta} href={APPLY}>Apply</a>
      </nav>

      <section className={styles.intro} style={{ paddingTop: 'clamp(150px, 18vh, 240px)' }}>
        <p className={styles.kicker}>Careers at The Kollective</p>
        <h1>Work across<br />nine worlds.</h1>
        <p>
          The enterprise runs hospitality, food, commerce, technology, services, and
          community platforms out of one command layer. That means the work is wider than
          a job title and the learning curve is steeper than most places will offer you.
        </p>
      </section>

      <Timeline
        kicker="How we operate"
        title={<>Three things<br /><em>that are true here.</em></>}
        standfirst="Read these before you apply. They describe the job more accurately than any listing."
        chapters={culture}
      />

      <section className={sections.section}>
        <SectionHead
          kicker="Departments"
          title={<>Six functions.<br /><em>One standard.</em></>}
          standfirst="Where roles sit across the enterprise. Specific openings move constantly — the fastest route in is an open application against the function you fit."
        />
        <div className={sections.paths}>
          {careerDepartments.map((department, index) => (
            <Reveal key={department.name} delay={index * 70}>
              <a className={sections.path} href={`${APPLY}?department=${encodeURIComponent(department.name)}`}>
                <span className={sections.pathNum}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{department.name}</h3>
                <p>{department.detail}</p>
                <div className={sections.marks} style={{ marginBottom: '1.4rem' }}>
                  {department.roles.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
                <span className={sections.pathCta}>Apply to this function →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <PathGrid
        kicker="Other ways in"
        title={<>Not a full-time role?<br /><em>Still a door.</em></>}
        standfirst="Crew, creative network, and vendor routes run continuously alongside permanent hiring."
        paths={paths}
        tone="paper"
      />

      <footer className={styles.footer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EMBLEM} alt="The Kollective" />
        <p>Independent brands. Shared enterprise leverage. Direct action.</p>
        <div>
          <a href="/kollective">Home</a>
          <a href="/kollective/locations">Locations</a>
          <a href="/access">Access</a>
        </div>
      </footer>
    </main>
  );
}
