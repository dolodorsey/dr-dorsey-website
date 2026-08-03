import { NextResponse } from "next/server";
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from "@/lib/kollective-public";

export const revalidate = 120;

const headers = {
  apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}`,
};
const EMBLEM =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";
const DEFAULT_CONFIG = {
  app_scope: "customer",
  app_name: "Kollective",
  tagline: "The best of the Kollective, all in one place.",
  city: "Atlanta",
  maintenance_mode: false,
  featured_limit: 12,
  event_limit: 16,
  config: {
    markets: ["All Markets", "Atlanta"],
    defaultMarket: "Atlanta",
    experienceControl: true,
  },
};
const CUSTOMER_BRAND_ORDER = [
  "grown-ish",
  "project-x",
  "sole-exchange",
  "rose-on-piedmont",
  "the-umbrella-group",
  "help-911",
  "black-pages",
  "dr-dorsey",
  "hakuna-matata",
  "everyday-water-group",
  "the-tribe-memphis",
  "freedom-fest",
] as const;
const CUSTOMER_BRAND_RANK = new Map<string, number>(
  CUSTOMER_BRAND_ORDER.map((slug, index) => [slug, index]),
);
const EVENT_DIRECTORY_SLUGS = new Set([
  "grown-ish",
  "project-x",
  "taste-of-art",
  "freedom-fest",
  "freedom-parade",
  "juneteenth-atlanta",
  "my-birthday",
]);
const RAW_EVENT_DIRECTORY_NAMES = new Set([
  "grown ish",
  "project x",
  "taste of art",
  "freedom fest juneteent atl",
  "freedom fest juneteenth atl",
  "freedom parade",
  "juneteenth atlanta",
  "make atlanta great again",
  "wasted weekends",
  "world cup activations",
  "shut up and dance",
  "iconic",
  "espresso",
  "whip addict",
  "my birthday",
]);
const STATIC_EVENT_DIRECTORY_NAMES = [
  "GROWN-ISH",
  "Project X",
  "Taste of Art",
  "Freedom Fest : Juneteenth ATL",
  "Freedom Parade",
  "Juneteenth Atlanta",
  "Make Atlanta Great Again",
  "Wasted Weekends",
  "World Cup Activations",
  "Shut Up & Dance",
  "ICONIC",
  "ESPRESSO",
];

type Row = Record<string, unknown>;
type DirectoryPayload = { entities: Row[]; team: Row[] };

async function fetchRows(table: string, params: Record<string, string>) {
  const url = new URL(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { headers, next: { revalidate: 120 } });
  if (!response.ok) {
    throw new Error(`${table} returned ${response.status}: ${await response.text()}`);
  }
  return (await response.json()) as Row[];
}

async function fetchDirectory() {
  const response = await fetch(
    `${KOLLECTIVE_SUPABASE_URL}/functions/v1/kollective-public-directory`,
    { next: { revalidate: 300 } },
  );
  if (!response.ok) throw new Error(`public directory returned ${response.status}`);
  return (await response.json()) as DirectoryPayload;
}

function decode(value: unknown) {
  if (typeof value !== "string") return value;
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&(amp|apos|gt|lt|nbsp|quot);/g, (_, entity: string) => named[entity] ?? _)
    .replace(/\s+/g, " ")
    .trim();
}

function cityKey(value: unknown) {
  const city = String(value ?? "").trim().toLowerCase();
  if (["atl", "atlanta, ga", "atlanta ga"].includes(city)) return "atlanta";
  if (["la", "los angeles, ca"].includes(city)) return "los angeles";
  if (["nyc", "new york", "new york city"].includes(city)) return "nyc";
  return city;
}

function displayMarket(value: unknown) {
  const key = cityKey(value);
  const labels: Record<string, string> = {
    atlanta: "Atlanta",
    dc: "DC",
    dallas: "Dallas",
    "los angeles": "Los Angeles",
    nyc: "NYC",
    charlotte: "Charlotte",
    scottsdale: "Scottsdale",
  };
  return labels[key] || String(value ?? "Other");
}

function canonical(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\b20\d{2}\b/g, "")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .replace(/\b(the|official|free|rsvp)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function active(row: Row, now: Date) {
  const start = typeof row.starts_at === "string" ? new Date(row.starts_at) : null;
  const end = typeof row.ends_at === "string" ? new Date(row.ends_at) : null;
  return (!start || start <= now) && (!end || end >= now);
}

function brandRank(row: Row) {
  return CUSTOMER_BRAND_RANK.get(String(row.slug)) ?? CUSTOMER_BRAND_ORDER.length;
}

function quality(event: Row, preferred: string) {
  let score = Number(event.ai_vibe_score ?? 0) + Number(event.sort_priority ?? 0) * 20;
  if (event.is_featured) score += 500;
  if (cityKey(event.market) === preferred) score += 100;
  if (event.image_url) score += 15;
  if (event.ticket_url) score += 10;
  if (event.ai_summary) score += 6;
  return score;
}

function isGrownIsh(value: unknown) {
  return /\bgrown\s*[-–—]?\s*ish\b/i.test(String(value ?? ""));
}

function normalizeEvents(rows: Row[], overrides: Row[], preferred: string, limit: number) {
  const byId = new Map(overrides.map((row) => [String(row.event_id), row]));
  const seen = new Set<string>();
  const normalized = rows
    .map((row) => {
      const override = byId.get(String(row.id)) || {};
      const market = override.market_override || row.city;
      return {
        ...row,
        event_date: row.event_date,
        event_name: String(decode(override.display_title || row.event_name) || "Event"),
        city: decode(row.city),
        market: displayMarket(market),
        venue_name: decode(row.venue_name),
        description: decode(row.description),
        ai_summary: decode(override.display_summary || row.ai_summary),
        image_url: override.display_image_url || row.image_url,
        ticket_price: decode(row.ticket_price) || null,
        is_free: Boolean(row.is_free) || /\bfree\b/i.test(String(row.ticket_price || "")),
        is_hidden: Boolean(override.is_hidden),
        is_curated: Boolean(byId.has(String(row.id))),
        sort_priority: Number(override.sort_priority || 0),
      };
    })
    .filter((event) => !event.is_hidden)
    .sort(
      (a, b) =>
        String(a.event_date).localeCompare(String(b.event_date)) ||
        quality(b, preferred) - quality(a, preferred),
    )
    .filter((event) => {
      const eventKey = [canonical(event.event_name), event.event_date, cityKey(event.market)].join("|");
      if (!canonical(event.event_name) || seen.has(eventKey)) return false;
      seen.add(eventKey);
      return true;
    })
    .slice(0, limit);

  const grownIshIndex = normalized.findIndex((event) => isGrownIsh(event.event_name));

  return normalized
    .map((event, index) => ({
      ...event,
      is_featured: index === grownIshIndex,
      is_kollective_event: isGrownIsh(event.event_name),
    }))
    .sort(
      (a, b) =>
        Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)) ||
        Number(cityKey(b.market) === preferred) - Number(cityKey(a.market) === preferred) ||
        String(a.event_date).localeCompare(String(b.event_date)) ||
        quality(b, preferred) - quality(a, preferred),
    );
}

function isEventDirectoryEntity(row: Row) {
  const slug = String(row.slug ?? "").toLowerCase();
  const division = `${row.division_slug ?? ""} ${row.division_name ?? ""}`.toLowerCase();
  const category = String(row.category ?? "").toLowerCase();
  return (
    EVENT_DIRECTORY_SLUGS.has(slug) ||
    division.includes("events-cultural-ip") ||
    division.includes("events & cultural") ||
    /\b(event|festival|parade|party|ball|concert series|activation)\b/.test(category)
  );
}

function bestLogo(row?: Row | null) {
  return String(row?.logo_url || row?.hero_url || EMBLEM);
}

function findEntity(label: unknown, rows: Row[]) {
  const lookup = canonical(label);
  if (!lookup) return null;
  return (
    rows.find((row) => canonical(row.name) === lookup || canonical(row.slug) === lookup) ||
    rows.find((row) => {
      const entityName = canonical(row.name);
      return entityName.length > 3 && (lookup.includes(entityName) || entityName.includes(lookup));
    }) ||
    null
  );
}

function findDirectoryEntity(entry: Row, rows: Row[]) {
  return findEntity(entry.name || entry.brand_key || entry.slug, rows);
}

function isRawDirectoryEvent(entry: Row, matched?: Row | null) {
  if (matched && isEventDirectoryEntity(matched)) return true;
  const name = canonical(entry.name || entry.brand_key || entry.slug);
  const category = String(entry.category ?? "").trim().toLowerCase();
  return (
    RAW_EVENT_DIRECTORY_NAMES.has(name) ||
    category === "events" ||
    category === "event" ||
    category.includes("events / brand") ||
    category.includes("event activation") ||
    /\bactivations?\b/.test(`${name} ${category}`)
  );
}

function nextFridayIso() {
  const date = new Date();
  const daysUntilFriday = (5 - date.getUTCDay() + 7) % 7;
  date.setUTCDate(date.getUTCDate() + daysUntilFriday);
  return date.toISOString().slice(0, 10);
}

function buildGrownIshFeature(rows: Row[]) {
  const entity = rows.find((row) => String(row.slug) === "grown-ish");
  if (!entity) return null;
  return {
    id: "kollective-grown-ish-feature",
    city: "Atlanta",
    market: "Atlanta",
    event_name: "GROWN-ISH",
    event_date: nextFridayIso(),
    event_time: "10:00 PM",
    end_date: nextFridayIso(),
    end_time: "3:00 AM",
    venue_name: "Rose on Piedmont",
    venue_address: "3115 Piedmont Rd NE, Atlanta, GA 30305",
    neighborhood: "Buckhead",
    event_type: "nightlife",
    event_category: "Kollective Featured",
    description:
      String(decode(entity.short_description) || "Friday nightlife experience at Rose on Piedmont."),
    ticket_url: "/app/forms/rsvp?brand=grown-ish",
    ticket_price: null,
    image_url: entity.hero_url || entity.logo_url || EMBLEM,
    organizer: "The Kollective",
    tags: ["grown-ish", "friday", "rose-on-piedmont"],
    vibe_tags: ["grown-and-sexy", "nightlife"],
    is_free: false,
    ai_summary: "The Kollective's featured Friday experience at Rose on Piedmont.",
    ai_vibe_score: 100,
    is_hidden: false,
    is_curated: true,
    sort_priority: 999,
    is_featured: true,
    is_kollective_event: true,
  };
}

export async function GET() {
  const warnings: string[] = [];
  let config: Row = DEFAULT_CONFIG;
  try {
    const rows = await fetchRows("kollective_customer_app_config", {
      app_scope: "eq.customer",
      select: "*",
      limit: "1",
    });
    config = rows[0] ?? DEFAULT_CONFIG;
  } catch {
    warnings.push("Customer configuration is using safe defaults.");
  }

  const featuredLimit = Number(config.featured_limit) || 12;
  const eventLimit = Number(config.event_limit) || 16;
  const preferred = cityKey(config.city || "Atlanta");
  const today = new Date().toISOString().slice(0, 10);

  const [entitiesResult, contentResult, eventsResult, overridesResult, directoryResult] =
    await Promise.allSettled([
      fetchRows("kollective_public_entity_directory", {
        select:
          "id,slug,name,category,short_description,status,status_label,current_focus,logo_url,hero_url,website_url,city_scope,access_level,featured_priority,division_slug,division_name,destinations",
        order: "current_focus.desc,featured_priority.desc,name.asc",
        limit: String(Math.max(featuredLimit * 12, 180)),
      }),
      fetchRows("kollective_public_content", {
        is_published: "eq.true",
        select:
          "id,entity_id,destination_id,slug,content_type,title,summary,body,image_url,city_scope,audience,priority,starts_at,ends_at",
        order: "priority.desc,starts_at.desc",
        limit: "30",
      }),
      fetchRows("v_gt_public_events", {
        event_date: `gte.${today}`,
        select:
          "id,city,event_name,event_date,event_time,end_date,end_time,venue_name,venue_address,neighborhood,event_type,event_category,description,ticket_url,ticket_price,image_url,organizer,tags,vibe_tags,is_free,ai_summary,ai_vibe_score",
        order: "event_date.asc,ai_vibe_score.desc",
        limit: String(Math.max(eventLimit * 8, 128)),
      }),
      fetchRows("kollective_customer_event_overrides", { select: "*", limit: "500" }),
      fetchDirectory(),
    ]);

  const allEntityRows =
    entitiesResult.status === "fulfilled"
      ? entitiesResult.value.filter(
          (entity) =>
            !["inactive", "archived", "closed"].includes(
              String(entity.status ?? "").toLowerCase(),
            ),
        )
      : [];

  const entities = [...allEntityRows]
    .sort(
      (a, b) =>
        brandRank(a) - brandRank(b) ||
        Number(b.featured_priority ?? 0) - Number(a.featured_priority ?? 0) ||
        String(a.name ?? "").localeCompare(String(b.name ?? "")),
    )
    .slice(0, Math.max(featuredLimit, CUSTOMER_BRAND_ORDER.length));

  const now = new Date();
  const content =
    contentResult.status === "fulfilled"
      ? contentResult.value
          .filter((item) => active(item, now))
          .map((item) => ({
            ...item,
            title: decode(item.title),
            summary: decode(item.summary),
            body: decode(item.body),
          }))
          .slice(0, 18)
      : [];

  const overrides = overridesResult.status === "fulfilled" ? overridesResult.value : [];
  if (overridesResult.status === "rejected") {
    warnings.push("Operator curation is temporarily unavailable.");
  }

  const normalizedEvents =
    eventsResult.status === "fulfilled"
      ? normalizeEvents(eventsResult.value, overrides, preferred, eventLimit * 3)
      : [];
  const fallbackGrownIsh = buildGrownIshFeature(allEntityRows);
  const events = normalizedEvents.some((event) => isGrownIsh(event.event_name))
    ? normalizedEvents
    : fallbackGrownIsh
      ? [fallbackGrownIsh, ...normalizedEvents].slice(0, eventLimit * 3)
      : normalizedEvents;
  const featuredEvents = events.filter((event) => event.is_featured).slice(0, 1);

  const rawDirectory: DirectoryPayload =
    directoryResult.status === "fulfilled" ? directoryResult.value : { entities: [], team: [] };
  if (directoryResult.status === "rejected") {
    warnings.push("The contact directory is temporarily unavailable.");
  }

  const excludedEventRows = allEntityRows.filter(isEventDirectoryEntity);
  const rawExcludedEventNames = rawDirectory.entities
    .filter((entry) => isRawDirectoryEvent(entry, findDirectoryEntity(entry, allEntityRows)))
    .map((entry) => String(decode(entry.name) || ""))
    .filter(Boolean);
  const excludedEventNames = Array.from(
    new Set([
      ...excludedEventRows.map((row) => String(decode(row.name) || "")).filter(Boolean),
      ...rawExcludedEventNames,
      ...STATIC_EVENT_DIRECTORY_NAMES,
    ]),
  );
  const allowedEntityRows = allEntityRows.filter((row) => !isEventDirectoryEntity(row));
  const entityLogos = Object.fromEntries(
    allowedEntityRows.map((row) => [String(decode(row.name) || row.name), bestLogo(row)]),
  );

  const directoryEntities = (rawDirectory.entities.length ? rawDirectory.entities : allowedEntityRows)
    .map((entry) => {
      const matched = findDirectoryEntity(entry, allEntityRows);
      return {
        ...entry,
        name: String(decode(entry.name) || matched?.name || "Kollective Company"),
        category: decode(entry.category || matched?.category),
        website: entry.website || matched?.website_url || null,
        logo_url: bestLogo(matched),
        slug: matched?.slug || null,
      };
    })
    .filter((entry) => !isRawDirectoryEvent(entry, findDirectoryEntity(entry, allEntityRows)))
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));

  const team = rawDirectory.team
    .map((entry) => {
      const brand = decode(entry.brand || entry.category);
      const brandEntity = findEntity(brand, allowedEntityRows);
      return {
        ...entry,
        name: String(decode(entry.name || entry.full_name) || "Kollective Team Member"),
        full_name: decode(entry.full_name),
        role: decode(entry.role),
        brand,
        detail: decode(entry.detail),
        brand_logo_url: bestLogo(brandEntity),
      };
    })
    .sort((a, b) =>
      `${a.brand || ""} ${a.name || ""}`.localeCompare(`${b.brand || ""} ${b.name || ""}`),
    );

  const marketCounts = events.reduce<Record<string, number>>((accumulator, event) => {
    const market = String(event.market || "Other");
    accumulator[market] = (accumulator[market] || 0) + 1;
    return accumulator;
  }, {});

  return NextResponse.json(
    {
      app: config,
      experience: {
        controlEnabled: true,
        marketCounts,
        curatedCount: events.filter((event) => event.is_curated).length,
        featuredCount: featuredEvents.length,
      },
      home: {
        featured: content,
        featuredEvents,
        events,
        entities,
      },
      directory: {
        entities: directoryEntities,
        team,
        entityLogos,
        excludedEventNames,
      },
      source: "Kollective Customer Experience Control",
      generatedAt: new Date().toISOString(),
      partial: warnings.length > 0,
      warnings,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
