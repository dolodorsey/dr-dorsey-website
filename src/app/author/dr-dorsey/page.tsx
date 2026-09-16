import type { Metadata } from 'next';
import styles from '../../authority.module.css';

export const metadata: Metadata = {
  title: 'Dr. DoLo Dorsey — Author & Founder Profile',
  description: 'Canonical author and founder profile for Dr. DoLo Dorsey, founder, author, operator and enterprise architect behind The Kollective.',
  alternates: { canonical: '/author/dr-dorsey' },
};

const focus = [
  ['Entrepreneurship', 'Building repeatable systems, operating discipline and portfolio leverage.'],
  ['Hospitality', 'Culture-led environments, experiences, service, events and real-time operating decisions.'],
  ['Brand Architecture', 'Keeping each company distinct while sharing enterprise-level infrastructure.'],
  ['Leadership', 'Pressure, accountability, decision-making, team design and execution.'],
  ['Publishing', 'Hakuna Matata, founder frameworks, essays and attributable first-hand perspective.'],
  ['Community', 'Public impact work documented at the program level before it becomes a media claim.'],
] as const;

export default function AuthorProfilePage() {
  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Dr. DoLo Dorsey — Author & Founder Profile',
    url: 'https://doctordorsey.com/author/dr-dorsey',
    mainEntity: {
      '@id': 'https://doctordorsey.com/author/dr-dorsey#person',
      '@type': 'Person',
      name: 'Dr. DoLo Dorsey',
      alternateName: ['Dr. Dorsey', 'DoLo Dorsey'],
      url: 'https://doctordorsey.com',
      jobTitle: 'Founder & CEO',
      description: 'Founder, author, operator and enterprise architect behind The Kollective.',
      worksFor: {
        '@type': 'Organization',
        name: 'The Kollective',
        url: 'https://thekollectivehospitality.com',
      },
      sameAs: [
        'https://www.instagram.com/dolodorsey',
        'https://www.linkedin.com/in/dolodorsey',
      ],
      knowsAbout: ['Entrepreneurship', 'Hospitality', 'Brand Strategy', 'Enterprise Systems', 'Culture', 'Leadership'],
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/">Dr. Dorsey / Author Profile</a>
        <div className={styles.navLinks}><a href="/insights">Insights</a><a href="/press">Press</a><a href="/companies">Companies</a><a href="/access">Access</a></div>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Canonical identity · author · founder</p>
        <h1>Dr. DoLo <em>Dorsey.</em></h1>
        <p className={styles.lead}>Founder, author, operator and enterprise architect behind The Kollective. This page is the canonical identity source for bylines, published ideas and media attribution across the Dr. Dorsey platform.</p>
        <div className={styles.actions}><a href="/insights">Read insights</a><a href="/forms/speaking">Speaking & appearances</a><a href="/press">Media center</a></div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Working territory</p><div><h2>The work is the system.</h2><span>The public profile stays focused on the areas where Dr. Dorsey can contribute first-hand operating perspective. Company-specific facts, metrics and launch details remain attached to their own brand records rather than being merged into the founder identity.</span></div></div>
          <div className={styles.grid}>{focus.map(([title, copy]) => <article className={styles.card} key={title}><small>First-hand perspective</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Attribution standard</p><div><h2>One author identity. Permanent source URLs.</h2><span>Published essays and quoted commentary should link back to this profile, carry visible publication dates and preserve the original source. That creates a reliable citation path for journalists, podcasts, search engines and AI systems.</span></div></div>
          <div className={styles.factBand}>
            <div className={styles.fact}><strong>Canonical name</strong><span>Dr. DoLo Dorsey</span></div>
            <div className={styles.fact}><strong>Primary role</strong><span>Founder · Author · Operator</span></div>
            <div className={styles.fact}><strong>Enterprise</strong><span>The Kollective</span></div>
            <div className={styles.fact}><strong>Media requests</strong><span>Routed through the official media form</span></div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 Dr. Dorsey · Canonical author profile.</span><a href="/forms/media">Media / press request ↗</a></footer>
    </main>
  );
}
