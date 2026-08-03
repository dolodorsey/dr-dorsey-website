"use client";

import {
  ArrowUpRight,
  ArrowLeft,
  Building2,
  CakeSlice,
  CalendarDays,
  Compass,
  Download,
  Grid3X3,
  Home,
  MapPin,
  MessageCircleMore,
  Search,
  Sparkles,
  TicketCheck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./customer-app-v2.module.css";
import motion from "./customer-app-v2-motion.module.css";
import { motion as motionLibrary, motionFor } from "@/lib/motion";

type Destination = {
  fallback_url?: string;
  web_url?: string | null;
  universal_link?: string | null;
  is_primary?: boolean;
};
type Entity = {
  id: string;
  slug: string;
  name: string;
  category?: string | null;
  short_description?: string | null;
  status_label?: string | null;
  logo_url?: string | null;
  hero_url?: string | null;
  website_url?: string | null;
  destinations?: Destination[];
};
type EventItem = {
  id: string;
  city?: string | null;
  market?: string | null;
  event_name: string;
  event_date: string;
  event_time?: string | null;
  venue_name?: string | null;
  neighborhood?: string | null;
  event_category?: string | null;
  description?: string | null;
  ticket_url?: string | null;
  ticket_price?: string | null;
  image_url?: string | null;
  is_free?: boolean;
  ai_summary?: string | null;
  is_featured?: boolean;
  is_curated?: boolean;
};
type ContentItem = {
  id: string;
  title: string;
  summary?: string | null;
  image_url?: string | null;
  content_type?: string | null;
};
type CustomerPayload = {
  app: {
    app_name?: string;
    tagline?: string;
    city?: string;
    maintenance_mode?: boolean;
    maintenance_message?: string | null;
    config?: { markets?: string[]; defaultMarket?: string };
  };
  experience?: {
    controlEnabled?: boolean;
    marketCounts?: Record<string, number>;
    curatedCount?: number;
    featuredCount?: number;
  };
  home: { featured: ContentItem[]; events: EventItem[]; entities: Entity[] };
  partial?: boolean;
  warnings?: string[];
};
type Tab = "home" | "events" | "access" | "brands" | "directory";
type EventFilter = "all" | "tonight" | "free" | "culture" | "nightlife";
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const BRAND_GRAPHICS =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";
const EMBLEM = `${BRAND_GRAPHICS}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
/** Same enterprise film the websites run behind their departments band. */
const HERO_VIDEO = motionLibrary.kollectiveGlobal.src;
const HERO_POSTER = motionLibrary.kollectiveGlobal.poster;
/** The GOOD TIMES cut from the shared library, so the app and the sites move together. */
const GOOD_TIMES_ANIMATION = motionLibrary.goodTimes.src;
const QUICK_CARD_MOTION = {
  tonight: motionLibrary.kollectiveNetwork,
  week: motionLibrary.kollectiveAni,
  brands: motionLibrary.kollectiveAnimation,
} as const;

const OWNED_VENUES: Entity[] = [
  { id: "owned-sea-salt", slug: "sea-salt-atl", name: "Sea Salt ATL", category: "KOLLECTIVE PORTFOLIO", short_description: "Operated independently. Reservations open on OpenTable.", website_url: "https://www.opentable.com/r/sea-salt-atlanta" },
  { id: "owned-tulum", slug: "tulum-atl", name: "Tulum ATL", category: "KOLLECTIVE PORTFOLIO", short_description: "Explore Tulum directly.", website_url: "https://www.tulumatl.com" },
  { id: "owned-hungry-af", slug: "hungry-af", name: "Hungry AF", category: "KOLLECTIVE PORTFOLIO", short_description: "Order and explore directly with Hungry AF.", website_url: "https://thehungryaf.com" },
  { id: "owned-goodfellas", slug: "goodfellas", name: "Goodfellas Pizza & Wings", category: "KOLLECTIVE PORTFOLIO", short_description: "Order directly from Goodfellas.", website_url: "https://www.goodfellaspizzaandwings.com" },
  { id: "owned-opium", slug: "opium-atl", name: "Opium ATL", category: "KOLLECTIVE NIGHTLIFE", short_description: "RSVP and reserve tables directly with the Kollective.", website_url: "/app/nightlife/opium" },
  { id: "owned-revel", slug: "revel", name: "Revel", category: "KOLLECTIVE NIGHTLIFE", short_description: "RSVP and reserve tables directly with the Kollective.", website_url: "/app/nightlife/revel" },
];

const FEATURED_CULTURE_BRANDS: Entity[] = [
  { id: "more-maga", slug: "make-atlanta-great-again", name: "Make Atlanta Great Again", category: "ATLANTA CULTURE", short_description: "Atlanta culture, worn forward.", website_url: "https://thaoldatlanta.com" },
  { id: "more-taste-of-art", slug: "taste-of-art", name: "Taste of Art", category: "CULTURE & EVENTS", short_description: "Fall and winter dates coming soon.", website_url: "/app/taste-of-art" },
];
const MORE_KOLLECTIVE_BRANDS: Entity[] = [
  { id: "more-infinity", slug: "infinity-water", name: "Infinity Water", category: "BEVERAGES", short_description: "Premium hydration and hospitality.", website_url: "https://watertoinfinity.com" },
  { id: "more-pronto", slug: "pronto-energy", name: "Pronto Energy", category: "BEVERAGES", short_description: "Energy for every world.", website_url: "https://prontoenergydrink.com" },
  { id: "more-tribal", slug: "tribal-water", name: "Tribal Water", category: "BEVERAGES", short_description: "Hydration with belonging.", website_url: "https://tribal-water.vercel.app" },
  { id: "more-stush", slug: "stush", name: "STUSH", category: "FASHION", short_description: "Never blend in.", website_url: "https://stushusa.com" },
  { id: "more-bodega", slug: "bodega", name: "Bodega", category: "COMMERCE", short_description: "The pop-up store with city flavor.", website_url: "https://bodegabodegabodega.com" },
  { id: "more-pulse", slug: "pulse", name: "PULSE", category: "LIFESTYLE", short_description: "The energy behind the moment.", website_url: "/forms/inquiry?brand=pulse" },
];

const GUEST_ACTIONS = [
  { label: "RSVP NOW", title: "Get on the list", detail: "Submit your RSVP without leaving the app.", href: "/app/forms/rsvp", icon: TicketCheck },
  { label: "TABLES", title: "Reserve a table", detail: "Choose a venue, package, and secure your booking.", href: "/app/forms/table", icon: UtensilsCrossed },
  { label: "CELEBRATE", title: "Book a birthday", detail: "Tell us the date, group size, Instagram, and celebration details.", href: "/app/forms/birthday", icon: CakeSlice },
  { label: "CONCIERGE", title: "Ask for more info", detail: "Send the team your complete request in app.", href: "/app/forms/inquiry", icon: MessageCircleMore },
] as const;

const tabs: Array<{ key: Tab; label: string; icon: typeof Home }> = [
  { key: "home", label: "Home", icon: Home },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "access", label: "Access", icon: TicketCheck },
  { key: "brands", label: "Brands", icon: Grid3X3 },
  { key: "directory", label: "Directory", icon: Building2 },
];
const filters: Array<{ key: EventFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "tonight", label: "Tonight" },
  { key: "free", label: "Free" },
  { key: "culture", label: "Culture" },
  { key: "nightlife", label: "Nightlife" },
];
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function eventDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}
function isFreeEvent(event: EventItem) {
  if (event.is_free) return true;
  const price = event.ticket_price?.trim() || "";
  if (/^0(?:\.0+)?(?:\s*-|$)/.test(price)) return true;
  return /\bfree\b/i.test(event.event_name);
}
function eventPrice(event: EventItem) {
  if (isFreeEvent(event)) {
    const range = event.ticket_price?.trim().match(/^0(?:\.0+)?\s*-\s*(\d+(?:\.\d+)?)$/);
    if (range) {
      const maximum = Number(range[1]);
      return `FREE–$${maximum.toFixed(maximum % 1 === 0 ? 0 : 2)}`;
    }
    return "FREE";
  }
  const value = event.ticket_price?.trim();
  if (!value) return "RSVP";
  const match = value.match(/^(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?$/);
  if (!match) return value;
  const minimum = Number(match[1]);
  const maximum = match[2] ? Number(match[2]) : null;
  const money = (amount: number) => `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
  if (minimum === 0 && maximum) return `FREE–${money(maximum)}`;
  if (maximum && maximum !== minimum) return `${money(minimum)}–${money(maximum)}`;
  return minimum === 0 ? "FREE" : money(minimum);
}
function destination(entity: Entity) {
  const list = Array.isArray(entity.destinations) ? entity.destinations : [];
  const selected = list.find((item) => item.is_primary) ?? list[0];
  return (
    selected?.universal_link ||
    selected?.web_url ||
    selected?.fallback_url ||
    entity.website_url ||
    `/kollective/${entity.slug}`
  );
}
function imageStyle(url?: string | null) {
  return url
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(8,6,4,.04), rgba(8,6,4,.94)), url("${url}")`,
      }
    : undefined;
}
function isTonight(value: string) {
  const today = new Date();
  const target = new Date(`${value}T12:00:00`);
  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
}
function matchesFilter(event: EventItem, filter: EventFilter) {
  const category = `${event.event_category || ""} ${event.description || ""}`.toLowerCase();
  if (filter === "tonight") return isTonight(event.event_date);
  if (filter === "free") return isFreeEvent(event);
  if (filter === "culture") return /art|culture|museum|community|festival|food/.test(category);
  if (filter === "nightlife") return /nightlife|club|party|lounge|music|dj|bar/.test(category);
  return true;
}

export default function CustomerAppV2() {
  const [payload, setPayload] = useState<CustomerPayload | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [filter, setFilter] = useState<EventFilter>("all");
  const [market, setMarket] = useState("Atlanta");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [installHelp, setInstallHelp] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/customer/home", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("The Kollective feed is unavailable.");
        return response.json();
      })
      .then((data: CustomerPayload) => {
        if (!cancelled) {
          setPayload(data);
          setMarket(data.app.config?.defaultMarket || data.app.city || "Atlanta");
        }
      })
      .catch((cause) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "The app could not load.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    setInstalled(window.matchMedia("(display-mode: standalone)").matches);
    const requestedInstall = new URLSearchParams(window.location.search).get("install") === "1";
    if (requestedInstall && !window.matchMedia("(display-mode: standalone)").matches) setInstallHelp(true);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      if (requestedInstall) setInstallHelp(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => {
      cancelled = true;
      window.removeEventListener("beforeinstallprompt", onPrompt);
    };
  }, []);

  const markets = useMemo(() => {
    const configured = payload?.app.config?.markets ?? [];
    const discovered = Object.keys(payload?.experience?.marketCounts ?? {});
    return Array.from(
      new Set(["All Markets", ...configured.filter((item) => item !== "All Markets"), ...discovered]),
    );
  }, [payload]);
  const marketEvents = useMemo(() => {
    const source = payload?.home.events ?? [];
    return market === "All Markets"
      ? source
      : source.filter((event) => (event.market || event.city) === market);
  }, [payload, market]);
  const events = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return marketEvents
      .filter((event) => matchesFilter(event, filter))
      .filter(
        (event) =>
          !clean ||
          [
            event.event_name,
            event.venue_name,
            event.neighborhood,
            event.event_category,
            event.market,
            event.city,
          ]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(clean)),
      );
  }, [marketEvents, query, filter]);
  const allBrands = useMemo(() => Array.from(new Map([...FEATURED_CULTURE_BRANDS, ...(payload?.home.entities ?? []), ...OWNED_VENUES, ...MORE_KOLLECTIVE_BRANDS].map((entity) => [entity.name.toLowerCase(), entity])).values()), [payload]);

  const hero = payload?.home.featured[0];
  const nextEvent = marketEvents[0] ?? payload?.home.events[0];
  // Never put an event flyer beneath the Kollective film: it flashes through while video loads.
  const heroPoster = HERO_POSTER;
  const heroTitle =
    hero?.title || nextEvent?.event_name || `What is happening in ${market}`;

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearchOpen(false);
    setQuery("");
    if (tab !== "events") setFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const install = async () => {
    if (!installPrompt) {
      setInstallHelp(true);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallHelp(false);
    setInstallPrompt(null);
  };
  const MarketControl = () => (
    <div className={`${styles.filters} ${styles.marketTabs}`} role="group" aria-label="Choose a city">
      {markets.map((item) => (
        <button
          key={item}
          className={market === item ? styles.activeFilter : undefined}
          onClick={() => setMarket(item)}
          aria-pressed={market === item}
        >
          {item === "All Markets" ? "All" : item}
        </button>
      ))}
    </div>
  );

  return (
    <main className={styles.shell}>
      <div className={styles.frame}>
        <header className={styles.header}>
          {activeTab !== "home" ? <button className={styles.appBack} onClick={() => selectTab("home")} aria-label="Back to app home"><ArrowLeft /><span>Back</span></button> : null}
          <button
            className={styles.identity}
            onClick={() => selectTab("home")}
            aria-label="Kollective home"
          >
            <img className={motion.emblem} src={EMBLEM} alt="" />
            <span>
              <strong>KOLLECTIVE</strong>
              <small>
                <MapPin size={11} />
                {market}
              </small>
            </span>
          </button>
          <div className={styles.actions}>
            <button onClick={() => setSearchOpen((open) => !open)} aria-label="Search">
              {searchOpen ? <X /> : <Search />}
            </button>
            {!installed ? (
              <button className={styles.goldButton} onClick={install} aria-label="Install">
                <Download />
              </button>
            ) : null}
          </div>
        </header>

        {searchOpen ? (
          <div className={styles.search}>
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${market}`}
              aria-label={`Search ${market}`}
            />
          </div>
        ) : null}

        {loading ? (
          <section className={styles.state}>
            <span className={styles.loader} />
            <p>Loading the Kollective</p>
          </section>
        ) : error ? (
          <section className={styles.state}>
            <Sparkles />
            <h1>We are reconnecting.</h1>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try again</button>
          </section>
        ) : payload?.app.maintenance_mode ? (
          <section className={styles.state}>
            <Sparkles />
            <h1>We will be right back.</h1>
            <p>{payload.app.maintenance_message || "The Kollective is receiving an upgrade."}</p>
          </section>
        ) : (
          <>
            {activeTab === "home" ? (
              <div className={`${styles.content} ${styles.homeContent}`}>
                <section className={styles.openingStatement}>
                  <Heading eyebrow={`THE KOLLECTIVE · ${market.toUpperCase()}`} title="Live for today. Plan for tomorrow. Party tonight!" />
                  <MarketControl />
                </section>

                <section
                  className={`${styles.hero} ${motion.hero}`}
                  style={imageStyle(heroPoster)}
                >
                  <video
                    className={motion.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={heroPoster}
                    aria-hidden="true"
                  >
                    <source src={HERO_VIDEO} type="video/mp4" />
                  </video>
                  <i className={motion.heroScrim} aria-hidden="true" />
                  <div className={`${styles.heroTop} ${motion.foreground}`}>
                    <span>
                      <Sparkles size={12} />
                      {nextEvent?.is_featured
                        ? "FEATURED BY THE KOLLECTIVE"
                        : "THE KOLLECTIVE NOW"}
                    </span>
                    <small>CURATED FOR {market.toUpperCase()}</small>
                  </div>
                  <div className={`${styles.heroCopy} ${motion.foreground}`}>
                    <p>{hero?.content_type || nextEvent?.event_category || "FEATURED EXPERIENCE"}</p>
                    <h1 title={heroTitle}>{heroTitle}</h1>
                    <span>{hero?.summary || nextEvent?.ai_summary || payload?.app.tagline}</span>
                    <div className={styles.heroActions}>
                      {nextEvent?.ticket_url ? (
                        <a href={nextEvent.ticket_url} target="_blank" rel="noreferrer">
                          GET DETAILS <ArrowUpRight size={16} />
                        </a>
                      ) : null}
                      <button onClick={() => selectTab("brands")}>EXPLORE BRANDS</button>
                    </div>
                  </div>
                </section>

                <section className={styles.accessStage}>
                  <Heading eyebrow="BOOK · RSVP · CONNECT" title="Direct access. Done here." />
                  <div className={styles.guestActionGrid}>
                    {GUEST_ACTIONS.map((action) => {
                      const Icon = action.icon;
                      return (
                        <a key={action.title} href={action.href}>
                          <span className={styles.guestActionIcon}><Icon aria-hidden="true" /></span>
                          <p>{action.label}</p>
                          <h3>{action.title}</h3>
                          <small>{action.detail}</small>
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </section>

                <section className={styles.exploreStage}>
                  <Heading eyebrow="EXPLORE" title="Make your next move" />
                  <div className={styles.quickGrid}>
                    <button
                      className={styles.motionQuickCard}
                      onClick={() => {
                        selectTab("events");
                        setFilter("tonight");
                      }}
                    >
                      <video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.tonight.poster} aria-hidden="true">
                        <source src={QUICK_CARD_MOTION.tonight.src} type="video/mp4" />
                      </video>
                      <i aria-hidden="true" />
                      <CalendarDays />
                      <span>Tonight</span>
                      <small>What is happening now</small>
                    </button>
                    <button className={styles.motionQuickCard} onClick={() => selectTab("events")}>
                      <video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.week.poster} aria-hidden="true">
                        <source src={QUICK_CARD_MOTION.week.src} type="video/mp4" />
                      </video>
                      <i aria-hidden="true" />
                      <Compass />
                      <span>This Week</span>
                      <small>Plan the next move</small>
                    </button>
                    <button className={styles.motionQuickCard} onClick={() => selectTab("brands")}>
                      <video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.brands.poster} aria-hidden="true">
                        <source src={QUICK_CARD_MOTION.brands.src} type="video/mp4" />
                      </video>
                      <i aria-hidden="true" />
                      <Grid3X3 />
                      <span>Brands</span>
                      <small>Explore the enterprise</small>
                    </button>
                    <a
                      className={motion.motionQuick}
                      href="https://thegoodtimesworldwide.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
                        <source src={GOOD_TIMES_ANIMATION} type="video/mp4" />
                      </video>
                      <i aria-hidden="true" />
                      <Sparkles />
                      <span>Concierge</span>
                      <small>Let Good Times handle it</small>
                    </a>
                  </div>
                </section>

                <section>
                  <Heading
                    eyebrow="UPCOMING"
                    title={`Events in ${market}`}
                    action="SEE ALL"
                    onAction={() => selectTab("events")}
                  />
                  <div className={styles.eventRail}>
                    {marketEvents.slice(0, 8).map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>

                <section>
                  <Heading
                    eyebrow="THE KOLLECTIVE"
                    title="Brands in motion"
                    action="SEE ALL"
                    onAction={() => selectTab("brands")}
                  />
                  <div className={styles.brandGrid}>
                    {[...FEATURED_CULTURE_BRANDS, ...(payload?.home.entities ?? []).filter((entity) => !/umbrella|help 911|the tribe|black pages|everyday water/i.test(entity.name))].slice(0, 12).map((entity) => (
                      <BrandCard key={entity.id} entity={entity} />
                    ))}
                  </div>
                </section>

                <section>
                  <Heading eyebrow="THE ORIGINALS" title="OG Venues. Direct Access." />
                  <div className={styles.brandGrid}>
                    {OWNED_VENUES.map((entity) => <BrandCard key={entity.id} entity={entity} />)}
                  </div>
                </section>

                <section>
                  <Heading eyebrow="MORE OF THE KOLLECTIVE" title="Community, service and enterprise." />
                  <div className={styles.brandGrid}>
                    {[...(payload?.home.entities ?? []).filter((entity) => /umbrella|help 911|the tribe|black pages|everyday water/i.test(entity.name)), ...MORE_KOLLECTIVE_BRANDS].map((entity) => <BrandCard key={entity.id} entity={entity} />)}
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === "events" ? (
              <div className={styles.content}>
                <Intro
                  eyebrow="LIVE EXPERIENCE CONTROL"
                  title={`${market} events worth leaving the house for.`}
                  copy="The same curated event state managed by the Kollective operating system."
                />
                <MarketControl />
                <div className={styles.filters} role="group" aria-label="Filter events">
                  {filters.map((item) => (
                    <button
                      key={item.key}
                      className={filter === item.key ? styles.activeFilter : undefined}
                      onClick={() => setFilter(item.key)}
                      aria-pressed={filter === item.key}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <section className={styles.list}>
                  {events.map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))}
                  {!events.length ? (
                    <div className={styles.empty}>
                      <strong>Nothing matches this view yet.</strong>
                      <span>Open every market or reset the filters to keep exploring.</span>
                      <button
                        onClick={() => {
                          setMarket("All Markets");
                          setFilter("all");
                          setQuery("");
                        }}
                      >
                        Explore all markets
                      </button>
                    </div>
                  ) : null}
                </section>
              </div>
            ) : null}

            {activeTab === "access" ? (
              <div className={styles.content}>
                <Intro eyebrow="EVERY ACTION · INSIDE THE APP" title="RSVP. Reserve. Celebrate. Connect." copy="No outside form pages. Choose what you need and send the complete request directly to the Kollective team." />
                <section className={`${styles.accessStage} ${styles.accessPage}`}>
                  <div className={styles.guestActionGrid}>{GUEST_ACTIONS.map((action) => { const Icon=action.icon; return <a key={action.title} href={action.href}><span className={styles.guestActionIcon}><Icon /></span><p>{action.label}</p><h3>{action.title}</h3><small>{action.detail}</small><ArrowUpRight /></a>; })}</div>
                </section>
                <section><Heading eyebrow="NIGHTLIFE" title="Venue access" /><div className={styles.brandGrid}>{OWNED_VENUES.filter((entity)=>/opium|revel/i.test(entity.name)).map((entity)=><BrandCard key={entity.id} entity={entity}/>)}</div></section>
              </div>
            ) : null}

            {activeTab === "brands" ? (
              <div className={styles.content}>
                <Intro
                  eyebrow="ONE ENTERPRISE"
                  title="Every brand. One front door."
                  copy="Discover, book, shop, join, or learn more without digging through the operating website."
                />
                <section className={`${styles.brandGrid} ${styles.brandsDirectory}`}>
                  {allBrands.filter((entity)=>!query || entity.name.toLowerCase().includes(query.toLowerCase())).map((entity) => <BrandCard key={entity.id} entity={entity} />)}
                </section>
              </div>
            ) : null}

            {activeTab === "directory" ? (
              <div className={styles.content}>
                <section className={styles.profile}>
                  <img className={motion.profileEmblem} src={EMBLEM} alt="" />
                  <p>COMPANY DIRECTORY</p>
                  <h1>The people and teams behind the Kollective.</h1>
                  <span>The Kollective Hospitality Group · Atlanta, Georgia · Hospitality, culture, consumer brands, events and enterprise operations.</span>
                </section>
                {!installed ? (
                  <button className={styles.installCard} onClick={install}>
                    <Download />
                    <span>
                      <strong>Install the Kollective app</strong>
                      <small>Add it to your home screen for the full-screen experience.</small>
                    </span>
                    <ArrowUpRight />
                  </button>
                ) : null}
                <section className={styles.directoryGrid}>
                  <DirectoryCard title="Dr. Dorsey" role="Founder & Chairman" detail="Enterprise vision, partnerships and brand leadership." href="/app/forms/inquiry?topic=dr-dorsey" />
                  <DirectoryCard title="Hospitality Team" role="Venue & Guest Experience" detail="RSVP, tables, birthdays and event support." href="/app/forms/inquiry?topic=hospitality" />
                  <DirectoryCard title="Brand Partnerships" role="Growth & Collaborations" detail="Sponsorships, activations, licensing and strategic partnerships." href="/app/forms/inquiry?topic=partnerships" />
                  <DirectoryCard title="Company Operations" role="Enterprise Support" detail="Company information, vendors and operating requests." href="/app/forms/inquiry?topic=operations" />
                </section>
                <ProfileLink
                  href="mailto:thekollectivehospitality@gmail.com"
                  label="Contact the Kollective"
                />
                <ProfileLink
                  href="https://thegoodtimesworldwide.com"
                  label="Open Good Times Concierge"
                />
                <p className={styles.version}>KOLLECTIVE CUSTOMER EXPERIENCE CONTROL · LIVE</p>
              </div>
            ) : null}
          </>
        )}

        <nav className={styles.nav} aria-label="Primary navigation">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={activeTab === key ? styles.navActive : undefined}
              onClick={() => selectTab(key)}
              aria-current={activeTab === key ? "page" : undefined}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        {installHelp ? (
          <div className={styles.installOverlay} role="dialog" aria-modal="true" aria-labelledby="install-title">
            <div className={styles.installSheet}>
              <button className={styles.installClose} onClick={() => setInstallHelp(false)} aria-label="Close install instructions"><X /></button>
              <Download />
              <p>DOWNLOAD THE APP</p>
              <h2 id="install-title">Install Kollective</h2>
              <ol>
                {installPrompt ? <li><strong>Ready now:</strong> tap the gold install button below to download Kollective.</li> : null}
                <li><strong>iPhone or iPad:</strong> tap Share, then “Add to Home Screen.”</li>
                <li><strong>Android:</strong> open the browser menu, then tap “Install app.”</li>
                <li><strong>Desktop:</strong> use the install icon in the address bar.</li>
              </ol>
              <button className={styles.installDone} onClick={installPrompt ? install : () => setInstallHelp(false)}>{installPrompt ? "INSTALL KOLLECTIVE" : "GOT IT"}</button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

function Heading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className={styles.heading}>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {action ? <button onClick={onAction}>{action}</button> : null}
    </div>
  );
}
function Intro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className={styles.intro}>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{copy}</span>
    </section>
  );
}
function EventCard({ event }: { event: EventItem }) {
  const eventMotion = motionFor(`${event.venue_name || ""}`) || motionFor(event.event_name);
  return (
    <a
      className={styles.eventCard}
      href={`/app/forms/rsvp?event=${encodeURIComponent(event.event_name)}&venue=${encodeURIComponent(event.venue_name || "")}`}
    >
      <MotionMedia
        className={styles.eventImage}
        video={eventMotion?.src}
        poster={eventMotion?.poster || brandedEventImage(event)}
        label={event.event_name}
      >
        <span>
          {event.is_featured ? "FEATURED" : eventPrice(event)}
        </span>
      </MotionMedia>
      <div>
        <p>
          {eventDate(event.event_date)} {event.event_time ? `· ${event.event_time}` : ""}
        </p>
        <h3>{event.event_name}</h3>
        <small>
          <MapPin />
          {event.venue_name || event.neighborhood || event.market || event.city}
        </small>
      </div>
    </a>
  );
}
function BrandCard({ entity }: { entity: Entity }) {
  const brandMotion = motionFor(entity.name);
  const href = destination(entity);
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={styles.brandCard} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <MotionMedia
        className={`${styles.brandMedia} ${entity.slug === "rose-on-piedmont" ? styles.roseLogoPosition : ""}`}
        video={brandMotion?.src}
        poster={entity.hero_url || brandMotion?.poster}
        label={entity.name}
      >
        {!brandMotion && entity.logo_url ? <img src={entity.logo_url} alt="" /> : null}
        {!brandMotion && !entity.logo_url ? <span>{entity.name.slice(0, 1)}</span> : null}
        <span className={styles.brandTitlePlate}>
          <small>{entity.category || entity.status_label || "THE KOLLECTIVE"}</small>
          <strong>{entity.name}</strong>
          <em>EXPLORE <ArrowUpRight aria-hidden="true" /></em>
        </span>
      </MotionMedia>
    </a>
  );
}
function EventRow({ event }: { event: EventItem }) {
  const eventMotion = motionFor(`${event.venue_name || ""}`) || motionFor(event.event_name);
  return (
    <a
      href={`/app/forms/rsvp?event=${encodeURIComponent(event.event_name)}&venue=${encodeURIComponent(event.venue_name || "")}`}
      className={styles.row}
    >
      <MotionMedia
        className={styles.rowImage}
        video={eventMotion?.src}
        poster={eventMotion?.poster || brandedEventImage(event)}
        label={event.event_name}
      />
      <div>
        <p>
          {event.is_featured ? "KOLLECTIVE FEATURED · " : ""}
          {eventDate(event.event_date)} {event.event_time ? `· ${event.event_time}` : ""}
        </p>
        <h2>{event.event_name}</h2>
        <span>
          <MapPin />
          {event.venue_name || event.neighborhood || event.market || event.city}
        </span>
        <small>{event.ai_summary || event.description}</small>
      </div>
      <ArrowUpRight />
    </a>
  );
}
function MotionMedia({
  className,
  video,
  poster,
  label,
  children,
}: {
  className: string;
  video?: string;
  poster?: string | null;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`${className} ${styles.media}`} style={imageStyle(poster)}>
      {video ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={poster || undefined} aria-label={`${label} animation`}>
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
      <i aria-hidden="true" />
      {children ? <b className={styles.mediaContent}>{children}</b> : null}
    </div>
  );
}
function ProfileLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={styles.profileLink}>
      {label}
      <ArrowUpRight />
    </a>
  );
}
function brandedEventImage(event: EventItem) {
  const seed = [...event.event_name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return `${BRAND_GRAPHICS}/app/backgrounds/app-background-${String((seed % 11) + 1).padStart(2, "0")}.jpg`;
}
function DirectoryCard({ title, role, detail, href }: { title: string; role: string; detail: string; href: string }) {
  return <a href={href} className={styles.directoryCard}><p>{role}</p><h2>{title}</h2><span>{detail}</span><ArrowUpRight /></a>;
}
