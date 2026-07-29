import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { kollectiveNav, kollectivePages } from '@/lib/kollective-pages';
import styles from './page.module.css';

const pageExperiences = {
  about: {
    eyebrow: 'THE RESPONSIBILITY MAP',
    title: 'Shared leverage. Named ownership.',
    note: 'The enterprise layer connects capability without erasing who is responsible for the public promise.',
    items: [
      ['01', 'Public brand', 'Own identity, offer, claims, customer path, and market truth.'],
      ['02', 'Brand owner', 'Own the decision, delivery standard, risk, and final customer outcome.'],
      ['03', 'Kollective layer', 'Coordinate strategy, creative, systems, data, and cross-brand leverage.'],
      ['04', 'Evidence layer', 'Make status, action, records, and proof visible enough to inspect.'],
    ],
  },
  portfolio: {
    eyebrow: 'THE STATUS DISCIPLINE',
    title: 'A portfolio is not one undifferentiated list.',
    note: 'Every entity should be presented at its current stage. A strong identity never substitutes for operating readiness.',
    items: [
      ['OPERATING', 'Ready to serve', 'Defined offer, accountable owner, current path, and working fulfillment.'],
      ['IN BUILD', 'Moving toward market', 'Named scope and next gate, with launch language kept honest.'],
      ['CONCEPT', 'Protected possibility', 'A developed idea that is not represented as a live operation.'],
    ],
  },
  'operating-model': {
    eyebrow: 'THE HANDOFF',
    title: 'Strategy becomes real through five visible decisions.',
    note: 'Every move should have an owner, an input, a decision, a completion standard, and a next handoff.',
    items: [
      ['01', 'Prioritize', 'Choose the work by readiness, need, risk, capacity, and expected value.'],
      ['02', 'Assign', 'Name the decision owner and the team responsible for execution.'],
      ['03', 'Equip', 'Provide the required systems, inputs, permissions, and deadline.'],
      ['04', 'Prove', 'Record the observable evidence that the work actually completed.'],
      ['05', 'Handoff', 'Move the result to the next accountable owner without ambiguity.'],
    ],
  },
  partnerships: {
    eyebrow: 'THE PROPOSAL ANATOMY',
    title: 'Make the opportunity possible to decide.',
    note: 'A useful proposal arrives with enough definition to route, evaluate, protect, and act on.',
    items: [
      ['01', 'Parties', 'Who is offering, deciding, contributing, and accountable.'],
      ['02', 'Opportunity', 'What is being proposed and why the fit is specific.'],
      ['03', 'Assets', 'What each side actually controls—not what it hopes to secure.'],
      ['04', 'Economics', 'Budget, value exchange, costs, and commercial structure.'],
      ['05', 'Rights + risk', 'Approvals, marks, exclusivity, data, dependencies, and exposure.'],
      ['06', 'Decision path', 'Timeline, measure of success, required evidence, and next gate.'],
    ],
  },
  technology: {
    eyebrow: 'THE ACCOUNTABILITY CHAIN',
    title: 'A click should resolve into an owned outcome.',
    note: 'The public interface and the operating system are one story separated by permissions—not by responsibility.',
    items: [
      ['01', 'Public intent', 'A visitor understands the offer and chooses a real action.'],
      ['02', 'Validated record', 'The system checks, stores, and attributes the request correctly.'],
      ['03', 'Named owner', 'The responsible team receives the work with the context it needs.'],
      ['04', 'Tracked response', 'Progress, exceptions, and decisions remain visible.'],
      ['05', 'Completion proof', 'The outcome is documented instead of inferred from a success screen.'],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(kollectivePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = kollectivePages[slug];
  if (!page) return {};
  return {
    title: `${page.title} — The Kollective`,
    description: page.description,
    alternates: { canonical: `/kollective/${slug}` },
    openGraph: {
      title: `${page.title} — The Kollective`,
      description: page.description,
      images: [{ url: '/brand/kollective-hero-poster.png' }],
    },
  };
}

export default async function KollectiveInformationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = kollectivePages[slug];
  if (!page) notFound();
  const related = Object.entries(kollectivePages).filter(([key]) => key !== slug).slice(0, 3);
  const experience = pageExperiences[slug as keyof typeof pageExperiences];

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <Link href="/kollective" className={styles.brand}>THE KOLLECTIVE</Link>
        <nav aria-label="The Kollective sections">
          {kollectiveNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link href="/access" className={styles.action}>Open Access</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <Image src="/brand/kollective-hero-poster.png" alt="" fill sizes="100vw" priority />
          <div />
          <article>
            <p>{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <span>{page.intro}</span>
          </article>
        </section>

        <section className={styles.facts}>
          {page.facts.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}
        </section>

        {experience ? (
          <section className={`${styles.experience} ${styles[`experience_${slug.replace('-', '_')}`]}`}>
            <header>
              <p>{experience.eyebrow}</p>
              <h2>{experience.title}</h2>
              <span>{experience.note}</span>
            </header>
            <div>
              {experience.items.map(([index, title, body]) => (
                <article key={title}>
                  <b>{index}</b>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.content}>
          <header><p>ENTERPRISE BRIEF</p><h2>{page.title}</h2></header>
          <div>
            {page.sections.map((section, index) => (
              <article key={section.title}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <section>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets?.length ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                </section>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          {related.map(([key, item]) => (
            <Link href={`/kollective/${key}`} key={key}>
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
              <b>↗</b>
            </Link>
          ))}
        </section>

        <section className={styles.cta}>
          <p>CHOOSE THE CORRECT ENTRY POINT</p>
          <h2>Turn discovery into a move.</h2>
          <div><Link href="/access">Open all access</Link><Link href="/forms/inquiry">Enterprise inquiry</Link></div>
        </section>
      </main>

      <footer><strong>The Kollective</strong><span>Independent brands. Shared enterprise leverage. Direct action.</span></footer>
    </div>
  );
}
