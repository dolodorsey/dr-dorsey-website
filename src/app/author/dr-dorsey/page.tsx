import type { Metadata } from 'next';
import { DORSEY_ORIGIN, DORSEY_CAREER_SUMMARY, DORSEY_SHORT_BIO, DORSEY_SELECTED_WORK } from '@/lib/dorsey-career';
import styles from '../../authority.module.css';

export const metadata: Metadata = {
  title: 'Dr. DoLo Dorsey — Atlanta Roots, Selected Work & Author Profile',
  description: 'Dr. Dorsey’s Atlanta nightlife roots, selected curation credits, hospitality perspective and writing. Founder of The Kollective and author of Hakuna Matata.',
  alternates: { canonical: 'https://doctordorsey.com/author/dr-dorsey' },
};

const focus = [
  ['Culture & Curation', 'Nightlife, parties, live entertainment and artist-led activations.'],
  ['Hospitality', 'Experiences, atmosphere, service and the operating work behind a room.'],
  ['Independent Brands', 'Distinct identities and customer promises, supported by shared capabilities.'],
  ['Leadership', 'Judgment, accountability and the discipline of following through.'],
  ['Publishing', 'Hakuna Matata: The Power in Peace, founder essays and original perspective.'],
  ['Community', 'Connection, participation and a commitment to meaningful work beyond the business.'],
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
      description: DORSEY_SHORT_BIO,
      worksFor: {
        '@type': 'Organization',
        name: 'The Kollective',
        url: 'https://thekollectivehospitality.com',
      },
      sameAs: [
        'https://www.instagram.com/dolodorsey',
        'https://www.linkedin.com/in/dolodorsey',
      ],
      knowsAbout: ['Entrepreneurship', 'Hospitality', 'Event Curation', 'Brand Strategy', 'Culture', 'Leadership'],
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, '\\u003c') }} />
      <nav className={styles.nav} aria-label="Author profile navigation">
        <a className={styles.navBrand} href="https://doctordorsey.com/">Dr. Dorsey / The Story</a>
        <div className={styles.navLinks}><a href="#selected-work">Selected work</a><a href="/insights">Insights</a><a href="/press">Press</a><a href="https://thekollectivehospitality.com">The Kollective</a></div>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Atlanta roots · culture · hospitality · enterprise</p>
        <h1>Dr. DoLo <em>Dorsey.</em></h1>
        <p className={styles.lead}>Entrepreneur. Cultural curator. Hospitality operator. Author. A body of work that starts in Atlanta’s nightlife and extends into experiences, independent brands and The Kollective.</p>
        <div className={styles.actions}><a href="#selected-work">Explore selected work</a><a href="/forms/speaking">Speaking & appearances</a><a href="/press">Media center</a></div>
      </header>

      <section className={styles.section} id="atlanta-roots" aria-labelledby="atlanta-roots-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p>The beginning</p>
            <div>
              <h2 id="atlanta-roots-title">Before the enterprise,<br />there was Atlanta.</h2>
              <span>{DORSEY_ORIGIN} That history belongs at the beginning of the story—not as a footnote to the companies that came later.</span>
              <span>{DORSEY_CAREER_SUMMARY} His work connects nightlife, hospitality, cultural experiences, brand development and publishing.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="selected-work" aria-labelledby="selected-work-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p>Selected career credits</p>
            <div><h2 id="selected-work-title">The work behind<br />the perspective.</h2><span>Curation credits from Dr. Dorsey’s personal career, presented separately from The Kollective’s company portfolio.</span></div>
          </div>
          <div className={styles.grid}>
            {DORSEY_SELECTED_WORK.map((work) => (
              <article className={styles.card} key={work.key}>
                <small>{work.category} · {work.role}</small>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </article>
            ))}
          </div>
          <div className={styles.actions}><a href="/forms/media">Discuss the work / request an interview</a><a href="https://thekollectivehospitality.com">Explore The Kollective</a></div>
          <p style={{ marginTop: 24, fontSize: 12, color: 'var(--light-muted)' }}>Career information supplied by Dr. Dorsey. Curation is the credited role; inclusion does not imply ownership of an artist’s brand or a project.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="perspective-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>The perspective</p><div><h2 id="perspective-title">Culture is the starting point.<br />The work keeps expanding.</h2><span>The public story connects the experiences, the operating lessons and the ideas. Each company keeps its own identity; the founder’s record gives context to the person behind the direction.</span></div></div>
          <div className={styles.grid}>{focus.map(([title, copy]) => <article className={styles.card} key={title}><small>Dr. Dorsey</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="book-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>The author</p><div><h2 id="book-title">Hakuna Matata.<br />The Power in Peace.</h2><span>Peace, discipline, boundaries and intentional action. The book connects a personal philosophy with the responsibility of building, leading and living.</span></div></div>
          <div className={styles.actions}><a href="/#book">Explore the book</a><a href="/insights">Founder insights</a></div>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 Dr. Dorsey · Founder, curator and author.</span><a href="/forms/media">Media / press request ↗</a></footer>
    </main>
  );
}
