'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './CompanyDirectory.module.css';
import MotionCover from './MotionCover';
import type { RegistryEntity } from '@/lib/kollective-public';
import { currentFocusBrands } from '@/lib/enterprise';
import { motionFor, orientationFor, type Orientation } from '@/lib/motion';
import { isRetired, priorityRank } from '@/lib/roster';

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
  /** Hero stills that failed to load — those cards fall back to the holding plate. */
  const [brokenArt, setBrokenArt] = useState<Record<string, true>>({});

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
    const source: Company[] =
      entities && entities.length
        ? entities.map(fromRegistry)
        : entities || failed
          ? currentFocusBrands.map((brand) => ({
              key: brand.name,
              name: brand.name,
              category: brand.category,
              status: brand.status,
              href: brand.href,
              logo: brand.logo,
              division: 'Current Enterprise Command',
            }))
          : [];

    // Retired brands are dropped here rather than filtered per-section, so
    // they cannot reappear through a count, a chip, or the featured pair.
    return source.filter((company) => !isRetired(company.name));
  }, [entities, failed]);

  const featured = companies.slice(0, 2);
  const rest = companies.slice(2);

  /** Newest work — pinned above the departments. */
  const inProduction = useMemo(
    () =>
      rest
        .filter((company) => priorityRank(company.name) >= 0)
        .sort((a, b) => priorityRank(a.name) - priorityRank(b.name)),
    [rest],
  );

  /** Departments in registry order, so the highest-priority ones lead. */
  const sections = useMemo(() => {
    const order: string[] = [];
    const grouped = new Map<string, Company[]>();
    for (const company of rest) {
      if (priorityRank(company.name) >= 0) continue;
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

  /** True while any pinned company is still waiting on its artwork. */
  const productionPending = inProduction.some(
    (company) => !motionFor(company.name) && !company.hero,
  );

  if (!companies.length) {
    return <p className={styles.empty}>Loading the enterprise registry…</p>;
  }

  const card = (company: Company, variant: 'feature' | 'tile', shape: Orientation = 'landscape') => {
    // Covers are artwork only — an animation or a hero still. Logos are never
    // promoted to cover art; a company with neither gets a holding plate until
    // its graphic is delivered.
    const hasMotion = Boolean(motionFor(company.name));
    const awaitingArt = !hasMotion && (!company.hero || brokenArt[company.key]);

    return (
    <a className={`${styles.card} ${styles[variant]}`} href={company.href} key={company.key}>
      <span
        className={`${styles.media} ${shape === 'portrait' ? styles.portrait : ''} ${awaitingArt ? styles.awaiting : ''}`}
      >
        {awaitingArt ? (
          <span className={styles.plate} aria-hidden="true">
            <b>{company.name}</b>
            <i>{company.division}</i>
          </span>
        ) : (
          <MotionCover
            name={company.name}
            image={company.hero}
            alt={company.name}
            onImageError={() => setBrokenArt((prev) => ({ ...prev, [company.key]: true }))}
          />
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

  /**
   * A row is never half landscape and half portrait. Each list renders as a
   * landscape block followed by a portrait block, so every card in a row has
   * the same frame and the grid stays uniform.
   */
  const rows = (items: Company[], variant: 'feature' | 'tile', group = true) => {
    // The featured pair is a matched set — it always sits side by side in one
    // landscape frame, whatever shape each animation happens to be.
    if (!group) {
      return <div className={styles.grid}>{items.map((c) => card(c, variant, 'landscape'))}</div>;
    }

    const landscape = items.filter((c) => orientationFor(c.name) === 'landscape');
    const portrait = items.filter((c) => orientationFor(c.name) === 'portrait');

    return (
      <>
        {landscape.length ? (
          <div className={styles.grid}>{landscape.map((c) => card(c, variant, 'landscape'))}</div>
        ) : null}
        {portrait.length ? (
          <div className={`${styles.grid} ${landscape.length ? styles.gridNext : ''}`}>
            {portrait.map((c) => card(c, variant, 'portrait'))}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.chips} aria-label="Jump to a department">
        {inProduction.length ? (
          <a href="#in-production" className={styles.chipLead}>
            {productionPending ? 'In production' : 'Just added'}
            <b>{inProduction.length}</b>
          </a>
        ) : null}
        {sections.map((section) => (
          <a href={`#${section.slug}`} key={section.slug}>
            {section.division}
            <b>{section.items.length}</b>
          </a>
        ))}
      </nav>

      {featured.length ? (
        <div className={styles.section}>{rows(featured, 'feature', false)}</div>
      ) : null}

      {inProduction.length ? (
        <section className={styles.section} id="in-production">
          <header className={styles.sectionHead}>
            <h3>{productionPending ? 'In Production' : 'Just Added'}</h3>
            <span>{productionPending ? 'Artwork in progress' : 'Newest artwork'}</span>
          </header>
          {rows(inProduction, 'tile')}
        </section>
      ) : null}

      {sections.map((section) => (
        <section className={styles.section} id={section.slug} key={section.slug}>
          <header className={styles.sectionHead}>
            <h3>{section.division}</h3>
            <span>
              {section.items.length} {section.items.length === 1 ? 'company' : 'companies'}
            </span>
          </header>
          {rows(section.items, 'tile')}
        </section>
      ))}
    </div>
  );
}
