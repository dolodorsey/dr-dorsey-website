"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  Download,
  Grid3X3,
  Home,
  MapPin,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./customer-app.module.css";

type Destination = {
  action_key?: string;
  action_label?: string;
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
};

type ContentItem = {
  id: string;
  title: string;
  summary?: string | null;
  body?: string | null;
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
  };
  home: {
    featured: ContentItem[];
    events: EventItem[];
    entities: Entity[];
  };
  generatedAt: string;
  partial?: boolean;
  warnings?: string[];
};

type Tab = "home" | "events" | "brands" | "profile";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const tabs: Array<{ key: Tab; label: string; icon: typeof Home }> = [
  { key: "home", label: "Home", icon: Home },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "brands", label: "Brands", icon: Grid3X3 },
  { key: "profile", label: "You", icon: UserRound },
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

function primaryDestination(entity: Entity) {
  const destinations = Array.isArray(entity.destinations) ? entity.destinations : [];
  const selected = destinations.find((destination) => destination.is_primary) ?? destinations[0];
  return selected?.universal_link || selected?.web_url || selected?.fallback_url || entity.website_url || `/kollective/${entity.slug}`;
}

function imageStyle(url?: string | null) {
  return url
    ? { backgroundImage: `linear-gradient(180deg, rgba(3,3,3,.05), rgba(3,3,3,.9)), url("${url}")` }
    : undefined;
}

