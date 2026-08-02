'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './CompanyDirectory.module.css';
import MotionCover from './MotionCover';
import type { RegistryEntity } from '@/lib/kollective-public';
import { currentFocusBrands } from '@/lib/enterprise';
import { motionFor } from '@/lib/motion';

type Company = {
  key: string;
  name: string;
  category: string;
  status: string;
  href: string;
  logo?: string;
  hero?: string;
  division: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function fromRegistry(entity: RegistryEntity): Company {
  return {
    key: entity.id || entity.slug,
    name: entity.name,
    category: entity.category || entity.short_description || '',
    status: entity.status_label || entity.status || '',
    href: `/go/${entity.slug}?source=companies_page`,
    logo: entity.logo_url || undefined,
    hero: entity.hero_url || undefined,
    division: entity.division_name || 'The Enterprise',
  };
}

/**
 * Every company in the enterprise registry.
 *
 * Two large featured cards lead, then the roster runs four across, grouped by
 * department. Falls back to the built-in focus list if the registry is
 * unreachable so the page is never empty.
 */
export default function CompanyDirectory() {
  const [entities, setEntities] = useState<RegistryEntity[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/enterprise/registry', { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Registry request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => setEntities(Array.isArray(payload.entities) ? payload.entities : []))
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          console.error('company_directory_fetch_failed', error);
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  const companies: Company[] = useMemo(() => {
    if (entities && entities.length) return entities.map(fromRegistry);
    if (entities || failed) {
      return currentFocusBrands.map((brand) => ({
        key: brand.name,
        name: brand.name,
        category: brand.category,
        status: brand.status,
        href: brand.href,
        logo: brand.logo,
        division: 'Current Enterprise Command',
      }));
    }
    return [];
  }, [entities, failed]);

  const featured = companies.slice(0, 2);
  const rest = companies.slice(2);

  /** Departments in registry order, so the highest-priority ones lead. */
  const sections = useMemo(() => {
    const order: string[] = [];
    const grouped = new Map<string, Company[]>();
    for (const company of rest) {
      if (!grouped.has(company.division)) {
        grouped.set(company.division, []);
        order.push(company.division);
      }
      grouped.get(company.division)!.push(company);
    }
    return order.map((division) => ({
      division,
      slug: slugify(division),
      items: grouped.get(division)!,
    }));
  }, [rest]);

  if (!companies.length) {
    return <p className={styles.empty}>Loading the enterprise registry…</p>;
  }

  const card = (company: Company, variant: 'feature' | 'tile') => {
    // Covers are artwork only — an animation or a hero still. Logos are never
    // promoted to cover art; a company with neither gets a holding plate until
    // its graphic is delivered.
    const hasMotion = Boolean(motionFor(company.name));
    const awaitingArt = !hasMotion && !company.hero;

    return (
    <a className={`${styles.card} ${styles[variant]}`} href={company.href} key={company.key}>
      <span className={`${styles.media} ${awaitingArt ? styles.awaiting : ''}`}>
        {awaitingArt ? (
          <span className={styles.plate} aria-hidden="true">
            <b>{company.name}</b>
            <i>{company.division}</i>
          </span>
        ) : (
          <MotionCover name={company.name} image={company.hero} alt={company.name} />
        )}
      </span>
      {company.logo && !awaitingArt ? (
        <img className={styles.logo} src={company.logo} alt="" aria-hidden="true" />
      ) : null}
      <div className={styles.body}>
        {company.status ? <small className={styles.status}>{company.status}</small> : null}
        <h3 className={styles.name}>{company.name}</h3>
        {company.category ? <p className={styles.category}>{company.category}</p> : null}
        <b className={styles.open}>Open ↗</b>
      </div>
    </a>
    );
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.chips} aria-label="Jump to a department">
        {sections.map((section) => (
          <a href={`#${section.slug}`} key={section.slug}>
            {section.division}
            <b>{section.items.length}</b>
          </a>
        ))}
      </nav>

      {featured.length ? (
        <div className={styles.grid} style={{ marginBottom: 66 }}>
          {featured.map((company) => card(company, 'feature'))}
        </div>
      ) : null}

      {sections.map((section) => (
        <section className={styles.section} id={section.slug} key={section.slug}>
          <header className={styles.sectionHead}>
            <h3>{section.division}</h3>
            <span>
              {section.items.length} {section.items.length === 1 ? 'company' : 'companies'}
            </span>
          </header>
          <div className={styles.grid}>{section.items.map((company) => card(company, 'tile'))}</div>
        </section>
      ))}
    </div>
  );
}
