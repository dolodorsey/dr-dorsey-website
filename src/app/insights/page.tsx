import type { Metadata } from 'next';
import styles from '../authority.module.css';

export const metadata: Metadata = {
  title: 'Insights — Dr. Dorsey',
  description: 'First-hand essays, operating notes, founder frameworks and published ideas from Dr. DoLo Dorsey.',
  alternates: { canonical: '/insights' },
};

const lanes = [
  ['Founder Essays', 'Original first-person ideas on entrepreneurship, leadership, pressure, ambition and building durable systems.'],
  ['Operating Notes', 'Practical lessons from building and managing distinct companies without flattening them into one brand.'],
  ['Hakuna Matata', 'Approved ideas and excerpts connected to the founder philosophy behind the book, always linked to a stable source.'],
  ['Field Cases', 'Evidence-backed breakdowns of launches, activations, systems and operating decisions after the work is public.'],
  ['Questions & Answers', 'Direct, attributable answers to recurring founder, hospitality, culture, brand and enterprise questions.'],
  ['Research & Signals', 'Original observations and data-led briefs built from public evidence, first-party experience and clearly named sources.'],
] as const;

const standards = [
  ['Stable source', 'Every published idea receives a permanent canonical URL.'],
  ['Named author', 'Bylined work links back to one author profile for identity consistency.'],
  ['Visible dates', 'Published and materially updated dates remain visible to readers and search engines.'],
  ['Evidence first', 'Factual claims are sourced before publication; opinion is presented as opinion.'],
] as const;

export default function InsightsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Dr. Dorsey Insights',
    url: 'https://doctordorsey.com/insights',
    description: 'First-hand essays, operating notes, founder frameworks and published ideas from Dr. DoLo Dorsey.',
    about: { '@id': 'https://doctordorsey.com/author/dr-dorsey#person' },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className={styles.nav}>
        <a className={styles.navBrand} href="/">Dr. Dorsey / Insights</a>
        <div className={styles.navLinks}><a href="/author/dr-dorsey">Author</a><a href="/press">Press</a><a href="/companies">Companies</a><a href="/access">Access</a></div>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>First-hand perspective · permanent sources</p>
        <h1>Ideas worth <em>citing.</em></h1>
        <p className={styles.lead}>This is the home for Dr. Dorsey’s published thinking: original essays, operating frameworks, book-connected ideas and evidence-backed lessons from the work. Drafts do not become bylined pieces until they are approved for publication.</p>
        <div className={styles.actions}><a href="/author/dr-dorsey">View author profile</a><a href="/press">Open media center</a></div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Editorial lanes</p><div><h2>Depth first. Distribution second.</h2><span>The goal is not commodity content. Each published piece should contain a first-hand point of view, a useful framework, an original story, or evidence that cannot be copied from a generic search result.</span></div></div>
          <div className={styles.grid}>{lanes.map(([title, copy]) => <article className={styles.card} key={title}><small>Dr. Dorsey</small><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.quote}>“I don’t think bigger because the world told me to. I think bigger because I can see the architecture.”</p>
          <p className={styles.quoteSource}>Dr. Dorsey · canonical founder site</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}><p>Publication standard</p><div><h2>Make every article usable by people, search engines and journalists.</h2><span>A strong citation trail compounds. The same idea can later become an interview answer, podcast topic, keynote segment, social clip or press pitch without changing the underlying source.</span></div></div>
          <div className={styles.factBand}>{standards.map(([title, copy]) => <div className={styles.fact} key={title}><strong>{title}</strong><span>{copy}</span></div>)}</div>
        </div>
      </section>

      <footer className={styles.footer}><span>© 2026 Dr. Dorsey · Published ideas and first-hand operating perspective.</span><a href="/forms/media">Media / press request ↗</a></footer>
    </main>
  );
}
