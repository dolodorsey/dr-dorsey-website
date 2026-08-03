'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';
import { placeRelatedTogether } from '@/lib/roster';

type Entity = {
  slug: string;
  name: string;
  division: string;
  status: string;
  line: string;
  href?: string;
  logo?: string;
};

const e = (slug: string, name: string, division: string, status: string, line: string, href?: string, logo?: string): Entity =>
  ({ slug, name, division, status, line, href, logo });

const entities: Entity[] = placeRelatedTogether([
  e('kollective','The Kollective','Enterprise','Command layer','One enterprise. Many worlds.','/','dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png'),
  e('dr-dorsey','Dr. Dorsey','Enterprise','Founder platform','Builder. Architect. Operator.','https://doctordorsey.com','dr_dorsey/01_logos/DorseyNewW.png'),
  e('iconic','Iconic','Entertainment','Portfolio IP','Culture, music, and influence.','https://111atl.com','dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png'),
  e('good-times','GOOD TIMES','Apps / Tech','Active platform','Your city, unlocked.','https://www.thegoodtimesworldwide.com','good_times/00-brand-assets/logos/good-times-logo-gold-black.png'),
  e('casper-group','The Casper Group','Hospitality','Active portfolio','Twelve hospitality brands built to travel.','https://caspergroupworldwide.com','casper_group/logos/logo-full.png'),
  e('umbrella-group','The Umbrella Group','Services','Active network','One request. The right company.','https://theumbrella.group','good-times-app/umbrella_group/umbrella_group_landscape.png'),
  e('sole-exchange','Sole Exchange','Philanthropy','Active initiative','Style that gives back.','https://soleexchangeworldwide.com','email-newsletters/sole-exchange-logo.png'),
  e('help-911','Help 911','Help 911','Active network','When the city needs backup.','https://www.help911.help','umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png'),
  e('pronto-energy','Pronto Energy','Beverages','Active brand','Energy for every world.','https://prontoenergydrink.com','pronto_energy/logos/pronto-logo.png'),
  e('infinity-water','Infinity Water','Beverages','Active brand','Premium hydration and hospitality.','https://watertoinfinity.com'),
  e('stush','STUSH','Products','Active brand','Never blend in.','https://stushusa.com'),
  e('pulse','PULSE','Products','Portfolio brand','The energy behind the moment.','/forms','pulse/pulse_landing_v1/021_pulse_3d_logo_stage.jpg'),
  e('rose-on-piedmont','Rose on Piedmont','Entertainment','Operating','Atlanta nights, elevated.','https://111atl.com'),
  e('grown-ish','GROWN-ISH','Entertainment','Active programming','Not too young. Not too old.','https://111atl.com','grownish/03_event_flyers/GROWNISH_COMING_SOON.png'),
  e('taste-of-art','Taste of Art','Entertainment','Active programming','Canvas. Cuisine. Culture.','https://111atl.com','taste_of_art/01_logos/TASTE_OF_ART_LOGO.png'),
  e('huglife','HugLife','Entertainment','Cultural platform','Culture-forward events.','https://111atl.com','huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png'),
  e('forever-futbol','Forever Futbol','Entertainment','Cultural institution','The global game, permanently celebrated.'),
  e('secret-society','Secret Society','Entertainment','Portfolio IP','Invitation changes everything.','https://111atl.com'),
  e('soul-sessions','Soul Sessions','Entertainment','Portfolio IP','Live. Timeless. Intimate.'),
  e('noir','NOIR','Entertainment','Portfolio IP','The art of being selective.'),
  e('parking-lot-pimpin','Parking Lot Pimpin','Entertainment','Portfolio IP','Car and bike culture.'),
  e('sundays-best','Sunday’s Best','Entertainment','Portfolio IP','Where style meets Sunday.'),
  e('boil-gone-wild','Boil Gone Wild','Entertainment','Portfolio IP','The ultimate crab and block party.'),
  e('the-kulture','The Kulture','Entertainment','Cultural platform','The city wears its story.'),
  e('on-call','On Call','Apps / Tech','Active platform','Real help, intelligently routed.','https://khg-on-call.vercel.app'),
  e('sos','S.O.S.','Apps / Tech','Active platform','Support on demand.','https://sos-app-website.vercel.app'),
  e('luxe-on-demand','Luxe on Demand','Apps / Tech','In development','Premium service, one request away.','https://luxe-on-demand-app.vercel.app'),
  e('the-law','The Law','Apps / Tech','In development','Legal access made clearer.','https://the-law-web.vercel.app'),
  e('the-vote','The Vote','Apps / Tech','Planning','Civic information that moves.','https://doctordorsey.com/forms/inquiry'),
  e('mission-365','Mission 365','Apps / Tech','Impact technology','A mission every day.'),
  e('black-pages','Black Pages','Apps / Tech','In development','Find and support the network.','https://doctordorsey.com/forms/inquiry'),
  e('bodega','Bodega','Products','Active commerce','The pop-up store with city flavor.','https://bodegabodegabodega.com','bodega/hakuna-matata/promo-02-graffiti-red.png'),
  e('myxx','MYXX','Products','Portfolio brand','Made to be mixed.'),
  e('ace-theory','Ace Theory','Products','Portfolio brand','Play the hand with intention.'),
  e('match','MATCH','Products','Portfolio brand','Connection by design.'),
  e('maga-atl','Make Atlanta Great Again','Products','Active movement','Atlanta culture, worn forward.','https://thaoldatlanta.com','maga/generated/maga_hero.png'),
  e('hakuna-matata','Hakuna Matata','Products','Available now','The founder’s field manual.','https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey'),
  e('scented-flowers','Scented Flowers','Products','Portfolio brand','A museum exists inside a memory.'),
  e('everyday-water','Everyday Water Group','Water Sourcing','Active parent','Water security for everyday life.','https://everyday-water-group.vercel.app'),
  e('nativa-waterworks','Nativa Waterworks','Water Sourcing','Active source company','Source-led water systems.','https://nativa-waterworks.vercel.app'),
  e('aquifer-waterworks','Aquifer Waterworks','Water Sourcing','Active source company','Protect the source.','https://aquifer-waterworks.vercel.app'),
  e('tribal-water','Tribal Water','Beverages','Active brand','Hydration with belonging.','https://tribal-water.vercel.app'),
  e('tribe-wine','The Tribe Wine','Beverages','Building','A bottle for the table we share.','https://the-tribe-wine.vercel.app'),
  e('members-elite','Members Elite','Philanthropy','Member institution','Train hard. Live elite.','https://doctordorsey.com/forms/onboarding'),
  e('the-university','The University','Philanthropy','Building','Practical knowledge for builders.','https://the-university.vercel.app'),
  e('playmakers','Playmakers Sports Association','Philanthropy','Youth impact','Build the player. Build the person.','https://doctordorsey.com/forms/volunteer'),
  e('little-farmers','Little Farmers of the Future','Philanthropy','Youth impact','Grow knowledge from the ground up.','https://doctordorsey.com/forms/volunteer'),
  e('angel-wings','Angel Wings','Hospitality','Portfolio concept','Heavenly wings.','https://caspergroupworldwide.com'),
  e('pasta-bish','Pasta Bish','Hospitality','Flagship concept','Pasta. Period.','https://caspergroupworldwide.com'),
  e('taco-yaki','Taco Yaki','Hospitality','Flagship concept','Japanese-Mexican street food.','https://caspergroupworldwide.com'),
  e('patty-daddy','Patty Daddy','Hospitality','Portfolio concept','Smashed right.','https://caspergroupworldwide.com'),
  e('espresso-co','Espresso Co.','Hospitality','Portfolio concept','Premium espresso, done right.','https://caspergroupworldwide.com'),
  e('morning-after','Morning After','Hospitality','Portfolio concept','Breakfast anytime.','https://caspergroupworldwide.com'),
  e('peace-pizza','Peace Pizza','Hospitality','Flagship concept','Spread the slice.','https://caspergroupworldwide.com'),
  e('american-dragon','American Dragon','Hospitality','Flagship concept','American Chinese. Luxury takeout.','https://caspergroupworldwide.com'),
  e('mr-oyster','Mr. Oyster','Hospitality','Portfolio concept','Raw and refined.','https://caspergroupworldwide.com'),
  e('sweet-tooth','Sweet Tooth','Hospitality','Portfolio concept','Dessert. On demand.','https://caspergroupworldwide.com'),
  e('tossd','Toss’d','Hospitality','Portfolio concept','Salads. But better.','https://caspergroupworldwide.com'),
  e('mojo-juice','Mojo Juice','Hospitality','Portfolio concept','Cold-pressed power.','https://caspergroupworldwide.com'),
  e('umbrella-auto','Umbrella Auto Exchange','Services','Service company','Smarter moves start with the right ride.','https://theumbrella.group'),
  e('umbrella-realty','Umbrella Realty Group','Services','Service company','Property, possibility, and ownership.','https://theumbrella.group'),
  e('umbrella-clean','Umbrella Clean Services','Services','Service company','Clean spaces. Clear standards.','https://theumbrella.group'),
  e('umbrella-injury','Umbrella Injury Network','Services','Service network','Support when life changes unexpectedly.','https://theumbrella.group'),
  e('peoples-department','The People’s Department','Services','People operations','Built for the people who keep things moving.','https://theumbrella.group'),
  e('umbrella-accounting','Umbrella Accounting','Services','Service company','Structure, numbers, and peace of mind.','https://theumbrella.group'),
  e('umbrella-travel','Umbrella Travel','Services','Service company','Curated movement.','https://theumbrella.group'),
  e('mind-studio','The Mind Studio','Services','Wellness platform','Mental wellness, modernized.','https://theumbrella.group'),
  e('reset-therapy','Reset Therapy','Services','Wellness platform','Make room to begin again.','https://theumbrella.group'),
], (item) => item.name);

