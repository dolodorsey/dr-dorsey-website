"use client";

import {
  ArrowUpRight,
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
  UserRound,
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
type Tab = "home" | "events" | "brands" | "profile";
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
const HERO_POSTER = `${BRAND_GRAPHICS}/dr_dorsey/website/hero-bg.jpg`;
/** The GOOD TIMES cut from the shared library, so the app and the sites move together. */
const GOOD_TIMES_ANIMATION = motionLibrary.goodTimes.src;
const QUICK_CARD_MOTION = {
  tonight: motionLibrary.kollectiveNetwork,
  week: motionLibrary.casperGroup,
  brands: motionLibrary.blackPages,
} as const;

const GUEST_ACTIONS = [
  { label: "RSVP NOW", title: "Get on the list", detail: "Choose complimentary RSVP or paid priority access.", href: "https://111atl.com/event.html?event=grown-ish-rose-on-piedmont", icon: TicketCheck },
  { label: "TABLES", title: "Reserve a table", detail: "Request your table and receive the secure deposit step.", href: "https://111atl.com/forms/table_reservation?source=kollective-app", icon: UtensilsCrossed },
  { label: "CELEBRATE", title: "Book a birthday", detail: "Start a birthday table request with your date and group size.", href: "https://111atl.com/forms/table_reservation?source=kollective-app&occasion=birthday", icon: CakeSlice },
  { label: "CONCIERGE", title: "Ask for more info", detail: "Send the team your question and contact details.", href: "https://111atl.com/forms/inquiry?source=kollective-app", icon: MessageCircleMore },
] as const;

const tabs: Array<{ key: Tab; label: string; icon: typeof Home }> = [
  { key: "home", label: "Home", icon: Home },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "brands", label: "Brands", icon: Grid3X3 },
  { key: "profile", label: "You", icon: UserRound },
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
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
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
  const entities = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return (payload?.home.entities ?? []).filter(
      (entity) =>
        !clean ||
        [entity.name, entity.category, entity.short_description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(clean)),
    );
  }, [payload, query]);

  const hero = payload?.home.featured[0];
  const nextEvent = marketEvents[0] ?? payload?.home.events[0];
  const heroPoster = hero?.image_url || nextEvent?.image_url || HERO_POSTER;
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
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  };
  const MarketControl = () => (
    <div className={styles.filters} role="group" aria-label="Choose a market">
      {markets.map((item) => (
        <button
          key={item}
          className={market === item ? styles.activeFilter : undefined}
          onClick={() => setMarket(item)}
          aria-pressed={market === item}
        >
          {item}
          {payload?.experience?.marketCounts?.[item]
            ? ` · ${payload.experience.marketCounts[item]}`
            : ""}
        </button>
      ))}
    </div>
  );

  return (
    <main className={styles.shell}>
      <div className={styles.frame}>
        <header className={styles.header}>
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
            {!installed && installPrompt ? (
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
              <div className={styles.content}>
                <section>
                  <Heading eyebrow="YOUR CITY" title={`What is happening in ${market}`} />
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

                <section>
                  <Heading eyebrow="DIRECT ACCESS" title="Book it. Don’t just browse." />
                  <div className={styles.guestActionGrid}>
                    {GUEST_ACTIONS.map((action) => {
                      const Icon = action.icon;
                      return (
                        <a key={action.title} href={action.href} target="_blank" rel="noreferrer">
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

                <section>
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
                    {(payload?.home.entities ?? []).slice(0, 10).map((entity) => (
                      <BrandCard key={entity.id} entity={entity} />
                    ))}
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

            {activeTab === "brands" ? (
              <div className={styles.content}>
                <Intro
                  eyebrow="ONE ENTERPRISE"
                  title="Every brand. One front door."
                  copy="Discover, book, shop, join, or learn more without digging through the operating website."
                />
                <section className={styles.list}>
                  {entities.map((entity) => (
                    <EntityRow key={entity.id} entity={entity} />
                  ))}
                  {!entities.length ? <div className={styles.empty}>No brands match that search.</div> : null}
                </section>
              </div>
            ) : null}

            {activeTab === "profile" ? (
              <div className={styles.content}>
                <section className={styles.profile}>
                  <img className={motion.profileEmblem} src={EMBLEM} alt="" />
                  <p>YOUR KOLLECTIVE</p>
                  <h1>Your market. Your access. Your next move.</h1>
                  <span>
                    Current market: {market}. Controlled experiences:{" "}
                    {payload?.experience?.curatedCount ?? 0}. Featured now:{" "}
                    {payload?.experience?.featuredCount ?? 0}.
                  </span>
                </section>
                {!installed && installPrompt ? (
                  <button className={styles.installCard} onClick={install}>
                    <Download />
                    <span>
                      <strong>Install the Kollective app</strong>
                      <small>Add it to your home screen for the full-screen experience.</small>
                    </span>
                    <ArrowUpRight />
                  </button>
                ) : null}
                <ProfileLink
                  href="https://thekollectivehospitality.com"
                  label="Explore the full Kollective website"
                />
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
      href={event.ticket_url || undefined}
      target={event.ticket_url ? "_blank" : undefined}
      rel="noreferrer"
    >
      <MotionMedia
        className={styles.eventImage}
        video={eventMotion?.src}
        poster={event.image_url || eventMotion?.poster}
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
  return (
    <a href={destination(entity)} className={styles.brandCard} target="_blank" rel="noreferrer">
      <MotionMedia
        className={styles.brandMedia}
        video={brandMotion?.src}
        poster={entity.hero_url || brandMotion?.poster}
        label={entity.name}
      >
        {!brandMotion && entity.logo_url ? <img src={entity.logo_url} alt="" /> : null}
        {!brandMotion && !entity.logo_url ? <span>{entity.name.slice(0, 1)}</span> : null}
      </MotionMedia>
      <p>{entity.category || entity.status_label || "KOLLECTIVE"}</p>
      <h3>{entity.name}</h3>
    </a>
  );
}
function EventRow({ event }: { event: EventItem }) {
  const eventMotion = motionFor(`${event.venue_name || ""}`) || motionFor(event.event_name);
  return (
    <a
      href={event.ticket_url || undefined}
      className={styles.row}
      target={event.ticket_url ? "_blank" : undefined}
      rel="noreferrer"
    >
      <MotionMedia
        className={styles.rowImage}
        video={eventMotion?.src}
        poster={event.image_url || eventMotion?.poster}
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
function EntityRow({ entity }: { entity: Entity }) {
  const brandMotion = motionFor(entity.name);
  return (
    <a href={destination(entity)} className={styles.row} target="_blank" rel="noreferrer">
      <MotionMedia
        className={styles.entityImage}
        video={brandMotion?.src}
        poster={entity.hero_url || brandMotion?.poster}
        label={entity.name}
      >
        {!brandMotion && entity.logo_url ? <img src={entity.logo_url} alt="" /> : null}
        {!brandMotion && !entity.logo_url ? <span>{entity.name.slice(0, 1)}</span> : null}
      </MotionMedia>
      <div>
        <p>{entity.category || entity.status_label || "KOLLECTIVE"}</p>
        <h2>{entity.name}</h2>
        <small>{entity.short_description || "Explore this Kollective company."}</small>
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
