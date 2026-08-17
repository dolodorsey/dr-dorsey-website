import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const API_BASE =
  (Constants.expoConfig?.extra?.apiBaseUrl as string | undefined) ||
  "https://thekollectivehospitality.com";
const BRAND_GRAPHICS =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";
const EMBLEM = `${BRAND_GRAPHICS}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const HERO_VIDEO = `${BRAND_GRAPHICS}/dr_dorsey/website/hero-video.mp4`;
const HERO_POSTER = `${BRAND_GRAPHICS}/dr_dorsey/website/hero-bg.jpg`;

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
  home: {
    featured: ContentItem[];
    events: EventItem[];
    entities: Entity[];
  };
  partial?: boolean;
  warnings?: string[];
};

type Tab = "home" | "events" | "brands" | "profile";
type EventFilter = "all" | "tonight" | "free" | "culture" | "nightlife";

type IconName = React.ComponentProps<typeof Feather>["name"];

const tabs: Array<{ key: Tab; label: string; icon: IconName }> = [
  { key: "home", label: "Home", icon: "home" },
  { key: "events", label: "Events", icon: "calendar" },
  { key: "brands", label: "Brands", icon: "grid" },
  { key: "profile", label: "You", icon: "user" },
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
  if (!value) return "VIEW DETAILS";
  const match = value.match(/^(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?$/);
  if (!match) return value;
  const minimum = Number(match[1]);
  const maximum = match[2] ? Number(match[2]) : null;
  const money = (amount: number) => `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
  if (minimum === 0 && maximum) return `FREE–${money(maximum)}`;
  if (maximum && maximum !== minimum) return `${money(minimum)}–${money(maximum)}`;
  return minimum === 0 ? "FREE" : money(minimum);
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

function entityDestination(entity: Entity) {
  const list = Array.isArray(entity.destinations) ? entity.destinations : [];
  const selected = list.find((item) => item.is_primary) ?? list[0];
  return (
    selected?.universal_link ||
    selected?.web_url ||
    selected?.fallback_url ||
    entity.website_url ||
    `${API_BASE}/kollective/${entity.slug}`
  );
}

async function openUrl(value?: string | null) {
  if (!value) return;
  const url = value.startsWith("/") ? `${API_BASE}${value}` : value;
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) throw new Error("Unsupported destination");
    await Linking.openURL(url);
  } catch {
    Alert.alert("Link unavailable", "This destination is not available right now.");
  }
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionHeading}>{title}</Text>
    </View>
  );
}

function Pill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        Haptics.selectionAsync().catch(() => undefined);
        onPress();
      }}
      style={[styles.pill, active && styles.pillActive]}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