export default function CustomerApp() {
  const [payload, setPayload] = useState<CustomerPayload | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/customer/home", { cache: "no-store" });
        if (!response.ok) throw new Error("The Kollective feed is unavailable.");
        const nextPayload = (await response.json()) as CustomerPayload;
        if (!cancelled) setPayload(nextPayload);
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "The app could not load.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    setInstalled(window.matchMedia("(display-mode: standalone)").matches);

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onInstallPrompt);

    return () => {
      cancelled = true;
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const events = payload?.home.events ?? [];
    const clean = query.trim().toLowerCase();
    if (!clean) return events;
    return events.filter((event) =>
      [event.event_name, event.venue_name, event.neighborhood, event.event_category, event.city]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(clean)),
    );
  }, [payload, query]);

  const filteredEntities = useMemo(() => {
    const entities = payload?.home.entities ?? [];
    const clean = query.trim().toLowerCase();
    if (!clean) return entities;
    return entities.filter((entity) =>
      [entity.name, entity.category, entity.short_description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(clean)),
    );
  }, [payload, query]);

  const hero = payload?.home.featured[0];
  const nextEvent = payload?.home.events[0];

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  };

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearchOpen(false);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.shell}>
      <div className={styles.appFrame}>
        <header className={styles.header}>
          <div>
            <div className={styles.brandLine}>
              <span className={styles.emblem}>K</span>
              <span className={styles.brandName}>KOLLECTIVE</span>
            </div>
            <p className={styles.location}><MapPin size={12} /> {payload?.app.city || "Atlanta"}</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconButton} onClick={() => setSearchOpen((value) => !value)} aria-label="Search">
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            {!installed && installPrompt ? (
              <button className={styles.installMini} onClick={install} aria-label="Install app">
                <Download size={17} />
              </button>
            ) : null}
          </div>
        </header>

        {searchOpen ? (
          <div className={styles.searchBar}>
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events, places, and brands"
            />
          </div>
        ) : null}

        {loading ? (
          <section className={styles.loadingState}>
            <span className={styles.loader} />
            <p>Loading the Kollective…</p>
          </section>
        ) : error ? (
          <section className={styles.errorState}>
            <Sparkles size={28} />
            <h1>We are reconnecting.</h1>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try again</button>
          </section>
        ) : payload?.app.maintenance_mode ? (
          <section className={styles.errorState}>
            <Sparkles size={28} />
            <h1>We will be right back.</h1>
            <p>{payload.app.maintenance_message || "The Kollective app is receiving an upgrade."}</p>
          </section>
        ) : (
          <>
            {activeTab === "home" ? (
              <div className={styles.content}>
                <section className={styles.hero} style={imageStyle(hero?.image_url || nextEvent?.image_url)}>
                  <div className={styles.heroBadge}><Sparkles size={13} /> RIGHT NOW</div>
                  <div className={styles.heroCopy}>
                    <p>{hero?.content_type || nextEvent?.event_category || "THE KOLLECTIVE"}</p>
                    <h1>{hero?.title || nextEvent?.event_name || "Your city. Your people. Your next move."}</h1>
                    <span>{hero?.summary || nextEvent?.ai_summary || payload?.app.tagline}</span>
                    {nextEvent?.ticket_url ? (
                      <a href={nextEvent.ticket_url} target="_blank" rel="noreferrer" className={styles.heroAction}>
                        VIEW EVENT <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <button className={styles.heroAction} onClick={() => selectTab("brands")}>
                        EXPLORE <ArrowUpRight size={16} />
                      </button>
                    )}
                  </div>
                </section>

                <section>
                  <div className={styles.sectionHeading}>
                    <div><p>DISCOVER</p><h2>What are you looking for?</h2></div>
                  </div>
                  <div className={styles.quickGrid}>
                    <button onClick={() => selectTab("events")}><CalendarDays /><span>Tonight</span></button>
                    <button onClick={() => selectTab("events")}><Compass /><span>This Week</span></button>
                    <button onClick={() => selectTab("brands")}><Grid3X3 /><span>Brands</span></button>
                    <a href="https://thegoodtimesworldwide.com" target="_blank" rel="noreferrer"><Sparkles /><span>Concierge</span></a>
                  </div>
                </section>

                <section>
                  <div className={styles.sectionHeading}>
                    <div><p>GOOD TIMES ENERGY</p><h2>Upcoming</h2></div>
                    <button onClick={() => selectTab("events")}>SEE ALL</button>
                  </div>
                  <div className={styles.horizontalRail}>
                    {(payload?.home.events ?? []).slice(0, 8).map((event) => (
                      <a key={event.id} className={styles.eventCard} href={event.ticket_url || "#"} target={event.ticket_url ? "_blank" : undefined} rel="noreferrer">
                        <div className={styles.eventImage} style={imageStyle(event.image_url)}>
                          <span>{event.is_free ? "FREE" : event.ticket_price || "RSVP"}</span>
                        </div>
                        <div className={styles.eventBody}>
                          <p>{eventDate(event.event_date)} {event.event_time ? `· ${event.event_time}` : ""}</p>
                          <h3>{event.event_name}</h3>
                          <span><MapPin size={12} /> {event.venue_name || event.neighborhood || event.city}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>

                <section>
                  <div className={styles.sectionHeading}>
                    <div><p>THE UNIVERSE</p><h2>Inside the Kollective</h2></div>
                    <button onClick={() => selectTab("brands")}>SEE ALL</button>
                  </div>
                  <div className={styles.brandGrid}>
                    {(payload?.home.entities ?? []).slice(0, 6).map((entity) => (
                      <a key={entity.id} href={primaryDestination(entity)} className={styles.brandCard} target="_blank" rel="noreferrer">
                        <div className={styles.brandVisual} style={imageStyle(entity.hero_url)}>
                          {entity.logo_url ? <img src={entity.logo_url} alt="" /> : <span>{entity.name.slice(0, 1)}</span>}
                        </div>
                        <p>{entity.category || entity.status_label || "KOLLECTIVE"}</p>
                        <h3>{entity.name}</h3>
                      </a>
                    ))}
                  </div>
                </section>

                {payload?.partial && payload.warnings?.length ? (
                  <p className={styles.dataNotice}>Some live sections are reconnecting. Available information is still shown.</p>
                ) : null}
              </div>
            ) : null}

            {activeTab === "events" ? (
              <div className={styles.content}>
                <section className={styles.pageIntro}>
                  <p>GO SOMEWHERE</p>
                  <h1>Events worth leaving the house for.</h1>
                  <span>Curated with the same discovery energy as Good Times, connected to the full Kollective universe.</span>
                </section>
                <div className={styles.filterRow}>
                  <button className={styles.filterActive}>All</button><button>Tonight</button><button>Free</button><button>Culture</button><button>Nightlife</button>
                </div>
                <section className={styles.eventList}>
                  {filteredEvents.map((event) => (
                    <a key={event.id} href={event.ticket_url || "#"} className={styles.eventListCard} target={event.ticket_url ? "_blank" : undefined} rel="noreferrer">
                      <div className={styles.eventListImage} style={imageStyle(event.image_url)} />
                      <div>
                        <p>{eventDate(event.event_date)} {event.event_time ? `· ${event.event_time}` : ""}</p>
                        <h2>{event.event_name}</h2>
                        <span><MapPin size={13} /> {event.venue_name || event.neighborhood || event.city}</span>
                        <small>{event.ai_summary || event.description}</small>
                      </div>
                      <ArrowUpRight size={18} />
                    </a>
                  ))}
                  {!filteredEvents.length ? <div className={styles.emptyState}>No events match that search yet.</div> : null}
                </section>
              </div>
            ) : null}

            {activeTab === "brands" ? (
              <div className={styles.content}>
                <section className={styles.pageIntro}>
                  <p>ONE ENTERPRISE</p>
                  <h1>A simpler front door to every Kollective brand.</h1>
                  <span>Discover, book, shop, join, or learn more without navigating the full operating website.</span>
                </section>
                <section className={styles.entityList}>
                  {filteredEntities.map((entity) => (
                    <a key={entity.id} href={primaryDestination(entity)} className={styles.entityCard} target="_blank" rel="noreferrer">
                      <div className={styles.entityLogo} style={imageStyle(entity.hero_url)}>
                        {entity.logo_url ? <img src={entity.logo_url} alt="" /> : <span>{entity.name.slice(0, 1)}</span>}
                      </div>
                      <div>
                        <p>{entity.category || entity.status_label || "KOLLECTIVE"}</p>
                        <h2>{entity.name}</h2>
                        <span>{entity.short_description || "Explore this Kollective company."}</span>
                      </div>
                      <ArrowUpRight size={19} />
                    </a>
                  ))}
                  {!filteredEntities.length ? <div className={styles.emptyState}>No brands match that search.</div> : null}
                </section>
              </div>
            ) : null}

            {activeTab === "profile" ? (
              <div className={styles.content}>
                <section className={styles.profileHero}>
                  <span className={styles.profileMark}>K</span>
                  <p>YOUR KOLLECTIVE</p>
                  <h1>Save your favorites. Get invited. Move first.</h1>
                  <span>Customer accounts, personalized interests, tickets, memberships, and concierge requests are the next layer of this experience.</span>
                </section>
                {!installed && installPrompt ? (
                  <button className={styles.installCard} onClick={install}>
                    <Download size={24} />
                    <span><strong>Install the Kollective app</strong><small>Add it to your home screen for a full-screen app experience.</small></span>
                    <ArrowUpRight size={18} />
                  </button>
                ) : null}
                <a href="https://doctordorsey.com/kollective" className={styles.profileLink}>Explore the full Kollective website <ArrowUpRight size={18} /></a>
                <a href="https://doctordorsey.com/contact" className={styles.profileLink}>Contact the Kollective <ArrowUpRight size={18} /></a>
                <a href="https://thegoodtimesworldwide.com" className={styles.profileLink}>Open Good Times Concierge <ArrowUpRight size={18} /></a>
                <p className={styles.version}>KOLLECTIVE CUSTOMER APP · LIVE DATA</p>
              </div>
            ) : null}
          </>
        )}

        <nav className={styles.bottomNav} aria-label="App navigation">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} className={activeTab === key ? styles.navActive : undefined} onClick={() => selectTab(key)}>
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