const divisions = ['All', ...Array.from(new Set(entities.map((item) => item.division)))];

export default function EntityDirectory() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Entity | null>(null);
  const visible = useMemo(() => filter === 'All' ? entities : entities.filter((item) => item.division === filter), [filter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('entity');
    if (requested) setSelected(entities.find((item) => item.slug === requested) ?? null);
  }, []);

  return (
    <main className={styles.page}>
      <nav><a href="/">THE KOLLECTIVE</a><div><a href="/companies">Companies</a><a href="/events">Current</a><a href="/links">Links</a><a href="/access">Access</a></div></nav>
      <header>
        <p>THE COMPLETE IDENTITY SYSTEM / {entities.length} ENTITIES</p>
        <h1>EVERY MARK<br/><em>OPENS A WORLD.</em></h1>
        <span>Open any profile for its division, current status, identity, purpose, and live destination.</span>
      </header>
      <section className={styles.filters}>{divisions.map((item) => <button className={filter === item ? styles.active : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</section>
      <section className={styles.grid}>
        {visible.map((item, index) => (
          <button onClick={() => setSelected(item)} key={item.slug}>
            <small>{String(index + 1).padStart(2,'0')} / {item.division}</small>
            <div>{item.logo ? <img src={item.logo} alt={`${item.name} logo`} /> : <strong>{item.name}</strong>}</div>
            <h2>{item.name}</h2><p>{item.line}</p><span>{item.status}</span><b>Open profile ↗</b>
          </button>
        ))}
      </section>
      {selected ? (
        <aside className={styles.modal} role="dialog" aria-modal="true">
          <button className={styles.backdrop} onClick={() => setSelected(null)} aria-label="Close profile" />
          <article>
            <button className={styles.close} onClick={() => setSelected(null)}>×</button>
            <small>{selected.division} / {selected.status}</small>
            <div className={styles.profileMark}>{selected.logo ? <img src={selected.logo} alt={`${selected.name} logo`} /> : <strong>{selected.name}</strong>}</div>
            <h2>{selected.name}</h2><p>{selected.line}</p>
            {selected.href ? <a href={selected.href}>Enter live destination ↗</a> : <a href="https://doctordorsey.com/forms/inquiry">Entity inquiry ↗</a>}
          </article>
        </aside>
      ) : null}
    </main>
  );
}