function Hero({ hero, event, market, onEvents, onBrands }: { hero?: ContentItem; event?: EventItem; market: string; onEvents: () => void; onBrands: () => void }) {
  const player = useVideoPlayer(HERO_VIDEO, (instance) => {
    instance.loop = true;
    instance.muted = true;
    instance.play();
  });
  const poster = hero?.image_url || event?.image_url || HERO_POSTER;

  return (
    <View style={styles.hero}>
      <View style={styles.heroMedia}>
        <Image source={poster} contentFit="cover" style={StyleSheet.absoluteFill} transition={280} />
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      </View>
      <View style={styles.heroBody}>
        <View style={styles.heroTopline}>
          <View style={styles.liveChip}>
            <Feather name="star" size={12} color="#F3D58A" />
            <Text style={styles.liveChipText}>THE KOLLECTIVE</Text>
          </View>
          <Text style={styles.marketLabel}>{market.toUpperCase()}</Text>
        </View>
        <Text style={styles.heroCategory}>{hero?.content_type || event?.event_category || "DISCOVER"}</Text>
        <Text style={styles.heroTitle}>
          {hero?.title || event?.event_name || "Your city. Your people. Your next move."}
        </Text>
        <Text style={styles.heroSummary} numberOfLines={3}>
          {hero?.summary || event?.ai_summary || "The best of the Kollective, all in one place."}
        </Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryButton} onPress={onEvents}>
            <Text style={styles.primaryButtonText}>EXPLORE EVENTS</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onBrands}>
            <Text style={styles.secondaryButtonText}>EXPLORE ENTITIES</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function EventCard({ event, wide = false }: { event: EventItem; wide?: boolean }) {
  return (
    <Pressable
      onPress={() => openUrl(event.ticket_url)}
      style={[styles.eventCard, wide && styles.eventCardWide]}
    >
      <Image
        source={event.image_url || HERO_POSTER}
        contentFit="cover"
        style={StyleSheet.absoluteFill}
        transition={220}
      />
      <LinearGradient
        colors={["rgba(4,4,4,.08)", "rgba(4,4,4,.28)", "rgba(4,4,4,.96)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.eventBadgeRow}>
        {event.is_featured ? <Text style={styles.goldBadge}>FEATURED</Text> : null}
        {event.is_curated ? <Text style={styles.darkBadge}>CURATED</Text> : null}
      </View>
      <View style={styles.eventCardCopy}>
        <Text style={styles.eventDate}>{eventDate(event.event_date)}</Text>
        <Text style={styles.eventName} numberOfLines={2}>{event.event_name}</Text>
        <View style={styles.metaRow}>
          <Feather name="map-pin" size={12} color="#D5D0C7" />
          <Text style={styles.metaText} numberOfLines={1}>
            {event.venue_name || event.neighborhood || event.market || event.city || "Location pending"}
          </Text>
        </View>
        <Text style={styles.priceText}>{eventPrice(event)}</Text>
      </View>
    </Pressable>
  );
}

function BrandCard({ entity }: { entity: Entity }) {
  const image = entity.hero_url || entity.logo_url || EMBLEM;
  return (
    <Pressable style={styles.brandCard} onPress={() => openUrl(entityDestination(entity))}>
      <Image source={image} contentFit="cover" style={StyleSheet.absoluteFill} transition={220} />
      <LinearGradient
        colors={["rgba(4,4,4,.04)", "rgba(4,4,4,.25)", "rgba(4,4,4,.94)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.brandCopy}>
        <Text style={styles.brandCategory}>{entity.category || "KOLLECTIVE"}</Text>
        <Text style={styles.brandName}>{entity.name}</Text>
        <Text style={styles.brandDescription} numberOfLines={2}>
          {entity.short_description || entity.status_label || "Explore the brand"}
        </Text>
      </View>
      <View style={styles.arrowCircle}>
        <Feather name="arrow-up-right" size={17} color="#F3D58A" />
      </View>
    </Pressable>
  );
}

function QuickCard({
  icon,
  title,
  copy,
  onPress,
}: {
  icon: IconName;
  title: string;
  copy: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickCard} onPress={onPress}>
      <Feather name={icon} size={23} color="#F3D58A" />
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickDescription}>{copy}</Text>
    </Pressable>
  );
}

function EventBooking({ events, selectedId, partySize, onSelect, onPartySize }: {
  events: EventItem[];
  selectedId?: string;
  partySize: number;
  onSelect: (id: string) => void;
  onPartySize: (size: number) => void;
}) {
  const selected = events.find((event) => event.id === selectedId) || events[0];
  const request = (type: "rsvp" | "vip-section") => {
    if (!selected) return;
    const params = new URLSearchParams({
      event: selected.event_name,
      venue: selected.venue_name || "",
      date: selected.event_date,
      guest_count: String(partySize),
    });
    openUrl(`${API_BASE}/app/forms/${type}?${params.toString()}`).catch(() => undefined);
  };

  return (
    <View style={styles.bookingCard}>
      <Text style={styles.eyebrow}>KOLLECTIVE EVENTS ONLY</Text>
      <Text style={styles.bookingTitle}>Reserve or buy a table.</Text>
      <Text style={styles.bookingCopy}>Choose one of our live events, then make a reservation or secure a paid table.</Text>
      {events.length ? (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bookingEventRow}>
            {events.map((event) => (
              <Pressable key={event.id} style={[styles.bookingEvent, selected?.id === event.id && styles.bookingEventActive]} onPress={() => onSelect(event.id)}>
                <Text style={styles.bookingEventName}>{event.event_name}</Text>
                <Text style={styles.bookingEventMeta}>{eventDate(event.event_date)} · {event.venue_name}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.bookingActions}>
            <Pressable style={styles.bookingAction} onPress={() => request("rsvp")}>
              <Feather name="check-circle" size={21} color="#F3D58A" />
              <Text style={styles.bookingActionTitle}>MAKE A RESERVATION</Text>
              <Text style={styles.bookingActionCopy}>Guest list or event reservation</Text>
            </Pressable>
            <Pressable style={styles.bookingAction} onPress={() => request("vip-section")}>
              <Feather name="star" size={21} color="#F3D58A" />
              <Text style={styles.bookingActionTitle}>BUY A TABLE / VIP</Text>
              <Text style={styles.bookingActionCopy}>Continue to secure payment</Text>
            </Pressable>
          </View>
          <View style={styles.partyRow}>
            <Text style={styles.partyLabel}>PARTY SIZE</Text>
            <View style={styles.partyControl}>
              <Pressable style={styles.partyButton} onPress={() => onPartySize(Math.max(1, partySize - 1))}><Feather name="minus" size={18} color="#F3D58A" /></Pressable>
              <Text style={styles.partyValue}>{partySize}</Text>
              <Pressable style={styles.partyButton} onPress={() => onPartySize(Math.min(1000, partySize + 1))}><Feather name="plus" size={18} color="#F3D58A" /></Pressable>
            </View>
          </View>
        </>
      ) : <Text style={styles.emptyText}>No bookable Kollective events are active in this market.</Text>}
    </View>
  );
}

function AppContent() {
  const [payload, setPayload] = useState<CustomerPayload | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [filter, setFilter] = useState<EventFilter>("all");
  const [market, setMarket] = useState("Atlanta");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookableEventId, setSelectedBookableEventId] = useState<string>();
  const [partySize, setPartySize] = useState(2);

  const load = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/customer/home`, {
        headers: { Accept: "application/json", "X-Client-Info": "kollective-customer-ios/1.0" },
      });
      if (!response.ok) throw new Error(`Feed returned ${response.status}`);
      const data = (await response.json()) as CustomerPayload;
      setPayload(data);
      setMarket((current) => current || data.app.config?.defaultMarket || data.app.city || "Atlanta");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The Kollective feed is unavailable.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load().catch(() => undefined);
  }, []);

  const markets = useMemo(() => {
    const configured = payload?.app.config?.markets ?? [];
    const discovered = Object.keys(payload?.experience?.marketCounts ?? {});
    return Array.from(new Set(["All Markets", ...configured.filter((item) => item !== "All Markets"), ...discovered]));
  }, [payload]);

  const marketEvents = useMemo(() => {
    const source = payload?.home.events ?? [];
    return market === "All Markets"
      ? source
      : source.filter((event) => (event.market || event.city) === market);
  }, [payload, market]);
  const bookableEvents = useMemo(() => marketEvents.filter(isKollectiveBookableEvent), [marketEvents]);

  const filteredEvents = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return marketEvents
      .filter((event) => matchesFilter(event, filter))
      .filter((event) => {
        if (!clean) return true;
        return [event.event_name, event.venue_name, event.neighborhood, event.event_category, event.market]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(clean));
      });
  }, [marketEvents, query, filter]);

  const filteredBrands = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return (payload?.home.entities ?? []).filter((entity) => {
      if (!clean) return true;
      return [entity.name, entity.category, entity.short_description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(clean));
    });
  }, [payload, query]);

  const selectTab = (tab: Tab) => {
    Haptics.selectionAsync().catch(() => undefined);
    setActiveTab(tab);
    setQuery("");
    if (tab !== "events") setFilter("all");
  };

  const hero = payload?.home.featured[0];
  const nextEvent = marketEvents[0] ?? payload?.home.events[0];

  if (loading) {
    return (
      <View style={styles.centerState}>
        <Image source={EMBLEM} contentFit="contain" style={styles.loadingEmblem} />
        <ActivityIndicator color="#D8B04C" size="large" />
        <Text style={styles.stateCopy}>Loading the Kollective</Text>
      </View>
    );
  }

  if (error && !payload) {
    return (
      <View style={styles.centerState}>
        <Image source={EMBLEM} contentFit="contain" style={styles.loadingEmblem} />
        <Text style={styles.stateTitle}>We are reconnecting.</Text>
        <Text style={styles.stateCopy}>{error}</Text>
        <Pressable style={styles.primaryButton} onPress={() => load()}>
          <Text style={styles.primaryButtonText}>TRY AGAIN</Text>
        </Pressable>
      </View>
    );
  }

  if (payload?.app.maintenance_mode) {
    return (
      <View style={styles.centerState}>
        <Image source={EMBLEM} contentFit="contain" style={styles.loadingEmblem} />
        <Text style={styles.stateTitle}>We will be right back.</Text>
        <Text style={styles.stateCopy}>
          {payload.app.maintenance_message || "The Kollective is receiving an upgrade."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Pressable style={styles.identity} onPress={() => selectTab("home")}>
          <Image source={EMBLEM} contentFit="contain" style={styles.headerEmblem} />
          <View>
            <Text style={styles.identityName}>KOLLECTIVE</Text>
            <View style={styles.identityMarketRow}>
              <Feather name="map-pin" size={11} color="#B7B1A7" />
              <Text style={styles.identityMarket}>{market}</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.nativeBadge}>
          <Feather name={Platform.OS === "ios" ? "smartphone" : "tablet"} size={13} color="#F3D58A" />
          <Text style={styles.nativeBadgeText}>NATIVE APP</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => load(true)}
            tintColor="#D8B04C"
          />
        }
      >
        {activeTab !== "home" ? (
          <View style={styles.searchBox}>
            <Feather name="search" size={17} color="#AFA89D" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={activeTab === "brands" ? "Search brands" : "Search events"}
              placeholderTextColor="#777067"
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        ) : null}

        {activeTab === "home" ? (
          <>
            <Hero hero={hero} event={nextEvent} market={market} onEvents={() => selectTab("events")} onBrands={() => selectTab("brands")} />
            <SectionTitle eyebrow="CHOOSE YOUR MARKET" title="The Kollective, where you are" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
              {markets.map((item) => (
                <Pill
                  key={item}
                  label={`${item}${payload?.experience?.marketCounts?.[item] ? ` · ${payload.experience.marketCounts[item]}` : ""}`}
                  active={market === item}
                  onPress={() => setMarket(item)}
                />
              ))}
            </ScrollView>

            <EventBooking events={bookableEvents} selectedId={selectedBookableEventId} partySize={partySize} onSelect={setSelectedBookableEventId} onPartySize={setPartySize} />

            <SectionTitle eyebrow="START HERE" title="Move through the Kollective" />
            <View style={styles.quickGrid}>
              <QuickCard icon="calendar" title="Tonight" copy="What is happening now" onPress={() => { setFilter("tonight"); selectTab("events"); }} />
              <QuickCard icon="clock" title="This Week" copy="Plan the next move" onPress={() => selectTab("events")} />
              <QuickCard icon="grid" title="Brands" copy="Explore the enterprise" onPress={() => selectTab("brands")} />
            </View>

            <SectionTitle eyebrow="CUSTOMER EXPERIENCE CONTROL" title={`${market} experiences`} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventRail}>
              {marketEvents.slice(0, 8).map((event) => <EventCard key={event.id} event={event} />)}
            </ScrollView>

            <SectionTitle eyebrow="THE UNIVERSE" title="Inside the Kollective" />
            <View style={styles.brandGrid}>
              {(payload?.home.entities ?? []).slice(0, 8).map((entity) => <BrandCard key={entity.id} entity={entity} />)}
            </View>
          </>
        ) : null}

        {activeTab === "events" ? (
          <>
            <SectionTitle eyebrow="LIVE EXPERIENCE CONTROL" title={`${market} events worth leaving the house for.`} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
              {markets.map((item) => <Pill key={item} label={item} active={market === item} onPress={() => setMarket(item)} />)}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
              {filters.map((item) => <Pill key={item.key} label={item.label} active={filter === item.key} onPress={() => setFilter(item.key)} />)}
            </ScrollView>
            <View style={styles.stack}>
              {filteredEvents.map((event) => <EventCard key={event.id} event={event} wide />)}
              {!filteredEvents.length ? <Text style={styles.emptyText}>No controlled experiences match this view yet.</Text> : null}
            </View>
          </>
        ) : null}

        {activeTab === "brands" ? (
          <>
            <SectionTitle eyebrow="ONE ENTERPRISE" title="Every brand. One front door." />
            <Text style={styles.introCopy}>Discover, book, shop, join, or learn more without digging through the operating website.</Text>
            <View style={styles.brandGrid}>
              {filteredBrands.map((entity) => <BrandCard key={entity.id} entity={entity} />)}
              {!filteredBrands.length ? <Text style={styles.emptyText}>No brands match this search.</Text> : null}
            </View>
          </>
        ) : null}

        {activeTab === "profile" ? (
          <>
            <View style={styles.profileHero}>
              <Image source={EMBLEM} contentFit="contain" style={styles.profileEmblem} />
              <Text style={styles.profileTitle}>Your Kollective</Text>
              <Text style={styles.profileCopy}>A native front door to the brands, events and experiences managed by the Kollective operating system.</Text>
            </View>
            <View style={styles.profileStats}>
              <View style={styles.statCard}><Text style={styles.statValue}>{payload?.home.entities.length ?? 0}</Text><Text style={styles.statLabel}>BRANDS</Text></View>
              <View style={styles.statCard}><Text style={styles.statValue}>{payload?.home.events.length ?? 0}</Text><Text style={styles.statLabel}>EVENTS</Text></View>
              <View style={styles.statCard}><Text style={styles.statValue}>{payload?.experience?.curatedCount ?? 0}</Text><Text style={styles.statLabel}>CURATED</Text></View>
            </View>
            <Pressable style={styles.profileLink} onPress={() => openUrl(`${API_BASE}/app`)}>
              <View><Text style={styles.profileLinkTitle}>Kollective Web Hub</Text><Text style={styles.profileLinkCopy}>Open the companion experience</Text></View>
              <Feather name="arrow-up-right" size={20} color="#F3D58A" />
            </Pressable>
            <Pressable style={styles.profileLink} onPress={() => load(true)}>
              <View><Text style={styles.profileLinkTitle}>Refresh Live Data</Text><Text style={styles.profileLinkCopy}>Pull the latest controlled feed</Text></View>
              <Feather name="refresh-cw" size={20} color="#F3D58A" />
            </Pressable>
            <Text style={styles.buildText}>Kollective Customer · iOS build 1 · v1.0.0</Text>
          </>
        ) : null}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <Pressable key={tab.key} style={styles.tabButton} onPress={() => selectTab(tab.key)}>
            <Feather name={tab.icon} size={20} color={activeTab === tab.key ? "#F3D58A" : "#777067"} />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#050505" },
  app: { flex: 1, backgroundColor: "#050505" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 34 },
  header: { height: 64, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#28241E" },
  identity: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerEmblem: { width: 38, height: 38 },
  identityName: { color: "#F5F2EC", fontSize: 16, fontWeight: "800", letterSpacing: 2 },
  identityMarketRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 },
  identityMarket: { color: "#B7B1A7", fontSize: 11 },
  nativeBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1, borderColor: "#4A3E24", borderRadius: 999, backgroundColor: "#16130E" },
  nativeBadgeText: { color: "#F3D58A", fontSize: 9, fontWeight: "800", letterSpacing: 1.1 },
  centerState: { flex: 1, alignItems: "center", justifyContent: "center", padding: 28, backgroundColor: "#050505", gap: 16 },
  loadingEmblem: { width: 118, height: 118 },
  stateTitle: { color: "#F5F2EC", fontSize: 28, fontWeight: "800", textAlign: "center" },
  stateCopy: { color: "#AAA399", fontSize: 15, lineHeight: 22, textAlign: "center" },
  sectionTitle: { marginTop: 28, marginBottom: 12 },
  eyebrow: { color: "#C8A94F", fontSize: 10, fontWeight: "800", letterSpacing: 1.6, marginBottom: 5 },
  sectionHeading: { color: "#F5F2EC", fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  introCopy: { color: "#AFA89D", fontSize: 14, lineHeight: 21, marginBottom: 18, marginTop: -4 },
  pillRow: { gap: 8, paddingRight: 16, paddingBottom: 3 },
  pill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, backgroundColor: "#12110F", borderWidth: 1, borderColor: "#28241E" },
  pillActive: { backgroundColor: "#D8B04C", borderColor: "#D8B04C" },
  pillText: { color: "#AFA89D", fontSize: 12, fontWeight: "700" },
  pillTextActive: { color: "#080806" },
  hero: { borderRadius: 28, overflow: "hidden", marginTop: 16, borderWidth: 1, borderColor: "#342D20", backgroundColor: "#0A0907" },
  heroMedia: { height: 390, overflow: "hidden", backgroundColor: "#111" },
  heroBody: { padding: 20, gap: 11, backgroundColor: "#0A0907" },
  heroTopline: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  liveChip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(8,8,8,.66)", borderRadius: 999, paddingHorizontal: 11, paddingVertical: 8, borderWidth: 1, borderColor: "rgba(243,213,138,.28)" },
  liveChipText: { color: "#F3D58A", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  marketLabel: { color: "#F5F2EC", fontSize: 10, fontWeight: "800", letterSpacing: 1.4 },
  heroCategory: { color: "#F3D58A", fontSize: 11, fontWeight: "800", letterSpacing: 1.5 },
  heroTitle: { color: "#FFFFFF", fontSize: 38, lineHeight: 40, fontWeight: "900", letterSpacing: -1.4 },
  heroSummary: { color: "#D5D0C7", fontSize: 14, lineHeight: 21, maxWidth: 330 },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 5 },
  primaryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: "#D8B04C", borderRadius: 999, paddingHorizontal: 17, paddingVertical: 13, minHeight: 46 },
  primaryButtonText: { color: "#090909", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  secondaryButton: { alignItems: "center", justifyContent: "center", borderRadius: 999, paddingHorizontal: 17, paddingVertical: 13, borderWidth: 1, borderColor: "#605743", backgroundColor: "rgba(5,5,5,.55)" },
  secondaryButtonText: { color: "#F5F2EC", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  quickCard: { width: "48.4%", minHeight: 142, borderRadius: 22, padding: 16, justifyContent: "flex-end", backgroundColor: "#12110F", borderWidth: 1, borderColor: "#28241E", gap: 7 },
  quickTitle: { color: "#F5F2EC", fontSize: 17, fontWeight: "800" },
  quickDescription: { color: "#9C958B", fontSize: 11, lineHeight: 16 },
  bookingCard: { marginTop: 24, padding: 18, borderRadius: 26, borderWidth: 1, borderColor: "#5A4824", backgroundColor: "#0D0B08" },
  bookingTitle: { color: "#F5F2EC", fontSize: 32, lineHeight: 34, fontWeight: "900", letterSpacing: -1, marginBottom: 8 },
  bookingCopy: { color: "#AFA89D", fontSize: 13, lineHeight: 19, marginBottom: 18 },
  bookingEventRow: { gap: 8, paddingRight: 12 },
  bookingEvent: { width: 246, minHeight: 82, justifyContent: "center", padding: 14, borderRadius: 17, borderWidth: 1, borderColor: "#332A1A", backgroundColor: "#090806" },
  bookingEventActive: { borderColor: "#D8B04C", backgroundColor: "#1D170C" },
  bookingEventName: { color: "#F5F2EC", fontSize: 14, fontWeight: "900" },
  bookingEventMeta: { color: "#AFA89D", fontSize: 10, marginTop: 5 },
  bookingActions: { flexDirection: "row", gap: 9, marginTop: 12 },
  bookingAction: { flex: 1, minHeight: 128, justifyContent: "center", padding: 13, borderRadius: 18, borderWidth: 1, borderColor: "#4A3E24", backgroundColor: "#12100C", gap: 7 },
  bookingActionTitle: { color: "#F5F2EC", fontSize: 10, lineHeight: 13, fontWeight: "900" },
  bookingActionCopy: { color: "#9C958B", fontSize: 9, lineHeight: 13 },
  partyRow: { marginTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  partyLabel: { color: "#F3D58A", fontSize: 9, fontWeight: "900", letterSpacing: 1.3 },
  partyControl: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#4A3E24", borderRadius: 999, overflow: "hidden" },
  partyButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "#12100C" },
  partyValue: { width: 38, color: "#F5F2EC", textAlign: "center", fontSize: 15, fontWeight: "900" },
  eventRail: { gap: 12, paddingRight: 16 },
  eventCard: { width: 270, height: 350, borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "#302A21", backgroundColor: "#111" },
  eventCardWide: { width: "100%", height: 390 },
  eventBadgeRow: { flexDirection: "row", gap: 6, padding: 13 },
  goldBadge: { color: "#090909", backgroundColor: "#D8B04C", borderRadius: 999, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 6, fontSize: 8, fontWeight: "900", letterSpacing: 0.9 },
  darkBadge: { color: "#F3D58A", backgroundColor: "rgba(8,8,8,.72)", borderRadius: 999, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 6, fontSize: 8, fontWeight: "900", letterSpacing: 0.9 },
  eventCardCopy: { marginTop: "auto", padding: 17, gap: 7 },
  eventDate: { color: "#F3D58A", fontSize: 10, fontWeight: "900", letterSpacing: 1.1 },
  eventName: { color: "#FFFFFF", fontSize: 23, lineHeight: 26, fontWeight: "900", letterSpacing: -0.5 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { color: "#D5D0C7", fontSize: 11, flex: 1 },
  priceText: { color: "#B7B1A7", fontSize: 9, fontWeight: "800", letterSpacing: 1.1, marginTop: 3 },
  stack: { gap: 14, marginTop: 16 },
  brandGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  brandCard: { width: "48.4%", height: 235, borderRadius: 22, overflow: "hidden", borderWidth: 1, borderColor: "#302A21", backgroundColor: "#111" },
  brandCopy: { marginTop: "auto", padding: 14, paddingRight: 40, gap: 4 },
  brandCategory: { color: "#F3D58A", fontSize: 8, fontWeight: "900", letterSpacing: 1.1, textTransform: "uppercase" },
  brandName: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  brandDescription: { color: "#B7B1A7", fontSize: 10, lineHeight: 14 },
  arrowCircle: { position: "absolute", right: 12, top: 12, width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(5,5,5,.7)", borderWidth: 1, borderColor: "rgba(243,213,138,.25)" },
  searchBox: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 15, borderRadius: 18, borderWidth: 1, borderColor: "#302A21", backgroundColor: "#11100E", paddingHorizontal: 14, height: 50 },
  searchInput: { color: "#F5F2EC", fontSize: 14, flex: 1, height: "100%" },
  emptyText: { color: "#8C857B", fontSize: 14, textAlign: "center", paddingVertical: 34, width: "100%" },
  profileHero: { alignItems: "center", paddingVertical: 38, paddingHorizontal: 20 },
  profileEmblem: { width: 138, height: 138, marginBottom: 18 },
  profileTitle: { color: "#F5F2EC", fontSize: 31, fontWeight: "900", marginBottom: 9 },
  profileCopy: { color: "#AFA89D", fontSize: 14, lineHeight: 21, textAlign: "center" },
  profileStats: { flexDirection: "row", gap: 8, marginBottom: 16 },
  statCard: { flex: 1, alignItems: "center", paddingVertical: 18, borderRadius: 18, borderWidth: 1, borderColor: "#28241E", backgroundColor: "#11100E" },
  statValue: { color: "#F3D58A", fontSize: 24, fontWeight: "900" },
  statLabel: { color: "#8F887E", fontSize: 8, fontWeight: "800", letterSpacing: 1.1, marginTop: 3 },
  profileLink: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 17, borderWidth: 1, borderColor: "#28241E", backgroundColor: "#11100E", borderRadius: 18, marginBottom: 9 },
  profileLinkTitle: { color: "#F5F2EC", fontSize: 14, fontWeight: "800" },
  profileLinkCopy: { color: "#8F887E", fontSize: 10, marginTop: 3 },
  buildText: { color: "#625D56", fontSize: 9, letterSpacing: 0.7, textAlign: "center", marginTop: 24 },
  tabBar: { height: 74, flexDirection: "row", alignItems: "center", borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#28241E", backgroundColor: "#090907", paddingBottom: Platform.OS === "ios" ? 8 : 0 },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  tabText: { color: "#777067", fontSize: 9, fontWeight: "700" },
  tabTextActive: { color: "#F3D58A" },
});
