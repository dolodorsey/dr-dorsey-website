"use client";

import {
  ArrowUpRight,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Compass,
  Download,
  Grid3X3,
  Globe2,
  Gift,
  HandHeart,
  Handshake,
  Home,
  Instagram,
  Mail,
  MapPin,
  Megaphone,
  MessageCircleMore,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  TicketCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./customer-app-v2.module.css";
import motion from "./customer-app-v2-motion.module.css";
import { motion as motionLibrary, motionFor } from "@/lib/motion";
import { placeRelatedTogether } from "@/lib/roster";

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
type DirectoryContact = {
  name: string;
  category?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
};
type TeamContact = DirectoryContact & {
  id: string;
  full_name?: string | null;
  role?: string | null;
  brand?: string | null;
  detail?: string | null;
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
  directory?: { entities: DirectoryContact[]; team: TeamContact[] };
  partial?: boolean;
  warnings?: string[];
};
type Tab = "home" | "events" | "access" | "brands" | "directory";
type EventFilter = "all" | "tonight" | "free" | "culture" | "nightlife";
type PlanAction = "rsvp" | "vip-section";
type PlanPreset = {
  key: string;
  label: string;
  meta: string;
  event: string;
  venue: string;
  date: string;
};
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const BRAND_GRAPHICS =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";
const EMBLEM = `${BRAND_GRAPHICS}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const COMPANY_GRAPHIC_FALLBACK = `${BRAND_GRAPHICS}/app/backgrounds/app-background-11.jpg`;
const WEBSITE_GRAPHICS = `${BRAND_GRAPHICS}/good-times-app`;
/** Same enterprise film the websites run behind their departments band. */
const HERO_VIDEO = motionLibrary.kollectiveGlobal.src;
const HERO_POSTER = motionLibrary.kollectiveGlobal.poster;
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
  { id: "more-freedom-fest", slug: "freedom-fest", name: "Freedom Fest", category: "CULTURE & EVENTS", short_description: "Culture, community and celebration in Atlanta.", website_url: "https://freedom-fest-store.vercel.app" },
];

const CUSTOMER_FOCUS: Array<{
  label: string;
  detail: string;
  icon: typeof Home;
  href?: string;
  tab?: Tab;
  filter?: EventFilter;
  query?: string;
}> = [
  { label: "Nightlife / Events / Activations", detail: "Tonight, signature events, guest lists, tables and cultural activations.", tab: "events", filter: "nightlife", icon: TicketCheck },
  { label: "Clothes", detail: "Shop current fashion, merchandise and Kollective drops.", href: "/store", icon: ShoppingBag },
  { label: "Hakuna Matata", detail: "Buy Dr. Dorsey’s founder field manual directly.", href: "https://bodgeaworldwide.myshopify.com/products/hakuna-matata-by-dr-dorsey", icon: BookOpen },
  { label: "Apps", detail: "Explore customer platforms, service apps and intelligence products.", tab: "brands", query: "App", icon: Grid3X3 },
  { label: "Sole Exchange", detail: "Enter the sneaker recovery and community impact platform.", href: "https://soleexchangeworldwide.com", icon: HandHeart },
  { label: "Services", detail: "Find hospitality, production, mobility, property and business services.", tab: "brands", query: "Service", icon: BriefcaseBusiness },
  { label: "Groups", detail: "Discover membership, leadership, youth and community groups.", href: "/companies#the-inner-circle", icon: Building2 },
  { label: "Calendar", detail: "See what is happening across every active market.", tab: "events", filter: "all", icon: CalendarDays },
  { label: "Discounts", detail: "Join for coupons, member perks and monthly offers.", href: "/app/forms/member-offers", icon: Gift },
  { label: "Join", detail: "Apply for roles, internships and opportunities across the enterprise.", href: "/app/forms/hiring", icon: Handshake },
  { label: "+ Ambassador", detail: "Represent Kollective companies, products, events and experiences.", href: "/app/forms/ambassador", icon: Megaphone },
  { label: "+ Volunteer", detail: "Support events, community work and special projects.", href: "/app/forms/volunteer", icon: HandHeart },
  { label: "Forms", detail: "Open every RSVP, booking, application and inquiry form.", tab: "access", icon: ClipboardList },
  { label: "Other Entities", detail: "Explore the rest of the Kollective enterprise portfolio.", tab: "brands", icon: Compass },
  { label: "Directory", detail: "Find companies, teams and official contact paths.", tab: "directory", icon: Building2 },
];

function isFreedomFestEntity(entity: Entity) {
  return /freedom fest|juneteent|juneteenth/i.test(entity.name);
}

const PLAN_ACTIONS: Array<{ type: PlanAction; label: string; detail: string; icon: typeof Home }> = [
  { type: "rsvp", label: "MAKE A RESERVATION", detail: "Guest list or event reservation", icon: TicketCheck },
  { type: "vip-section", label: "BUY A TABLE / VIP", detail: "Continue to secure payment", icon: Sparkles },
];

const ACCESS_FORM_LINKS = [
  { label: "MEMBER PERKS", title: "Discounts + monthly free member item", detail: "Join for Kollective discounts, coupons, announcements, and the monthly free member item.", href: "/app/forms/member-offers", icon: Gift, cover: "app-background-01.jpg" },
  { label: "AMBASSADOR", title: "Ambassador signup", detail: "Represent Kollective companies, products, events, and community experiences.", href: "/app/forms/ambassador", icon: Megaphone, cover: "app-background-02.jpg" },
  { label: "APPLY", title: "Hiring", detail: "Roles, talent, internships, and opportunities across the Kollective.", href: "/app/forms/hiring", icon: ClipboardList, cover: "app-background-03.jpg" },
  { label: "COMMUNITY", title: "Volunteer", detail: "Support events, community work, guest experience, and special projects.", href: "/app/forms/volunteer", icon: HandHeart, cover: "app-background-04.jpg" },
  { label: "PARTNER", title: "Partnerships", detail: "Sponsorships, collaborations, brand activations, and strategic partnerships.", href: "/app/forms/partnership", icon: Handshake, cover: "app-background-05.jpg" },
  { label: "VENDOR", title: "Vendor application", detail: "Food, retail, services, production, and event vendor opportunities.", href: "/app/forms/vendor", icon: BriefcaseBusiness, cover: "app-background-06.jpg" },
  { label: "SHOP", title: "Shop", detail: "Products, fashion, books, and current Kollective drops.", href: "/shop", icon: ShoppingBag, cover: "app-background-07.jpg" },
  { label: "SECURE ACCESS", title: "Enterprise access", detail: "Review private access, agreements, and enterprise entry points.", href: "/access", icon: BadgeCheck, cover: "app-background-08.jpg" },
  { label: "OTHER", title: "General request", detail: "Tell the team what you need when it does not fit another form.", href: "/app/forms/inquiry", icon: MessageCircleMore, cover: "app-background-10.jpg" },
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
  const href = (
    selected?.universal_link ||
    selected?.web_url ||
    selected?.fallback_url ||
    entity.website_url ||
    `/kollective/${entity.slug}`
  );
  if (/111atl\.com\/forms\//i.test(href) || (/project x/i.test(entity.name) && /111atl\.com/i.test(href))) {
    return companyFormHref(entity);
  }
  return href;
}
function companyFormHref(entity: Entity) {
  const company = encodeURIComponent(entity.name);
  const companySlug = encodeURIComponent(entity.slug);
  return `/app/forms/inquiry?company=${company}&brand=${companySlug}`;
}
function safeCompanyWebsite(entity: Entity, contact?: DirectoryContact) {
  const candidates = [contact?.website, entity.website_url, ...(entity.destinations || []).flatMap((item) => [item.web_url, item.universal_link, item.fallback_url])];
  return candidates.find((href): href is string => Boolean(href && (/^https?:\/\//i.test(href) || href.startsWith("/")) && !/\/forms\//i.test(href) && !(/project x/i.test(entity.name) && /111atl\.com/i.test(href)))) || null;
}
function companyPopupStill(entity: Entity, fallback?: string) {
  const name = entity.name.toLowerCase();
  const stills: Array<[RegExp, string]> = [
    [/project x/, `${BRAND_GRAPHICS}/motion/project-x.jpg`],
    [/goodfellas/, `${WEBSITE_GRAPHICS}/goodfellas/goodfellas_atlanta_landscape.png`],
    [/revel/, `${WEBSITE_GRAPHICS}/revel/revel-party-1.webp`],
    [/tulum/, `${WEBSITE_GRAPHICS}/tulum_party/tulum_party_landscape.png`],
    [/infinity water/, `${WEBSITE_GRAPHICS}/infinity_water/infinity_water_landscape.png`],
    [/pronto/, `${WEBSITE_GRAPHICS}/pronto_energy/pronto_energy_landscape.png`],
    [/taste of art/, `${WEBSITE_GRAPHICS}/taste_of_art/taste_of_art_landscape.png`],
    [/umbrella/, `${WEBSITE_GRAPHICS}/umbrella_group/umbrella_group_landscape.png`],
    [/make atlanta great again/, `${BRAND_GRAPHICS}/maga/generated/maga_hero.png`],
    [/hakuna matata/, `${BRAND_GRAPHICS}/bodega/hakuna-matata/cover-hero.png`],
  ];
  return entity.hero_url || stills.find(([pattern]) => pattern.test(name))?.[1] || fallback || COMPANY_GRAPHIC_FALLBACK;
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
function isKollectiveBookableEvent(event: EventItem) {
  return /rose on piedmont|opium(?: atl)?|revel(?: atl)?/i.test(event.venue_name || "");
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
  const [selectedCompany, setSelectedCompany] = useState<Entity | null>(null);
  const [planSelection, setPlanSelection] = useState("");
  const [planAction, setPlanAction] = useState<PlanAction>("rsvp");
  const [planGuests, setPlanGuests] = useState("2");

  useEffect(() => {
    let cancelled = false;
    let refreshing = false;
    const onControllerChange = () => {
      if (refreshing || !navigator.serviceWorker.controller) return;
      refreshing = true;
      window.location.reload();
    };
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
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
      navigator.serviceWorker.register("/sw.js?v=4", { updateViaCache: "none" }).then((registration) => registration.update()).catch(() => undefined);
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
      navigator.serviceWorker?.removeEventListener("controllerchange", onControllerChange);
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
  const allBrands = useMemo(() => placeRelatedTogether(Array.from(new Map([...FEATURED_CULTURE_BRANDS, ...(payload?.home.entities ?? []).filter((entity) => !isFreedomFestEntity(entity)), ...OWNED_VENUES, ...MORE_KOLLECTIVE_BRANDS].map((entity) => [entity.name.toLowerCase(), entity])).values()), (entity) => entity.name), [payload]);
  const planPresets = useMemo<PlanPreset[]>(() => {
    return marketEvents.filter(isKollectiveBookableEvent).slice(0, 12).map((event) => ({
      key: `event:${event.id}`,
      label: event.event_name,
      meta: `${eventDate(event.event_date)}${event.venue_name ? ` · ${event.venue_name}` : ""}`,
      event: event.event_name,
      venue: event.venue_name || "",
      date: event.event_date,
    }));
  }, [marketEvents]);
  const selectedPlan = planPresets.find((preset) => preset.key === planSelection) || planPresets[0];
  const directoryEntities = useMemo(() => {
    const contacts = new Map((payload?.directory?.entities ?? []).map((contact) => [contact.name.toLowerCase(), contact]));
    const entries = new Map<string, DirectoryContact>();
    for (const entity of allBrands) {
      const contact = contacts.get(entity.name.toLowerCase());
      entries.set(entity.name.toLowerCase(), {
        name: entity.name,
        category: contact?.category || entity.category,
        website: contact?.website || entity.website_url,
        email: contact?.email,
        phone: contact?.phone,
        instagram: contact?.instagram,
      });
    }
    for (const contact of payload?.directory?.entities ?? []) {
      const key = contact.name.toLowerCase();
      if (!entries.has(key)) entries.set(key, contact);
    }
    return Array.from(entries.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allBrands, payload]);
  const directoryQuery = query.trim().toLowerCase();
  const visibleDirectoryEntities = directoryEntities.filter((entry) => !directoryQuery || `${entry.name} ${entry.category || ""}`.toLowerCase().includes(directoryQuery));
  const visibleTeamContacts = (payload?.directory?.team ?? []).filter((entry) => !directoryQuery || `${entry.name} ${entry.role || ""} ${entry.brand || ""}`.toLowerCase().includes(directoryQuery));
  const companyContacts = useMemo(() => new Map((payload?.directory?.entities ?? []).map((entry) => [entry.name.toLowerCase(), entry])), [payload]);

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
  const openFocusDestination = (destination: (typeof CUSTOMER_FOCUS)[number]) => {
    if (!destination.tab) return;
    selectTab(destination.tab);
    if (destination.filter) setFilter(destination.filter);
    if (destination.query) {
      setQuery(destination.query);
      setSearchOpen(true);
    }
  };
  const continuePlan = () => {
    if (!selectedPlan) return;
    const search = new URLSearchParams({
      event: selectedPlan.event,
      venue: selectedPlan.venue,
      guest_count: planGuests,
    });
    if (selectedPlan.date) search.set("date", selectedPlan.date);
    window.location.assign(`/app/forms/${planAction}?${search.toString()}`);
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
                <section className={`${styles.hero} ${styles.kollectiveLead}`} aria-label="The Kollective in motion">
                  <div className={styles.heroMedia} style={imageStyle(heroPoster)} aria-hidden="true">
                    <video autoPlay muted loop playsInline preload="metadata" poster={heroPoster}>
                      <source src={HERO_VIDEO} type="video/mp4" />
                    </video>
                  </div>
                  <div className={styles.heroBody}>
                    <div className={styles.heroTop}>
                      <span><Sparkles size={12} />THE KOLLECTIVE</span>
                      <small>{market.toUpperCase()} · EVENTS · HOSPITALITY · CULTURE</small>
                    </div>
                    <div className={styles.heroCopy}>
                      <p>{hero?.content_type || nextEvent?.event_category || "THE KOLLECTIVE NOW"}</p>
                      <h1 title={heroTitle}>{heroTitle}</h1>
                      <span>{hero?.summary || nextEvent?.ai_summary || payload?.app.tagline}</span>
                      <div className={styles.heroActions}>
                        <button onClick={() => selectTab("events")}>EXPLORE EVENTS</button>
                        <button onClick={() => selectTab("brands")}>EXPLORE ENTITIES</button>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={styles.openingStatement}>
                  <Heading eyebrow={`THE KOLLECTIVE · ${market.toUpperCase()}`} title="Live for today. Plan for tomorrow. Party tonight!" />
                  <MarketControl />
                </section>

                <section className={styles.planStage} aria-labelledby="plan-title">
                  <div className={styles.planIntro}>
                    <p>KOLLECTIVE EVENTS ONLY</p>
                    <h2 id="plan-title">Reserve or buy a table.</h2>
                    <span>Choose one of our live events, then make a reservation or secure a paid table.</span>
                  </div>
                  <div className={styles.planSteps}>
                    <label className={styles.planField}>
                      <span><b>01</b> OUR EVENT</span>
                      <select value={selectedPlan?.key || ""} onChange={(event) => setPlanSelection(event.target.value)}>
                        {!planPresets.length ? <option value="">No bookable Kollective events in this market</option> : null}
                        {planPresets.map((preset) => <option key={preset.key} value={preset.key}>{preset.label} — {preset.meta}</option>)}
                      </select>
                    </label>
                    <fieldset className={styles.planActions}>
                      <legend><b>02</b> WHAT DO YOU WANT?</legend>
                      {PLAN_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        const selected = planAction === action.type;
                        return (
                          <button key={action.type} type="button" className={selected ? styles.selectedPlanAction : undefined} onClick={() => setPlanAction(action.type)} aria-pressed={selected}>
                            <Icon aria-hidden="true" />
                            <span><strong>{action.label}</strong><small>{action.detail}</small></span>
                          </button>
                        );
                      })}
                    </fieldset>
                    <div className={styles.planFinish}>
                      <label><span><b>03</b> PARTY SIZE</span><input type="number" min="1" max="1000" value={planGuests} onChange={(event) => setPlanGuests(event.target.value)} /></label>
                      <button type="button" onClick={continuePlan} disabled={!selectedPlan || !planGuests}>CONTINUE <ArrowUpRight aria-hidden="true" /></button>
                    </div>
                  </div>
                  <p className={styles.planNote}>{planAction === "vip-section" ? "Next: choose a section package, then continue to secure Stripe checkout." : "Next: complete the pre-filled request and receive confirmation."}</p>
                </section>

                <section className={styles.focusStage}>
                  <Heading eyebrow="YOUR KOLLECTIVE" title="Choose where you want to go." />
                  <p className={styles.focusIntro}>Events, products, apps, services, opportunities and the full network—organized around what customers need most.</p>
                  <div className={styles.focusGrid}>
                    {CUSTOMER_FOCUS.map((destination, index) => {
                      const Icon = destination.icon;
                      const content = (
                        <>
                          <span className={styles.focusMedia}><span className={styles.focusNumber}>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></span>
                          <span className={styles.focusBody}><strong>{destination.label}</strong><small>{destination.detail}</small><ArrowUpRight aria-hidden="true" /></span>
                        </>
                      );
                      return destination.href ? (
                        <a
                          key={destination.label}
                          href={destination.href}
                          target={destination.href.startsWith("http") ? "_blank" : undefined}
                          rel={destination.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        <button key={destination.label} type="button" onClick={() => openFocusDestination(destination)}>
                          {content}
                        </button>
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
                      <span className={styles.quickMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.tonight.poster}><source src={QUICK_CARD_MOTION.tonight.src} type="video/mp4" /></video></span>
                      <span className={styles.quickBody}><CalendarDays /><span>Tonight</span><small>What is happening now</small></span>
                    </button>
                    <button className={styles.motionQuickCard} onClick={() => selectTab("events")}>
                      <span className={styles.quickMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.week.poster}><source src={QUICK_CARD_MOTION.week.src} type="video/mp4" /></video></span>
                      <span className={styles.quickBody}><Compass /><span>This Week</span><small>Plan the next move</small></span>
                    </button>
                    <button className={styles.motionQuickCard} onClick={() => selectTab("brands")}>
                      <span className={styles.quickMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster={QUICK_CARD_MOTION.brands.poster}><source src={QUICK_CARD_MOTION.brands.src} type="video/mp4" /></video></span>
                      <span className={styles.quickBody}><Grid3X3 /><span>Brands</span><small>Explore the enterprise</small></span>
                    </button>
                    <button
                      className={styles.motionQuickCard}
                      onClick={() => selectTab("directory")}
                    >
                      <span className={styles.quickMedia} aria-hidden="true"><video autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER}><source src={HERO_VIDEO} type="video/mp4" /></video></span>
                      <span className={styles.quickBody}><Building2 /><span>Directory</span><small>Find every Kollective entity</small></span>
                    </button>
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
                    {placeRelatedTogether([...FEATURED_CULTURE_BRANDS, ...(payload?.home.entities ?? []).filter((entity) => !/umbrella|help 911|the tribe|black pages|everyday water/i.test(entity.name) && !isFreedomFestEntity(entity))], (entity) => entity.name).slice(0, 12).map((entity) => (
                      <HomeCompanyCard key={entity.id} entity={entity} onOpen={setSelectedCompany} />
                    ))}
                  </div>
                </section>

                <section>
                  <Heading eyebrow="THE ORIGINALS" title="OG Venues. Direct Access." />
                  <div className={styles.brandGrid}>
                    {OWNED_VENUES.map((entity) => <HomeCompanyCard key={entity.id} entity={entity} onOpen={setSelectedCompany} />)}
                  </div>
                </section>

                <section>
                  <Heading eyebrow="MORE OF THE KOLLECTIVE" title="Community, service and enterprise." />
                  <div className={styles.brandGrid}>
                    {[...(payload?.home.entities ?? []).filter((entity) => /umbrella|help 911|the tribe|black pages|everyday water/i.test(entity.name)), ...MORE_KOLLECTIVE_BRANDS].map((entity) => <HomeCompanyCard key={entity.id} entity={entity} onOpen={setSelectedCompany} />)}
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
                <Intro eyebrow="LINKS · FORMS · DIRECT ACCESS" title="Everything you need, one tap away." copy="Applications, partnerships, member offers, shopping, and the right Kollective contact path." />

                <section className={`${styles.accessStage} ${styles.accessPage}`}>
                  <Heading eyebrow="EVENT RESERVATIONS" title="Book from an active Kollective event." />
                  <p className={styles.focusIntro}>Reservations and paid tables are only available after choosing one of our live events.</p>
                  <button className={styles.installDone} onClick={() => selectTab("home")}>CHOOSE A KOLLECTIVE EVENT</button>
                </section>

                <section>
                  <Heading eyebrow="MORE LINKS + FORMS" title="Apply, partner, shop, and connect" />
                  <div className={styles.accessCoverGrid}>{ACCESS_FORM_LINKS.map((item) => <AccessCoverCard key={item.title} {...item} />)}</div>
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
                <section className={`${styles.brandGrid} ${styles.brandsDirectory}`}>
                  {allBrands.filter((entity) => !query || `${entity.name} ${entity.category || ""}`.toLowerCase().includes(query.toLowerCase())).map((entity) => <BrandCard key={entity.id} entity={entity} />)}
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
                <section className={styles.directorySections}>
                  <Heading eyebrow="ENTITY DIRECTORY" title="Companies and official identities" />
                  <div className={styles.contactDirectoryGrid}>
                    {visibleDirectoryEntities.map((entry) => <ContactDirectoryCard key={entry.name} entry={entry} kind="entity" />)}
                  </div>
                  <Heading eyebrow="COMPANY TEAM MEMBERS" title="People behind the Kollective" />
                  <div className={styles.contactDirectoryGrid}>
                    {visibleTeamContacts.map((entry) => <ContactDirectoryCard key={entry.id} entry={entry} kind="team" />)}
                  </div>
                  {!visibleDirectoryEntities.length && !visibleTeamContacts.length ? <div className={styles.empty}><strong>No directory matches.</strong><span>Try another company, person, role, or department.</span></div> : null}
                </section>
                <ProfileLink
                  href="mailto:thekollectivehospitality@gmail.com"
                  label="Contact the Kollective"
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
        {selectedCompany ? (
          <CompanyProfileSheet
            entity={selectedCompany}
            contact={companyContacts.get(selectedCompany.name.toLowerCase())}
            onClose={() => setSelectedCompany(null)}
          />
        ) : null}
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
      href={isKollectiveBookableEvent(event) ? `/app/forms/rsvp?event=${encodeURIComponent(event.event_name)}&venue=${encodeURIComponent(event.venue_name || "")}&date=${encodeURIComponent(event.event_date)}` : `/app/forms/inquiry?event=${encodeURIComponent(event.event_name)}`}
    >
      <MotionMedia
        className={styles.eventImage}
        video={eventMotion?.src}
        poster={event.image_url || eventMotion?.poster || relevantEventImage(event)}
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
function HomeCompanyCard({ entity, onOpen }: { entity: Entity; onOpen: (entity: Entity) => void }) {
  const brandMotion = motionFor(entity.name);
  return (
    <button type="button" className={styles.companyDiscoveryCard} onClick={() => onOpen(entity)} aria-label={`View ${entity.name} company profile`}>
      <MotionMedia
        className={styles.companyDiscoveryMedia}
        video={brandMotion?.src}
        poster={entity.hero_url || brandMotion?.poster || COMPANY_GRAPHIC_FALLBACK}
        label={entity.name}
      >
        {!brandMotion && entity.logo_url ? <img src={entity.logo_url} alt="" /> : null}
        {!brandMotion && !entity.logo_url ? <span className={styles.companyInitial}>{entity.name.slice(0, 1)}</span> : null}
        <span className={styles.companyDiscoveryCopy}>
          <small>{entity.category || entity.status_label || "THE KOLLECTIVE"}</small>
          <strong>{entity.name}</strong>
          <em>{entity.short_description || "Open the company profile for direct links and contact options."}</em>
          <b>VIEW COMPANY <ArrowUpRight aria-hidden="true" /></b>
        </span>
      </MotionMedia>
    </button>
  );
}
function CompanyProfileSheet({ entity, contact, onClose }: { entity: Entity; contact?: DirectoryContact; onClose: () => void }) {
  const brandMotion = motionFor(entity.name);
  const website = safeCompanyWebsite(entity, contact);
  const instagramValue = contact?.instagram?.trim() || "";
  const instagram = instagramValue
    ? /^https?:\/\//i.test(instagramValue)
      ? instagramValue
      : `https://instagram.com/${instagramValue.replace(/^@/, "")}`
    : null;
  const formHref = companyFormHref(entity);
  const contactHref = contact?.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(`${entity.name} inquiry from the Kollective app`)}`
    : `/app/forms/inquiry?company=${encodeURIComponent(entity.name)}&brand=${encodeURIComponent(entity.slug)}&intent=contact`;
  const actions = [
    { label: "WEBSITE", href: website, icon: Globe2, external: true },
    { label: "INSTAGRAM", href: instagram, icon: Instagram, external: true },
    { label: "RSVP / FORM", href: formHref, icon: ClipboardList, external: false },
    { label: "CONTACT", href: contactHref, icon: Mail, external: false },
  ];
  return (
    <div className={styles.companyOverlay} role="dialog" aria-modal="true" aria-labelledby="company-profile-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <article className={styles.companySheet}>
        <button type="button" className={styles.companyClose} onClick={onClose} aria-label="Close company profile"><X /></button>
        <MotionMedia className={styles.companySheetMedia} poster={companyPopupStill(entity, brandMotion?.poster)} label={entity.name} plainPoster>
          {!brandMotion && entity.logo_url ? <img src={entity.logo_url} alt="" /> : null}
        </MotionMedia>
        <div className={styles.companySheetCopy}>
          <p>{entity.category || entity.status_label || "THE KOLLECTIVE COMPANY"}</p>
          <h2 id="company-profile-title">{entity.name}</h2>
          <span>{entity.short_description || "Part of the Kollective network of companies, experiences, products, and community platforms."}</span>
          <div className={styles.companyActions}>
            {actions.map(({ label, href, icon: Icon, external }) => href ? (
              <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                <Icon /><strong>{label}</strong><ArrowUpRight />
              </a>
            ) : (
              <span key={label} className={styles.companyActionUnavailable}><Icon /><strong>{label}</strong><small>COMING SOON</small></span>
            ))}
          </div>
        </div>
      </article>
    </div>
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
      href={isKollectiveBookableEvent(event) ? `/app/forms/rsvp?event=${encodeURIComponent(event.event_name)}&venue=${encodeURIComponent(event.venue_name || "")}&date=${encodeURIComponent(event.event_date)}` : `/app/forms/inquiry?event=${encodeURIComponent(event.event_name)}`}
      className={styles.row}
    >
      <MotionMedia
        className={styles.rowImage}
        video={eventMotion?.src}
        poster={event.image_url || eventMotion?.poster || relevantEventImage(event)}
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
  plainPoster = false,
}: {
  className: string;
  video?: string;
  poster?: string | null;
  label: string;
  children?: React.ReactNode;
  plainPoster?: boolean;
}) {
  return (
    <div className={`${className} ${styles.media}`} style={plainPoster && poster ? { backgroundImage: `url("${poster}")` } : imageStyle(poster)}>
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
function AccessCoverCard({
  label,
  title,
  detail,
  href,
  icon: Icon,
  cover,
}: {
  label: string;
  title: string;
  detail: string;
  href: string;
  icon: typeof Home;
  cover: string;
}) {
  return (
    <a
      href={href}
      className={styles.accessCoverCard}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(4, 3, 2, .08), rgba(4, 3, 2, .42) 42%, rgba(4, 3, 2, .96)), url("${BRAND_GRAPHICS}/app/backgrounds/${cover}")`,
      }}
    >
      <Icon />
      <p>{label}</p>
      <h3>{title}</h3>
      <small>{detail}</small>
      <ArrowUpRight />
    </a>
  );
}
function relevantEventImage(event: EventItem) {
  const text = `${event.event_name} ${event.event_category || ""}`.toLowerCase();
  if (/comedy|standup|open mic/.test(text)) return "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1200&q=82";
  if (/basketball|dream|aces|sport/.test(text)) return "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=82";
  if (/art|mixed media|theatre|reading/.test(text)) return "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=82";
  if (/taco|dine|food|cocktail|taste/.test(text)) return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=82";
  if (/network|career|business/.test(text)) return "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82";
  return "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=82";
}
function ContactDirectoryCard({ entry, kind }: { entry: DirectoryContact | TeamContact; kind: "entity" | "team" }) {
  const team = kind === "team" ? entry as TeamContact : null;
  const instagram = entry.instagram?.replace(/^@/, "") || null;
  const contacts = [
    { label: "Website", value: entry.website, href: entry.website || "", icon: Globe2 },
    { label: "Email", value: entry.email, href: entry.email ? `mailto:${entry.email}` : "", icon: Mail },
    { label: "Phone", value: entry.phone, href: entry.phone ? `tel:${entry.phone}` : "", icon: Phone },
    { label: "Instagram", value: instagram ? `@${instagram}` : null, href: instagram ? `https://instagram.com/${instagram}` : "", icon: Instagram },
  ];
  return (
    <article className={styles.contactDirectoryCard}>
      <p>{team?.role || entry.category || "THE KOLLECTIVE"}</p>
      <h2>{entry.name}</h2>
      <span>{team?.brand || team?.detail || entry.category || (kind === "team" ? "Company team member" : "Official entity")}</span>
      <div className={styles.contactMethods}>
        {contacts.map(({ label, value, href, icon: Icon }) => value ? (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
            <Icon />
            <small>{label}</small>
            <strong>{label === "Website" ? "Open website" : value}</strong>
            <ArrowUpRight />
          </a>
        ) : (
          <span key={label} className={styles.contactUnavailable}>
            <Icon />
            <small>{label}</small>
            <strong>Not listed</strong>
          </span>
        ))}
      </div>
    </article>
  );
}
