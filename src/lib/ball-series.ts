import { createClient } from '@supabase/supabase-js';
import { eventMotion } from '@/lib/event-motion';
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from '@/lib/kollective-public';

export type BallSlug =
  | 'greek-ball'
  | 'monsters-ball'
  | 'black-ball'
  | 'snow-ball'
  | 'champagne-ball'
  | 'rose-ball';

export type BallConfig = {
  slug: BallSlug;
  chapter: string;
  brandKey: string;
  name: string;
  title: string;
  dateIso: string;
  date: string;
  year: string;
  day: string;
  eyebrow: string;
  dress: string;
  accent: string;
  description: string;
  animation: (typeof eventMotion)[keyof typeof eventMotion];
};

export const BALLS: readonly BallConfig[] = [
  { slug:'greek-ball',chapter:'01',brandKey:'greek_ball',name:'Greek Ball',title:'BEAUTY & THE BEAST',dateIso:'2026-10-17T21:00:00-04:00',date:'OCT 17',year:'2026',day:'SATURDAY',eyebrow:'DIVINE NINE · HOMECOMING',dress:'FORMAL · GREEK CULTURE',accent:'#d8b04c',description:'Greek-letter culture, alumni and undergraduate community meet formal style, celebration and a premium Atlanta social experience.',animation:eventMotion.greekBall },
  { slug:'monsters-ball',chapter:'02',brandKey:'monsters_ball',name:'Monster’s Ball',title:'AFTER DARK',dateIso:'2026-10-31T20:00:00-04:00',date:'OCT 31',year:'2026',day:'SATURDAY',eyebrow:'HALLOWEEN · THEATRICAL NIGHTLIFE',dress:'COSTUME FORMAL · DARK GLAMOUR',accent:'#d4682a',description:'A Halloween gala where costume excellence meets formal nightlife — cinematic, theatrical and intentionally over the top.',animation:eventMotion.monstersBall },
  { slug:'black-ball',chapter:'03',brandKey:'black_ball',name:'Black Ball',title:'BLACK ON BLACK',dateIso:'2026-11-28T20:00:00-05:00',date:'NOV 28',year:'2026',day:'SATURDAY',eyebrow:'THANKSGIVING WEEKEND · FORMAL',dress:'ALL BLACK · NO EXCEPTIONS',accent:'#c9b27f',description:'One palette. Maximum presence. An all-black formal night built around intentional elegance, sharp silhouettes and collective visual impact.',animation:eventMotion.blackBall },
  { slug:'snow-ball',chapter:'04',brandKey:'snow_ball',name:'Snow Ball',title:'WINTER WHITE',dateIso:'2026-12-12T20:00:00-05:00',date:'DEC 12',year:'2026',day:'SATURDAY',eyebrow:'HOLIDAY · WINTER FANTASY',dress:'ALL WHITE · ELEVATED',accent:'#dceaf4',description:'A glowing winter-white world built for elevated dress, holiday energy and a grown social experience that feels transported.',animation:eventMotion.snowBall },
  { slug:'champagne-ball',chapter:'05',brandKey:'champagne_ball',name:'Champagne Ball',title:'THE TOAST',dateIso:'2027-01-02T21:00:00-05:00',date:'JAN 02',year:'2027',day:'SATURDAY',eyebrow:'NEW YEAR · BLACK TIE',dress:'BLACK TIE · CHAMPAGNE TONES',accent:'#e1c57a',description:'The first toast of the year — black-tie energy, champagne hospitality and a polished chapter designed to begin 2027 correctly.',animation:eventMotion.champagneBall },
  { slug:'rose-ball',chapter:'06',brandKey:'rose_ball',name:'Rose Ball',title:'LOVE IN COLOR',dateIso:'2027-02-13T21:00:00-05:00',date:'FEB 13',year:'2027',day:'SATURDAY',eyebrow:'VALENTINE’S WEEKEND · ROMANCE',dress:'SHADES OF RED · FORMAL',accent:'#e2495b',description:'A Valentine’s-weekend world in shades of red — romance, style, dramatic rooms and elevated nightlife without the cliché.',animation:eventMotion.roseBall },
] as const;

export type TicketTier = { tier_key:string;tier_label:string;display_order:number;price_cents:number;capacity:number|null;is_vip:boolean;is_section:boolean;section_capacity:number|null;bottles_included:number;description:string|null; };
export type BallLiveState = { ticketUrl:string|null;trackingUrl:string|null;eventbriteEventId:string|null;venueName:string|null;venueAddress:string|null;city:string;eventTime:string|null;onSale:boolean;soldOut:boolean;statusLabel:string;tiers:TicketTier[];admissionTiers:TicketTier[];sectionTiers:TicketTier[]; };

const supabase = createClient(KOLLECTIVE_SUPABASE_URL,KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,{ auth:{persistSession:false,autoRefreshToken:false} });

export function getBallConfig(slug:string):BallConfig|undefined{return BALLS.find((ball)=>ball.slug===slug);}
export function formatPrice(priceCents:number):string{return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:priceCents%100===0?0:2}).format(priceCents/100);}

export async function getBallLiveState(config:BallConfig):Promise<BallLiveState>{
  const [{data:eventbrite},{data:settings},{data:tierRows}] = await Promise.all([
    supabase.from('eventbrite_events').select('eventbrite_url,eventbrite_event_id,event_date,city,venue_name,venue_address,event_time,is_active,khg_tracking_url').eq('brand_key',config.brandKey).eq('is_active',true).order('event_date',{ascending:false}).limit(1).maybeSingle(),
    supabase.from('event_site_settings').select('status,venue_name,venue_address,city,ticket_url,doors_time,is_active,metadata').eq('event_slug',config.slug).eq('is_active',true).order('updated_at',{ascending:false}).limit(1).maybeSingle(),
    supabase.from('ball_series_public_ticket_tiers').select('tier_key,tier_label,display_order,price_cents,capacity,is_vip,is_section,section_capacity,bottles_included,description').eq('event_slug',config.slug).order('display_order',{ascending:true}),
  ]);

  const tiers=(tierRows||[]) as TicketTier[];
  const settingsStatus=String(settings?.status||'').toLowerCase();
  const soldOut=['sold_out','sold out','closed'].includes(settingsStatus);
  const ticketUrl=settings?.ticket_url||eventbrite?.eventbrite_url||null;
  const trackingUrl=eventbrite?.khg_tracking_url||ticketUrl;
  const onSale=Boolean(ticketUrl&&eventbrite?.is_active!==false&&!soldOut);
  return { ticketUrl,trackingUrl,eventbriteEventId:eventbrite?.eventbrite_event_id||null,venueName:settings?.venue_name||eventbrite?.venue_name||null,venueAddress:settings?.venue_address||eventbrite?.venue_address||null,city:settings?.city||eventbrite?.city||'Atlanta',eventTime:settings?.doors_time||eventbrite?.event_time||null,onSale,soldOut,statusLabel:soldOut?'SOLD OUT':onSale?'TICKETS LIVE':'COMING SOON',tiers,admissionTiers:tiers.filter((tier)=>!tier.is_section),sectionTiers:tiers.filter((tier)=>tier.is_section) };
}
