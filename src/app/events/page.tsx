'use client';
import { useEffect, useState } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo';
const IMG = `${SB}/storage/v1/object/public/brand-graphics`;
const WEB = `${IMG}/dr_dorsey/website`;
const KHG_LOGO = `${IMG}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const ICONIC_LOGO = `${IMG}/dr_dorsey/00-brand-assets/logos/iconic-logo-gold.png`;

/* ═══ SPONSOR LOGOS ═══ */
const SPONSORS = [
  { name:'Hurt 911', src:`${IMG}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`, url:null },
  { name:'Pronto Energy', src:`${IMG}/pronto_energy/logos/pronto-logo.png`, url:'https://pronto-energy-website.vercel.app' },
  { name:'Infinity Water', src:`${IMG}/infinity_water/website/gold.jpg`, url:'https://infinity-water.vercel.app' },
  { name:'STUSH', src:null, text:'STUSH', url:'https://stushusa.myshopify.com' },
];

/* ═══ BRAND LOGOS FOR MARQUEE ═══ */
const BRAND_LOGOS = [
  { name:'NOIR', src:`${IMG}/noir_event/01_logos/NOIR_LOGO.png` },
  { name:'Taste of Art', src:`${IMG}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png` },
  { name:'REMIX', src:`${IMG}/remix_event/01_logos/REMIX_LOGO.png` },
  { name:'Gangsta Gospel', src:`${IMG}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png` },
  { name:'WRST BHVR', src:`${IMG}/wrst_bhvr_event/03_event_flyers/WRST_generic_logo.png` },
  { name:'HugLife', src:`${IMG}/huglife_events/00-brand-assets/logos/huglife-logo-buddha-black.png` },
  { name:'Casper', src:`${IMG}/casper_group/logos/casper-white.png` },
  { name:'Forever Futbol', src:`${IMG}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png` },
  { name:'Good Times', src:`${IMG}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png` },
  { name:'Pronto', src:`${IMG}/pronto_energy/logos/pronto-logo.png` },
];

/* ═══ EVENT FLYERS for display ═══ */
const FLYERS = [
  { src:`${IMG}/noir_event/03_event_flyers/NOIR_NEWS.png`, brand:'NOIR' },
  { src:`${IMG}/taste_of_art/03_event_flyers/TASTE_MAIN2.JPEG`, brand:'Taste of Art' },
  { src:`${IMG}/remix_event/03-event-flyers/remix-dj-dates-cities.png`, brand:'REMIX' },
  { src:`${IMG}/gangsta_gospel/03_event_flyers/GANGSTA_DATE.png`, brand:'Gangsta Gospel' },
];

/* ═══ LIFESTYLE IMAGES ═══ */
const LIFESTYLE = [
  `${WEB}/hero-bg.jpg`, `${WEB}/thesis-bg.jpg`, `${WEB}/luxury-venue.jpg`,
  `${WEB}/penthouse-skyline.jpg`, `${WEB}/garden-district.jpg`, `${WEB}/rooftop-lounge.jpg`, `${WEB}/atl-street.jpg`,
];

const MAGA_HEROES = [
  'https://makeatlantagreatagain.myshopify.com/cdn/shop/files/maga-hero-9165678379258.jpg?v=1774594731&width=1600',
  'https://makeatlantagreatagain.myshopify.com/cdn/shop/files/maga-hero-9165644955898.jpg?v=1774594738&width=1600',
  'https://makeatlantagreatagain.myshopify.com/cdn/shop/files/maga-hero-9165660029178.jpg?v=1774594724&width=1600',
];

type DorseyEvent = {
  id:string; title:string; event_type:string; brand_key:string|null;
  venue_name:string|null; venue_address:string|null; city:string;
  event_date:string|null; recurring_day:string|null; start_time:string|null;
  description:string|null; cover_image:string|null; logo_url:string|null;
  website_url:string|null; is_featured:boolean; sort_order:number;
};

type FilterTab = 'all'|'event_brand'|'restaurant_rsvp'|'table_service';

const C = {
  gold:'#C8A96E', goldBright:'#D4BC8A', goldDim:'rgba(200,169,110,0.3)',
  base:'#060607', elev:'#0C0C0E', surf:'#111114',
  light:'#F5F0E8', lm:'rgba(245,240,232,0.6)', ld:'rgba(245,240,232,0.25)',
  lg:'rgba(245,240,232,0.08)', red:'#C82424',
};

export default function EventsPage() {
  const [events, setEvents] = useState<DorseyEvent[]>([]);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState<DorseyEvent|null>(null);
  const [form, setForm] = useState({ name:'', email:'', phone:'', party_size:2, special_requests:'' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch(`${SB}/rest/v1/dorsey_events?is_active=eq.true&order=sort_order.asc`, {
      headers: { apikey:ANON, Authorization:`Bearer ${ANON}` }
    }).then(r => r.json()).then(d => { setEvents(d||[]); setLoading(false); }).catch(() => setLoading(false));
    const fn = () => setScrolled(window.scrollY>60);
    window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn);
  }, []);

  const filtered = filter==='all' ? events : events.filter(e => e.event_type===filter);

  const submitRsvp = async () => {
    if (!rsvpOpen || !form.name) return;
    setSubmitting(true);
    try {
      await fetch(`${SB}/rest/v1/dorsey_event_rsvps`, {
        method:'POST', headers:{ apikey:ANON, Authorization:`Bearer ${ANON}`, 'Content-Type':'application/json', Prefer:'return=minimal' },
        body: JSON.stringify({ event_id:rsvpOpen.id, event_title:rsvpOpen.title, name:form.name, email:form.email, phone:form.phone, party_size:form.party_size, special_requests:form.special_requests, booking_type:rsvpOpen.event_type==='table_service'?'table_service':'rsvp' }),
      });
      setSubmitted(true);
      setTimeout(() => { setRsvpOpen(null); setSubmitted(false); setForm({name:'',email:'',phone:'',party_size:2,special_requests:''}); }, 2500);
    } catch {} setSubmitting(false);
  };

  return (
    <>
      {/* NAV */}
      <nav style={{ position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'20px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'all 0.4s',...(scrolled?{background:'rgba(6,6,7,0.92)',backdropFilter:'blur(24px)'}:{}) }}>
        <a href="/" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:C.light }}>
          <div style={{ width:40,height:40,border:`1px solid ${C.goldDim}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <img src={KHG_LOGO} alt="KHG" style={{ width:24,height:24,objectFit:'contain' }} />
          </div>
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.3em',textTransform:'uppercase',color:C.lm }}>Dr. Dorsey</span>
        </a>
        <div className="ev-nav-links" style={{ display:'flex',gap:32,alignItems:'center' }}>
          <a href="/" style={{ fontSize:11,color:C.lm,textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase',fontWeight:400 }}>Home</a>
          <a href="/events" style={{ fontSize:11,color:C.gold,textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase',fontWeight:400,borderBottom:`1px solid ${C.gold}`,paddingBottom:2 }}>Events</a>
          <a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.base,background:C.gold,padding:'10px 20px',textDecoration:'none' }}>@dolodorsey</a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight:'70vh',position:'relative',overflow:'hidden',display:'flex',alignItems:'flex-end',padding:'0 clamp(20px,4vw,80px) clamp(48px,8vh,80px)' }}>
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%' }}>
          <img src={MAGA_HEROES[0]} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.18 }} />
          <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(6,6,7,0.5) 0%,rgba(6,6,7,0.15) 40%,rgba(6,6,7,0.7) 80%,#060607 100%)' }} />
        </div>
        {/* Big floating KHG logo in hero */}
        <div style={{ position:'absolute',top:'15%',right:'8%',opacity:0.04,zIndex:0 }}>
          <img src={KHG_LOGO} alt="" style={{ width:'clamp(200px,25vw,400px)',height:'auto' }} />
        </div>
        <div style={{ position:'relative',zIndex:2,maxWidth:1400,width:'100%' }}>
          <div style={{ display:'flex',alignItems:'center',gap:16,marginBottom:20 }}>
            <img src={ICONIC_LOGO} alt="ICONIC" style={{ height:28,width:'auto',opacity:0.7 }} />
            <span style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.4em',textTransform:'uppercase',color:C.red }}>Make Atlanta Great Again</span>
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(44px,9vw,130px)',fontWeight:300,lineHeight:0.92,letterSpacing:'-0.03em',marginBottom:24 }}>
            Dr. Atlanta&rsquo;s<br/><em style={{ fontStyle:'italic',color:C.gold }}>Event Calendar</em>
          </h1>
          <p style={{ fontSize:'clamp(14px,1.3vw,18px)',color:C.lm,maxWidth:520,lineHeight:1.7 }}>
            Every event. Every table. Every reservation. The MAGA campaign — elevating Atlanta&rsquo;s nightlife, dining, and culture. RSVP directly through us.
          </p>
          <a href="#events-grid" style={{ display:'inline-block',marginTop:32,fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:C.base,background:C.gold,padding:'14px 36px',textDecoration:'none',transition:'all 0.3s' }}>Browse Events ↓</a>
        </div>
      </section>

      {/* ═══ SPONSOR BAR ═══ */}
      <div style={{ padding:'20px clamp(20px,4vw,80px)',borderTop:`1px solid ${C.lg}`,borderBottom:`1px solid ${C.lg}`,background:C.elev }}>
        <div style={{ maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',gap:'clamp(24px,4vw,64px)',flexWrap:'wrap' }}>
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:C.ld }}>Sponsored by</span>
          {SPONSORS.map(s => (
            <a key={s.name} href={s.url||'#'} target={s.url?'_blank':undefined} rel="noopener noreferrer"
              style={{ opacity:0.5,transition:'opacity 0.3s',display:'flex',alignItems:'center',gap:8 }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.9'} onMouseLeave={e => e.currentTarget.style.opacity='0.5'}>
              {s.src ? <img src={s.src} alt={s.name} style={{ height:'clamp(28px,3.5vw,44px)',width:'auto',objectFit:'contain',filter:'brightness(1.5)' }} />
                : <span style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2.5vw,28px)',fontWeight:400,color:C.light,letterSpacing:'0.1em' }}>{s.text}</span>}
            </a>
          ))}
        </div>
      </div>

      {/* ═══ FLYER GALLERY — scrolling strip of event flyers ═══ */}
      <div style={{ overflow:'hidden',borderBottom:`1px solid ${C.lg}` }}>
        <div className="flyer-scroll" style={{ display:'flex',gap:0,animation:'flyerScroll 25s linear infinite',width:'max-content' }}>
          {[...FLYERS,...FLYERS,...FLYERS].map((f,i) => (
            <div key={i} style={{ width:'clamp(200px,20vw,320px)',height:'clamp(120px,12vw,200px)',overflow:'hidden',flexShrink:0 }}>
              <img src={f.src} alt={f.brand} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.5,transition:'opacity 0.4s' }}
                onMouseEnter={e => e.currentTarget.style.opacity='0.85'} onMouseLeave={e => e.currentTarget.style.opacity='0.5'} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ LOGO MARQUEE ═══ */}
      <div style={{ padding:'28px 0',overflow:'hidden',borderBottom:`1px solid ${C.lg}` }}>
        <div style={{ display:'flex',gap:48,animation:'mScroll 30s linear infinite',width:'max-content' }}>
          {[...BRAND_LOGOS,...BRAND_LOGOS].map((l,i) => (
            <div key={i} style={{ display:'flex',alignItems:'center',gap:12,flexShrink:0,opacity:0.35 }}>
              <img src={l.src} alt={l.name} style={{ height:'clamp(24px,3vw,36px)',width:'auto',objectFit:'contain',filter:'brightness(1.5)' }} />
              <span style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(14px,1.8vw,24px)',fontWeight:300,color:C.ld,whiteSpace:'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FILTER TABS ═══ */}
      <div id="events-grid" style={{ padding:'40px clamp(20px,4vw,80px) 24px',maxWidth:1400,margin:'0 auto' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:8 }}>
          <div className="filter-tabs" style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
            {(['all','event_brand','restaurant_rsvp','table_service'] as FilterTab[]).map(key => (
              <button key={key} onClick={() => setFilter(key)} style={{
                fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',
                padding:'10px 24px',border:`1px solid ${filter===key?C.gold:C.lg}`,
                background:filter===key?C.gold:'transparent',color:filter===key?C.base:C.ld,
                cursor:'pointer',transition:'all 0.3s'
              }}>{{ all:'All', event_brand:'Events', restaurant_rsvp:'Dining', table_service:'Tables' }[key]}</button>
            ))}
          </div>
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:9,color:C.ld,letterSpacing:'0.15em' }}>{filtered.length} {filtered.length===1?'listing':'listings'}</span>
        </div>
      </div>

      {/* ═══ EVENTS GRID ═══ */}
      <div style={{ padding:'0 clamp(20px,4vw,80px) 64px',maxWidth:1400,margin:'0 auto' }}>
        {loading ? (
          <div style={{ textAlign:'center',padding:96,color:C.ld,fontFamily:'DM Mono,monospace' }}>
            <img src={KHG_LOGO} alt="" style={{ width:40,height:40,margin:'0 auto 16px',opacity:0.3,animation:'spin 2s linear infinite' }} />
            Loading...
          </div>
        ) : (
          <div className="events-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:C.lg }}>
            {filtered.map(ev => (
              <div key={ev.id} className={ev.is_featured?'ev-featured':''} style={{
                background:C.elev,position:'relative',overflow:'hidden',
                transition:'background 0.4s',cursor:'pointer',
                ...(ev.is_featured ? { gridColumn:'span 2' } : {})
              }}
                onMouseEnter={e => e.currentTarget.style.background=C.surf}
                onMouseLeave={e => e.currentTarget.style.background=C.elev}
                onClick={() => {
                  if (ev.event_type==='event_brand' && ev.website_url) window.open(ev.website_url,'_blank');
                  else setRsvpOpen(ev);
                }}>
                {/* Cover / Logo area */}
                {ev.cover_image ? (
                  <div style={{ height:ev.is_featured?300:200,overflow:'hidden',position:'relative' }}>
                    <img src={ev.cover_image} alt={ev.title} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.65,transition:'transform 6s ease,opacity 0.4s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.opacity='0.85'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.opacity='0.65'; }} />
                    {ev.logo_url && (
                      <div style={{ position:'absolute',top:16,left:16 }}>
                        <img src={ev.logo_url} alt="" style={{ height:32,width:'auto',objectFit:'contain',filter:'brightness(1.5) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ height:ev.is_featured?220:140,background:`linear-gradient(135deg,${C.surf},${C.elev})`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative' }}>
                    {ev.logo_url ? (
                      <img src={ev.logo_url} alt="" style={{ height:'clamp(40px,5vw,64px)',width:'auto',objectFit:'contain',opacity:0.3,filter:'brightness(1.5)' }} />
                    ) : (
                      <img src={KHG_LOGO} alt="" style={{ height:40,width:40,objectFit:'contain',opacity:0.1 }} />
                    )}
                    {/* Subtle venue name overlay */}
                    {ev.venue_name && (
                      <span style={{ position:'absolute',bottom:12,right:16,fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:300,color:C.lg,letterSpacing:'-0.02em' }}>{ev.venue_name}</span>
                    )}
                  </div>
                )}

                <div style={{ padding:'20px 24px 24px' }}>
                  {/* Type + day badges */}
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:8,flexWrap:'wrap' }}>
                    <span style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:ev.event_type==='event_brand'?C.gold:ev.event_type==='table_service'?'#4A9FD5':C.red,border:`1px solid ${ev.event_type==='event_brand'?C.goldDim:ev.event_type==='table_service'?'rgba(74,159,213,0.3)':'rgba(200,36,36,0.3)'}`,padding:'3px 8px' }}>
                      {ev.event_type==='event_brand'?'Event':ev.event_type==='restaurant_rsvp'?'Restaurant':'Table Service'}
                    </span>
                    {ev.recurring_day && <span style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.15em',color:C.ld }}>{ev.recurring_day}s</span>}
                    {ev.start_time && <span style={{ fontFamily:'DM Mono,monospace',fontSize:8,color:C.ld }}>· {ev.start_time.slice(0,5)}</span>}
                  </div>

                  <h3 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(22px,2.8vw,36px)',fontWeight:400,marginBottom:4 }}>{ev.title}</h3>
                  {ev.venue_name && <div style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.15em',color:C.ld,marginBottom:8 }}>{ev.venue_name} · {ev.city}</div>}
                  {ev.description && <p style={{ fontSize:13,color:C.lm,lineHeight:1.5,marginBottom:16,maxWidth:400 }}>{ev.description}</p>}

                  {/* CTA */}
                  <div style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',
                    color:ev.event_type==='event_brand'?C.gold:C.light,
                    padding:'10px 20px',border:`1px solid ${ev.event_type==='event_brand'?C.goldDim:C.lg}`,
                    display:'inline-block',transition:'all 0.3s' }}>
                    {ev.event_type==='event_brand'?'Visit Site →':ev.event_type==='table_service'?'Reserve Table':'RSVP Now'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ LIFESTYLE IMAGE BAND ═══ */}
      <div className="life-band" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderTop:`1px solid ${C.lg}`,borderBottom:`1px solid ${C.lg}` }}>
        {LIFESTYLE.slice(0,4).map((src,i) => (
          <div key={i} style={{ height:'clamp(120px,15vw,220px)',overflow:'hidden',position:'relative' }}>
            <img src={src} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.35,transition:'opacity 0.6s,transform 6s ease' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='0.65'; e.currentTarget.style.transform='scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity='0.35'; e.currentTarget.style.transform='scale(1)'; }} />
          </div>
        ))}
      </div>

      {/* ═══ MAGA CAMPAIGN BANNER ═══ */}
      <div style={{ padding:'64px clamp(20px,4vw,80px)',textAlign:'center',position:'relative',overflow:'hidden' }}>
        {/* Background logo watermark */}
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',opacity:0.03 }}>
          <img src={KHG_LOGO} alt="" style={{ width:300,height:300,objectFit:'contain' }} />
        </div>
        <div style={{ position:'relative' }}>
          <div style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.4em',textTransform:'uppercase',color:C.red,marginBottom:12 }}>The MAGA Campaign</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,5vw,56px)',fontWeight:300,marginBottom:16 }}>Make Atlanta <em style={{ fontStyle:'italic',color:C.gold }}>Great Again.</em></h2>
          <p style={{ fontSize:14,color:C.lm,maxWidth:500,margin:'0 auto',lineHeight:1.7 }}>Every event on this page is part of Dr. Atlanta&rsquo;s mission to elevate the city&rsquo;s nightlife, dining, and culture.</p>
          {/* Sponsor logos in MAGA section */}
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:40,marginTop:32,flexWrap:'wrap' }}>
            {SPONSORS.map(s => (
              <div key={s.name} style={{ opacity:0.3,display:'flex',alignItems:'center',gap:8 }}>
                {s.src ? <img src={s.src} alt={s.name} style={{ height:28,width:'auto',objectFit:'contain',filter:'brightness(1.3)' }} />
                  : <span style={{ fontFamily:'Cormorant Garamond,serif',fontSize:20,color:C.light }}>{s.text}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SECOND FLYER GALLERY ═══ */}
      <div style={{ overflow:'hidden',borderTop:`1px solid ${C.lg}`,borderBottom:`1px solid ${C.lg}` }}>
        <div style={{ display:'flex',gap:0,animation:'flyerScrollReverse 20s linear infinite',width:'max-content' }}>
          {[...LIFESTYLE,...LIFESTYLE].map((src,i) => (
            <div key={i} style={{ width:'clamp(250px,22vw,380px)',height:'clamp(100px,10vw,160px)',overflow:'hidden',flexShrink:0 }}>
              <img src={src} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.3 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding:'48px clamp(20px,4vw,80px)',borderTop:`1px solid ${C.lg}` }}>
        <div style={{ maxWidth:1400,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
          <div style={{ display:'flex',alignItems:'center',gap:16 }}>
            <img src={KHG_LOGO} alt="KHG" style={{ width:28,height:28,objectFit:'contain',opacity:0.4 }} />
            <span style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',color:C.ld }}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</span>
          </div>
          <div style={{ display:'flex',gap:24,alignItems:'center' }}>
            <a href="/" style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',color:C.gold,textDecoration:'none' }}>← Home</a>
            <a href="https://instagram.com/dolodorsey" target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Mono,monospace',fontSize:9,color:C.ld,textDecoration:'none',transition:'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color=C.gold} onMouseLeave={e => e.currentTarget.style.color=C.ld}>Instagram</a>
          </div>
        </div>
      </footer>

      {/* ═══ RSVP MODAL ═══ */}
      {rsvpOpen && (
        <div style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:9999,background:'rgba(0,0,0,0.88)',backdropFilter:'blur(16px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}
          onClick={e => { if(e.target===e.currentTarget) setRsvpOpen(null); }}>
          <div style={{ background:C.elev,border:`1px solid ${C.lg}`,maxWidth:480,width:'100%',maxHeight:'90vh',overflow:'auto',position:'relative' }}>
            <button onClick={() => setRsvpOpen(null)} style={{ position:'absolute',top:16,right:16,background:'none',border:'none',color:C.ld,fontSize:24,cursor:'pointer',zIndex:1 }}>×</button>
            
            {/* Modal header with logo */}
            <div style={{ padding:'32px 32px 0',display:'flex',alignItems:'center',gap:12 }}>
              {rsvpOpen.logo_url && <img src={rsvpOpen.logo_url} alt="" style={{ height:32,width:'auto',objectFit:'contain',opacity:0.6,filter:'brightness(1.3)' }} />}
              <div>
                <div style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:C.gold }}>
                  {rsvpOpen.event_type==='table_service'?'Reserve a Table':'RSVP'}
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:300 }}>{rsvpOpen.title}</h3>
              </div>
            </div>

            <div style={{ padding:'24px 32px 32px' }}>
              {submitted ? (
                <div style={{ textAlign:'center',padding:40 }}>
                  <img src={KHG_LOGO} alt="" style={{ width:48,height:48,margin:'0 auto 16px',opacity:0.5 }} />
                  <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:300,color:C.gold,marginBottom:8 }}>Confirmed</div>
                  <p style={{ color:C.lm,fontSize:14 }}>Your {rsvpOpen.event_type==='table_service'?'table reservation':'RSVP'} for {rsvpOpen.title} has been submitted.</p>
                </div>
              ) : (
                <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
                  {rsvpOpen.venue_name && <p style={{ fontSize:12,color:C.ld,marginBottom:4 }}>{rsvpOpen.venue_name} · {rsvpOpen.city}{rsvpOpen.recurring_day ? ` · ${rsvpOpen.recurring_day}s` : ''}</p>}
                  {[{k:'name',l:'Name *',t:'text'},{k:'email',l:'Email',t:'email'},{k:'phone',l:'Phone',t:'tel'}].map(f => (
                    <div key={f.k}>
                      <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.ld,display:'block',marginBottom:6 }}>{f.l}</label>
                      <input type={f.t} value={(form as any)[f.k]} onChange={e => setForm(p => ({...p,[f.k]:e.target.value}))}
                        style={{ width:'100%',padding:'12px 16px',background:C.surf,border:`1px solid ${C.lg}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.ld,display:'block',marginBottom:6 }}>Party Size</label>
                    <input type="number" min={1} max={20} value={form.party_size} onChange={e => setForm(p => ({...p,party_size:parseInt(e.target.value)||2}))}
                      style={{ width:100,padding:'12px 16px',background:C.surf,border:`1px solid ${C.lg}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.ld,display:'block',marginBottom:6 }}>Special Requests</label>
                    <textarea rows={3} value={form.special_requests} onChange={e => setForm(p => ({...p,special_requests:e.target.value}))}
                      style={{ width:'100%',padding:'12px 16px',background:C.surf,border:`1px solid ${C.lg}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none',resize:'vertical' }} />
                  </div>
                  <button onClick={submitRsvp} disabled={!form.name||submitting}
                    style={{ fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:C.base,background:C.gold,padding:'16px 40px',border:'none',cursor:'pointer',transition:'all 0.3s',opacity:!form.name||submitting?0.5:1,marginTop:8 }}>
                    {submitting?'Submitting...':rsvpOpen.event_type==='table_service'?'Reserve Table':'Confirm RSVP'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes flyerScroll { to{transform:translateX(-33.33%)} }
        @keyframes flyerScrollReverse { to{transform:translateX(-50%)} }
        @keyframes mScroll { to{transform:translateX(-50%)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @media(max-width:1024px){
          .events-grid{grid-template-columns:repeat(2,1fr)!important}
          .life-band{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:768px){
          .events-grid{grid-template-columns:1fr!important}
          .events-grid > div,.ev-featured{grid-column:span 1!important}
          .life-band{grid-template-columns:1fr!important}
          .ev-nav-links{gap:16px!important}
          .ev-nav-links a:first-child{display:none!important}
        }
      `}</style>
    </>
  );
}
