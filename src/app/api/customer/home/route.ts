import { NextResponse } from "next/server";
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from "@/lib/kollective-public";

export const revalidate = 300;

const headers = {
  apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}`,
};

const DEFAULT_CONFIG = {
  app_scope: "customer",
  app_name: "Kollective",
  tagline: "The best of the Kollective, all in one place.",
  city: "Atlanta",
  minimum_version: "1.0.0",
  latest_version: "1.0.0",
  maintenance_mode: false,
  maintenance_message: null,
  featured_limit: 12,
  event_limit: 16,
  config: {
    experience: "good-times-inspired",
    primaryNavigation: ["home", "events", "brands", "profile"],
  },
};

type Row = Record<string, unknown>;

async function fetchRows(table: string, params: Record<string, string>) {
  const url = new URL(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url, {
    headers,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${table} returned ${response.status}: ${detail}`);
  }

  return (await response.json()) as Row[];
}

function isCurrentlyActive(row: Row, now: Date) {
  const startsAt = typeof row.starts_at === "string" ? new Date(row.starts_at) : null;
  const endsAt = typeof row.ends_at === "string" ? new Date(row.ends_at) : null;
  return (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
}

function decodeHtml(value: unknown) {
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
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&(amp|apos|gt|lt|nbsp|quot);/g, (_, entity: string) => named[entity] ?? _)
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedCity(value: unknown) {
  const city = String(value ?? "").trim().toLowerCase();
  if (["atl", "atlanta, ga", "atlanta ga"].includes(city)) return "atlanta";
  return city;
}

function normalizeEvents(rows: Row[], preferredCity: string, limit: number) {
  const seen = new Set<string>();

  return rows
    .map((row) => {
      const eventName = String(decodeHtml(row.event_name) ?? "Event");
      const ticketPrice = String(decodeHtml(row.ticket_price) ?? "");
      const description = decodeHtml(row.description);
      const aiSummary = decodeHtml(row.ai_summary);
      const city = decodeHtml(row.city);
      const venueName = decodeHtml(row.venue_name);
      const isFree = Boolean(row.is_free) || /\bfree\b/i.test(ticketPrice);

      return {
        ...row,
        city,
        event_name: eventName,
        venue_name: venueName,
        description,
        ai_summary: aiSummary,
        ticket_price: ticketPrice || null,
        is_free: isFree,
        _preferredCity: normalizedCity(city) === preferredCity ? 1 : 0,
      };
    })
    .filter((event) => {
      const key = [event.event_name, event.event_date, event.venue_name]
        .map((value) => String(value ?? "").trim().toLowerCase())
        .join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => {
      const cityDifference = Number(b._preferredCity) - Number(a._preferredCity);
      if (cityDifference !== 0) return cityDifference;

      const dateDifference = String(a.event_date ?? "").localeCompare(String(b.event_date ?? ""));
      if (dateDifference !== 0) return dateDifference;

      return Number(b.ai_vibe_score ?? 0) - Number(a.ai_vibe_score ?? 0);
    })
    .slice(0, limit)
    .map(({ _preferredCity: _ignored, ...event }) => event);
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
  } catch (error) {
    warnings.push("Customer app configuration is using safe defaults.");
    console.error("Customer app config unavailable", error);
  }

  const featuredLimit = Number(config.featured_limit) || 12;
  const eventLimit = Number(config.event_limit) || 16;
  const preferredCity = normalizedCity(config.city || "Atlanta");
  const today = new Date().toISOString().slice(0, 10);

  const [entitiesResult, contentResult, eventsResult] = await Promise.allSettled([
    fetchRows("kollective_public_entity_directory", {
      select: "id,slug,name,category,short_description,status,status_label,current_focus,logo_url,hero_url,website_url,city_scope,access_level,featured_priority,division_slug,division_name,destinations",
      order: "current_focus.desc,featured_priority.desc,name.asc",
      limit: String(Math.max(featuredLimit, 18)),
    }),
    fetchRows("kollective_public_content", {
      is_published: "eq.true",
      select: "id,entity_id,destination_id,slug,content_type,title,summary,body,image_url,city_scope,audience,priority,starts_at,ends_at",
      order: "priority.desc,starts_at.desc",
      limit: "30",
    }),
    fetchRows("v_gt_public_events", {
      event_date: `gte.${today}`,
      select: "id,city,event_name,event_date,event_time,end_date,end_time,venue_name,venue_address,neighborhood,event_type,event_category,description,ticket_url,ticket_price,image_url,organizer,tags,vibe_tags,is_free,ai_summary,ai_vibe_score",
      order: "event_date.asc,ai_vibe_score.desc",
      limit: String(Math.max(eventLimit * 4, 64)),
    }),
  ]);

  const entities = entitiesResult.status === "fulfilled"
    ? entitiesResult.value
        .filter((entity) => !["inactive", "archived", "closed"].includes(String(entity.status ?? "").toLowerCase()))
        .slice(0, featuredLimit)
    : [];
  if (entitiesResult.status === "rejected") {
    warnings.push("Brand directory is temporarily unavailable.");
    console.error("Customer entities unavailable", entitiesResult.reason);
  }

  const now = new Date();
  const content = contentResult.status === "fulfilled"
    ? contentResult.value
        .filter((item) => isCurrentlyActive(item, now))
        .map((item) => ({
          ...item,
          title: decodeHtml(item.title),
          summary: decodeHtml(item.summary),
          body: decodeHtml(item.body),
        }))
        .slice(0, 18)
    : [];
  if (contentResult.status === "rejected") {
    warnings.push("Featured content is temporarily unavailable.");
    console.error("Customer content unavailable", contentResult.reason);
  }

  const events = eventsResult.status === "fulfilled"
    ? normalizeEvents(eventsResult.value, preferredCity, eventLimit)
    : [];
  if (eventsResult.status === "rejected") {
    warnings.push("Event discovery is temporarily unavailable.");
    console.error("Customer events unavailable", eventsResult.reason);
  }

  return NextResponse.json(
    {
      app: config,
      home: {
        featured: content,
        events,
        entities,
      },
      source: "doctordorsey.com + Kollective MCP Gateway",
      generatedAt: new Date().toISOString(),
      partial: warnings.length > 0,
      warnings,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
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
