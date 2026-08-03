import { NextResponse } from "next/server";
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from "@/lib/kollective-public";

export const revalidate = 120;
const headers = { apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}` };
const DEFAULT_CONFIG = { app_scope: "customer", app_name: "Kollective", tagline: "The best of the Kollective, all in one place.", city: "Atlanta", maintenance_mode: false, featured_limit: 12, event_limit: 16, config: { markets: ["All Markets", "Atlanta"], defaultMarket: "Atlanta", experienceControl: true } };
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
type Row = Record<string, unknown>;

async function fetchRows(table: string, params: Record<string, string>) {
  const url = new URL(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { headers, next: { revalidate: 120 } });
  if (!response.ok) throw new Error(`${table} returned ${response.status}: ${await response.text()}`);
  return (await response.json()) as Row[];
}
function decode(value: unknown) { if (typeof value !== "string") return value; const named: Record<string,string> = { amp:"&", apos:"'", gt:">", lt:"<", nbsp:" ", quot:'"' }; return value.replace(/&#(\d+);/g,(_,c:string)=>String.fromCodePoint(Number(c))).replace(/&#x([0-9a-f]+);/gi,(_,c:string)=>String.fromCodePoint(Number.parseInt(c,16))).replace(/&(amp|apos|gt|lt|nbsp|quot);/g,(_,e:string)=>named[e]??_).replace(/\s+/g," ").trim(); }
function cityKey(value: unknown) { const city=String(value??"").trim().toLowerCase(); if (["atl","atlanta, ga","atlanta ga"].includes(city)) return "atlanta"; if (["la","los angeles, ca"].includes(city)) return "los angeles"; if (["nyc","new york","new york city"].includes(city)) return "nyc"; return city; }
function displayMarket(value: unknown) { const key=cityKey(value); const labels:Record<string,string>={atlanta:"Atlanta",dc:"DC",dallas:"Dallas","los angeles":"Los Angeles",nyc:"NYC",charlotte:"Charlotte",scottsdale:"Scottsdale"}; return labels[key] || String(value??"Other"); }
function canonical(value: unknown) { return String(value??"").toLowerCase().replace(/\b20\d{2}\b/g,"").replace(/&/g," and ").replace(/\b(the|official|free|rsvp)\b/g," ").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim(); }
function active(row: Row, now: Date) { const start=typeof row.starts_at==="string"?new Date(row.starts_at):null; const end=typeof row.ends_at==="string"?new Date(row.ends_at):null; return (!start||start<=now)&&(!end||end>=now); }
function brandRank(row: Row) { return CUSTOMER_BRAND_RANK.get(String(row.slug)) ?? CUSTOMER_BRAND_ORDER.length; }
function quality(event: Row, preferred: string) { let score=Number(event.ai_vibe_score??0)+Number(event.sort_priority??0)*20; if (event.is_featured) score+=500; if (cityKey(event.market)===preferred) score+=100; if (event.image_url) score+=15; if (event.ticket_url) score+=10; if (event.ai_summary) score+=6; return score; }
function normalizeEvents(rows: Row[], overrides: Row[], preferred: string, limit: number) {
  const byId=new Map(overrides.map(row=>[String(row.event_id),row]));
  const seen=new Set<string>();
  return rows.map(row=>{
    const override=byId.get(String(row.id))||{};
    const market=override.market_override||row.city;
    return { ...row, event_date:row.event_date, event_name:String(decode(override.display_title||row.event_name)||"Event"), city:decode(row.city), market:displayMarket(market), venue_name:decode(row.venue_name), description:decode(row.description), ai_summary:decode(override.display_summary||row.ai_summary), image_url:override.display_image_url||row.image_url, ticket_price:decode(row.ticket_price)||null, is_free:Boolean(row.is_free)||/\bfree\b/i.test(String(row.ticket_price||"")), is_hidden:Boolean(override.is_hidden), is_featured:Boolean(override.is_featured), is_curated:Boolean(byId.has(String(row.id))), sort_priority:Number(override.sort_priority||0) };
  }).filter(event=>!event.is_hidden).sort((a,b)=>String(a.event_date).localeCompare(String(b.event_date))||quality(b,preferred)-quality(a,preferred)).filter(event=>{ const key=[canonical(event.event_name),event.event_date,cityKey(event.market)].join("|"); if (!canonical(event.event_name)||seen.has(key)) return false; seen.add(key); return true; }).sort((a,b)=>Number(Boolean(b.is_featured))-Number(Boolean(a.is_featured))||Number(cityKey(b.market)===preferred)-Number(cityKey(a.market)===preferred)||String(a.event_date).localeCompare(String(b.event_date))||quality(b,preferred)-quality(a,preferred)).slice(0,limit);
}

export async function GET() {
  const warnings:string[]=[]; let config:Row=DEFAULT_CONFIG;
  try { const rows=await fetchRows("kollective_customer_app_config",{app_scope:"eq.customer",select:"*",limit:"1"}); config=rows[0]??DEFAULT_CONFIG; } catch { warnings.push("Customer configuration is using safe defaults."); }
  const featuredLimit=Number(config.featured_limit)||12; const eventLimit=Number(config.event_limit)||16; const preferred=cityKey(config.city||"Atlanta"); const today=new Date().toISOString().slice(0,10);
  const [entitiesResult,contentResult,eventsResult,overridesResult]=await Promise.allSettled([
    fetchRows("kollective_public_entity_directory",{select:"id,slug,name,category,short_description,status,status_label,current_focus,logo_url,hero_url,website_url,city_scope,access_level,featured_priority,division_slug,division_name,destinations",order:"current_focus.desc,featured_priority.desc,name.asc",limit:String(Math.max(featuredLimit*4,80))}),
    fetchRows("kollective_public_content",{is_published:"eq.true",select:"id,entity_id,destination_id,slug,content_type,title,summary,body,image_url,city_scope,audience,priority,starts_at,ends_at",order:"priority.desc,starts_at.desc",limit:"30"}),
    fetchRows("v_gt_public_events",{event_date:`gte.${today}`,select:"id,city,event_name,event_date,event_time,end_date,end_time,venue_name,venue_address,neighborhood,event_type,event_category,description,ticket_url,ticket_price,image_url,organizer,tags,vibe_tags,is_free,ai_summary,ai_vibe_score",order:"event_date.asc,ai_vibe_score.desc",limit:String(Math.max(eventLimit*8,128))}),
    fetchRows("kollective_customer_event_overrides",{select:"*",limit:"500"}),
  ]);
  const entities=entitiesResult.status==="fulfilled"?entitiesResult.value.filter(e=>!["inactive","archived","closed"].includes(String(e.status??"").toLowerCase())).sort((a,b)=>brandRank(a)-brandRank(b)||Number(b.featured_priority??0)-Number(a.featured_priority??0)||String(a.name??"").localeCompare(String(b.name??""))).slice(0,Math.max(featuredLimit,CUSTOMER_BRAND_ORDER.length)):[];
  const now=new Date(); const content=contentResult.status==="fulfilled"?contentResult.value.filter(i=>active(i,now)).map(i=>({...i,title:decode(i.title),summary:decode(i.summary),body:decode(i.body)})).slice(0,18):[];
  const overrides=overridesResult.status==="fulfilled"?overridesResult.value:[]; if (overridesResult.status==="rejected") warnings.push("Operator curation is temporarily unavailable.");
  const events=eventsResult.status==="fulfilled"?normalizeEvents(eventsResult.value,overrides,preferred,eventLimit*3):[];
  const marketCounts=events.reduce<Record<string,number>>((acc,event)=>{ const market=String(event.market||"Other"); acc[market]=(acc[market]||0)+1; return acc; },{});
  return NextResponse.json({ app:config, experience:{ controlEnabled:true, marketCounts, curatedCount:events.filter(e=>e.is_curated).length, featuredCount:events.filter(e=>e.is_featured).length }, home:{featured:content,events,entities}, source:"Kollective Customer Experience Control", generatedAt:new Date().toISOString(), partial:warnings.length>0, warnings },{headers:{"Access-Control-Allow-Origin":"*","Cache-Control":"public, s-maxage=120, stale-while-revalidate=600"}});
}
export async function OPTIONS(){return new NextResponse(null,{status:204,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, OPTIONS","Access-Control-Allow-Headers":"Content-Type"}});}
