'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './CompanyDirectory.module.css';
import MotionCover from './MotionCover';
import type { RegistryEntity } from '@/lib/kollective-public';
import { currentFocusBrands } from '@/lib/enterprise';
import { motion, motionFor, type MotionAsset, type Orientation } from '@/lib/motion';
import { eventMotion } from '@/lib/event-motion';
import { isEventEntity, isPublicEvent, isRetired, priorityRank } from '@/lib/roster';
import { departmentFor, departmentRank, departmentSlug } from '@/lib/company-departments';

type Company = {
  key: string;
  slug?: string;
  name: string;
  category: string;
  description?: string;
  status: string;
  href: string;
  logo?: string;
  hero?: string;
  division: string;
};

type CardVideoSpec = {
  path: string;
  poster?: string;
};

const CREATIVE_MOTION_BASE =
  'https://woqlhjodiedyqfvzweoe.supabase.co/storage/v1/object/public/animations';
const TRANSPARENT_POSTER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

/**
 * Exact Creative Engine video assignments.
 *
 * Only landscape animations belong here. Frequency currently has a portrait
 * MP4 only, so its card deliberately falls through to the verified landscape
 * entity graphic from the public registry rather than stacking/cropping it.
 */
const CARD_VIDEO_BY_SLUG: Record<string, CardVideoSpec> = {
  'synergy-sounds': { path: 'synergy-ani2.mp4' },
  'the-casper-group': { path: 'casper-group/casper/casper-group-ani.mp4' },
  'angel-wings': { path: 'casper-group/angel-wings-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/angel-wings.gif` },
  'pasta-bish': { path: 'casper-group/pasta-bish-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/pasta-bish.gif` },
  'taco-yaki': { path: 'casper-group/taco-yaki-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/taco-yaki.gif` },
  'patty-daddy': { path: 'casper-group/patty-daddy-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/patty-daddy.gif` },
  'espresso-co': { path: 'casper-group/espresso-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/espresso-co.gif` },
  'morning-after': { path: 'casper-group/mornig-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/morning-after.gif` },
  tossd: { path: 'casper-group/tossd-ani.mp4' },
  'sweet-tooth': { path: 'casper-group/sweet-tooth-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/sweet-tooth.gif` },
  'mojo-juice': { path: 'casper-group/mojo-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/mojo-juice.gif` },
  'mr-oyster': { path: 'casper-group/mr-oyster-ani.mp4', poster: `${CREATIVE_MOTION_BASE}/gif/mr-oyster.gif` },
  'peace-pizza': { path: 'casper-group/peace-pizza-ani.mp4' },
  'american-dragon': { path: 'casper-group/american-dragon.mp4' },
  'members-elite': { path: 'members-elite-ani.mp4' },
};

/** Exact landscape assignments already available in the shared motion library. */
const CARD_MOTION_BY_SLUG: Record<string, MotionAsset> = {
  'dr-dorsey': motion.drAni,
  'the-kollective-ent': motion.kollectiveGlobal,
  'the-tribe-memphis': motion.tribe,
  'the-university': motion.university,
  'everyday-water-group': motion.everydayWater,
  'aquifer-waterworks': motion.aquifer,
  'nativa-waterworks': motion.nativa,
  'infinity-water': motion.infinityWater,
  'tribal-water': motion.tribalWater,
  'pronto-energy': motion.pronto,
  'rose-on-piedmont': motion.rose,
  'sole-exchange': motion.soleExchange,
  bodega: motion.bodega,
  stush: motion.stush,
  pulse: motion.pulse,
  'make-atlanta-great-again': motion.maga,
  'good-times': motion.goodTimes,
  courses: motion.kollectiveLibrary,
  consultations: motion.dorseyConsult,
  'the-fraternity': motion.fraternity,
  'the-gentlemans-club': motion.gentlemansClub,
  'opium-atl': motion.opium,
  'sea-salt-atl': motion.seaSaltAlt,
  'tulum-atl': motion.tulum,
  'hungry-af': motion.hungryAf,
  'goodfellas-pizza-wings': motion.goodfellasAlt,
  'taste-of-art': motion.tasteOfArt,
  'on-call': motion.onCall,
  sos: motion.sos,
  'luxe-on-demand': motion.luxeOnDemand,
  'the-law': motion.theLaw,
  'the-vote': motion.theVote,
  'the-inner-circle': motion.innerCircle,
  'the-umbrella-group': motion.umbrellaGroup,
  'help-911': motion.help911,
  'the-mind-studio': motion.umbrellaMind,
  'umbrella-auto-exchange': motion.umbrellaAuto,
  'umbrella-realty-group': motion.umbrellaRealty,
  'umbrella-clean-services': motion.umbrellaClean,
  'umbrella-accounting': motion.umbrellaAccounting,
  'automation-office': motion.umbrellaAutomation,
  'reset-therapy': motion.resetTherapy,
  'lets-talk-about-it': motion.letsTalk,
  'playmakers-sports-association': motion.psa,
  trailblazers: motion.trailblazer,
  'little-farmers-of-the-future': motion.littleFarmers,
  'freedom-fest': motion.freedomFest,
  'hakuna-matata': motion.hakunaMatata,
  'black-pages': motion.blackPages,
  'mission-365': motion.mission365,
  'project-x': motion.projectX,
  'greek-ball': eventMotion.greekBall,
  'monsters-ball': eventMotion.monstersBall,
  'snow-ball': eventMotion.snowBall,
  'champagne-ball': eventMotion.champagneBall,
  'black-ball': eventMotion.blackBall,
  'rose-ball': eventMotion.roseBall,
  bravo: eventMotion.bravo,
};

const KINETIC_STILL_SLUGS = new Set([
  'just-print',
  'mister-manufacturing',
  'living-legacy-farms',
  'frequency-productions',
]);

function cardMotion(company: Company): MotionAsset | undefined {
  if (company.slug) {
    const exactVideo = CARD_VIDEO_BY_SLUG[company.slug];
    if (exactVideo) {
      return {
        src: `${CREATIVE_MOTION_BASE}/${exactVideo.path}`,
        poster: exactVideo.poster || company.hero || TRANSPARENT_POSTER,
        orientation: 'landscape',
      };
    }
    return CARD_MOTION_BY_SLUG[company.slug];
  }

  // Registry-outage fallback data has no stable slug. Name lookup is allowed
  // only here so the page remains useful during an API outage.
  const fallback = motionFor(company.name);
  return fallback?.orientation === 'landscape' ? fallback : undefined;
}

/** Every public company cover is rendered in the landscape system. */
function cardOrientation(): Orientation {
  return 'landscape';
}

function isFormUrl(url?: string | null): boolean {
  if (!url) return false;
  return /(?:\/forms?(?:[/?#.]|$)|forms\.html|type=(?:inquiry|consultation|rsvp|reservation|onboarding|volunteer))/i.test(url);
}

function usableWebUrl(url?: string | null): url is string {
  return Boolean(url && /^https?:\/\//i.test(url) && !isFormUrl(url));
}

function companyWebsite(entity: RegistryEntity) {
  const directWeb = entity.destinations?.find(
    (destination) =>
      destination.action_key === 'open' &&
      destination.destination_type === 'web' &&
      usableWebUrl(destination.web_url),
  )?.web_url;

  if (usableWebUrl(directWeb)) return directWeb;
  if (usableWebUrl(entity.website_url)) return entity.website_url;

  const primaryWeb = entity.destinations?.find(
    (destination) =>
      destination.is_primary &&
      destination.destination_type === 'web' &&
      usableWebUrl(destination.web_url),
  )?.web_url;

  if (usableWebUrl(primaryWeb)) return primaryWeb;

  // Events with no verified checkout/site still go to the live event hub —
  // never to a lead form. Company fallbacks go to their portfolio department.
  if (isEventEntity(entity.name, entity.division_name || entity.division_slug)) {
    return 'https://111atl.com';
  }

  const department = departmentFor({ name: entity.name, division: entity.division_name });
  if (department === 'Casper Group') return 'https://caspergroupworldwide.com';
  if (department === 'Umbrella Group') return 'https://theumbrella.group';
  if (department === 'Change the World') return 'https://soleexchangeworldwide.com';

  return `https://thekollectivehospitality.com/companies#${departmentSlug(department)}`;
}

function fromRegistry(entity: RegistryEntity): Company {
  return {
    key: entity.id || entity.slug,
    slug: entity.slug,
    name: entity.name,
    category: entity.category || '',
    description: entity.short_description || undefined,
    status: entity.status_label || entity.status || '',
    href: companyWebsite(entity),
    logo: entity.logo_url || undefined,
    hero: entity.hero_url || undefined,
    division: entity.division_name || 'The Enterprise',
  };
}

export default function CompanyDirectory() {
  const [entities, setEntities] = useState<RegistryEntity[] | null>(null);
  const [failed, setFailed] = useState(false);
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
              description: undefined,
              status: brand.status,
              href: isFormUrl(brand.href) ? 'https://thekollectivehospitality.com/companies' : brand.href,
              logo: brand.logo,
              division: 'Current Enterprise Command',
            }))
          : [];

    return source.filter((company) => {
      if (isRetired(company.name)) return false;
      if (isEventEntity(company.name, company.division)) return isPublicEvent(company.name);
      return true;
    });
  }, [entities, failed]);

  const featured = companies.slice(0, 2);
  const rest = companies.slice(2);

  const staples = useMemo(
    () =>
      rest
        .filter((company) => priorityRank(company.name) >= 0)
        .sort((a, b) => priorityRank(a.name) - priorityRank(b.name)),
    [rest],
  );

  const sections = useMemo(() => {
    const grouped = new Map<string, Company[]>();
    for (const company of rest) {
      if (priorityRank(company.name) >= 0) continue;
      const department = departmentFor(company);
      if (!grouped.has(department)) grouped.set(department, []);
      grouped.get(department)!.push(company);
    }
    return [...grouped.entries()]
      .sort(([a], [b]) => departmentRank(a) - departmentRank(b))
      .map(([division, items]) => ({ division, slug: departmentSlug(division), items }));
  }, [rest]);

  if (!companies.length) {
    return <p className={styles.empty}>Loading the enterprise registry…</p>;
  }

  const card = (company: Company, variant: 'feature' | 'tile', shape: Orientation = 'landscape') => {
    const animation = cardMotion(company);
    const hasMotion = Boolean(animation);
    const hasOwnStill = Boolean(company.hero && !brokenArt[company.key]);
    const kineticStill = Boolean(
      !hasMotion && company.slug && KINETIC_STILL_SLUGS.has(company.slug) && hasOwnStill,
    );
    const awaitingArt = !hasMotion && !hasOwnStill;

    return (
      <a className={`${styles.card} ${styles[variant]}`} href={company.href} key={company.key}>
        <span
          className={`${styles.media} ${shape === 'portrait' ? styles.portrait : ''} ${awaitingArt ? styles.awaiting : ''} ${kineticStill ? styles.kineticStill : ''}`}
        >
          {awaitingArt ? (
            <span className={styles.plate} aria-hidden="true">
              <b>{company.name}</b>
              <i>{company.division}</i>
            </span>
          ) : (
            <MotionCover
              animation={animation}
              image={company.hero}
              alt={company.name}
              onImageError={() => setBrokenArt((prev) => ({ ...prev, [company.key]: true }))}
            />
          )}
        </span>
        <div className={styles.body}>
          {company.status ? <small className={styles.status}>{company.status}</small> : null}
          <h3 className={styles.name}>{company.name}</h3>
          {company.category ? <small className={styles.status}>{company.category}</small> : null}
          {company.description ? <p className={styles.category}>{company.description}</p> : null}
          <b className={styles.open}>Open ↗</b>
        </div>
      </a>
    );
  };

  const rows = (items: Company[], variant: 'feature' | 'tile', group = true) => {
    if (!group) {
      return <div className={styles.grid}>{items.map((company) => card(company, variant, 'landscape'))}</div>;
    }

    const landscape = items.filter((company) => cardOrientation(company) === 'landscape');

    return (
      <div className={styles.grid}>
        {landscape.map((company) => card(company, variant, 'landscape'))}
      </div>
    );
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.chips} aria-label="Jump to a department">
        {staples.length ? (
          <a href="#staples" className={styles.chipLead}>
            Staples
            <b>{staples.length}</b>
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

      {staples.length ? (
        <section className={styles.section} id="staples">
          <header className={styles.sectionHead}>
            <h3>Staples</h3>
          </header>
          {rows(staples, 'tile', false)}
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
