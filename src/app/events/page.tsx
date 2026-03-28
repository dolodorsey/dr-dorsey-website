'use client';
import { useEffect, useState, useRef, useCallback } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1ODQ4NjQsImV4cCI6MjA4NTE2MDg2NH0.qmnWB4aWdb7U8Iod9Hv8PQAOJO3AG0vYEGnPS--kfAo';
const IMG = `${SB}/storage/v1/object/public/brand-graphics`;
const KHG_LOGO = `${IMG}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;
const MAGA_HERO = 'https://makeatlantagreatagain.myshopify.com/cdn/shop/files/maga-hero-9165678379258.jpg?v=1774594731&width=1600';

type DorseyEvent = {
  id: string; title: string; event_type: string; brand_key: string | null;
  venue_name: string | null; venue_address: string | null; city: string;
  event_date: string | null; recurring_day: string | null; start_time: string | null;
  description: string | null; cover_image: string | null; logo_url: string | null;
  website_url: string | null; is_featured: boolean; is_maga_campaign: boolean;
  sort_order: number;
};

type FilterTab = 'all' | 'event_brand' | 'restaurant_rsvp' | 'table_service';

const FILTER_LABELS: Record<FilterTab, string> = {
  all: 'All',
  event_brand: 'Events',
  restaurant_rsvp: 'Dining',
  table_service: 'Tables',
};

const SPONSOR_LOGOS = [
  { name: 'Pronto Energy', src: `${IMG}/pronto_energy/logos/pronto-logo.png`, url: 'https://pronto-energy-website.vercel.app' },
  { name: 'Infinity Water', src: `${IMG}/infinity_water/website/all-bottles.jpg`, url: 'https://infinity-water.vercel.app' },
  { name: 'STUSH', src: 'https://stushusa.myshopify.com/cdn/shop/files/Header.jpg?v=1766834321&width=200', url: 'https://stushusa.myshopify.com' },
];

export default function EventsPage() {
  const [events, setEvents] = useState<DorseyEvent[]>([]);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState<DorseyEvent | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', party_size: 2, special_requests: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch(`${SB}/rest/v1/dorsey_events?is_active=eq.true&order=sort_order.asc`, {
      headers: { apikey: ANON, Authorization: `Bearer ${ANON}` }
    }).then(r => r.json()).then(data => { setEvents(data || []); setLoading(false); }).catch(() => setLoading(false));

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.event_type === filter);
  const featured = events.filter(e => e.is_featured);

  const submitRsvp = async () => {
    if (!rsvpOpen || !formData.name) return;
    setSubmitting(true);
    try {
      await fetch(`${SB}/rest/v1/dorsey_event_rsvps`, {
        method: 'POST',
        headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          event_id: rsvpOpen.id, event_title: rsvpOpen.title,
          name: formData.name, email: formData.email, phone: formData.phone,
          party_size: formData.party_size, special_requests: formData.special_requests,
          booking_type: rsvpOpen.event_type === 'table_service' ? 'table_service' : rsvpOpen.event_type === 'restaurant_rsvp' ? 'rsvp' : 'general',
        }),
      });
      setSubmitted(true);
      setTimeout(() => { setRsvpOpen(null); setSubmitted(false); setFormData({ name:'',email:'',phone:'',party_size:2,special_requests:'' }); }, 2500);
    } catch { }
    setSubmitting(false);
  };

  const C = {
    gold: '#C8A96E', goldBright: '#D4BC8A', goldDim: 'rgba(200,169,110,0.3)',
    base: '#060607', elevated: '#0C0C0E', surface: '#111114',
    light: '#F5F0E8', lightMuted: 'rgba(245,240,232,0.6)', lightDim: 'rgba(245,240,232,0.25)', lightGhost: 'rgba(245,240,232,0.08)',
    red: '#C82424', redDim: 'rgba(200,36,36,0.2)',
  };

  return (
    <>
      {/* NAV */}
      <nav style={{ position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'24px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(6,6,7,0.88)',backdropFilter:'blur(24px)'}:{}) }}>
        <a href="/" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:C.light }}>
          <div style={{ width:36,height:36,border:`1px solid ${C.goldDim}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <img src={KHG_LOGO} alt="KHG" style={{ width:20,height:20,objectFit:'contain' }} />
          </div>
          <span style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.3em',textTransform:'uppercase',color:C.lightMuted }}>Dr. Dorsey</span>
        </a>
        <div style={{ display:'flex',gap:32,alignItems:'center' }}>
          <a href="/" style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(10px,0.85vw,12px)',color:C.lightMuted,textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase' }}>Home</a>
          <a href="/events" style={{ fontFamily:'DM Sans,sans-serif',fontSize:'clamp(10px,0.85vw,12px)',color:C.gold,textDecoration:'none',letterSpacing:'0.15em',textTransform:'uppercase' }}>Events</a>
          <a href="/#connect" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',textTransform:'uppercase',color:C.base,background:C.gold,padding:'10px 24px',textDecoration:'none' }}>Connect</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'60vh',position:'relative',overflow:'hidden',display:'flex',alignItems:'flex-end',padding:'0 clamp(20px,4vw,80px) 64px' }}>
        <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0 }}>
          <img src={MAGA_HERO} alt="" style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.2,filter:'contrast(1.1)' }} />
          <div style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(180deg,rgba(6,6,7,0.4) 0%,rgba(6,6,7,0.2) 40%,rgba(6,6,7,0.7) 80%,#060607 100%)' }} />
        </div>
        <div style={{ position:'relative',zIndex:2,maxWidth:1400,width:'100%' }}>
          <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:C.red,marginBottom:16 }}>Make Atlanta Great Again</div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,8vw,120px)',fontWeight:300,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:24 }}>
            Dr. Atlanta&rsquo;s<br /><em style={{ fontStyle:'italic',color:C.gold }}>Event Calendar</em>
          </h1>
          <p style={{ fontSize:'clamp(14px,1.3vw,18px)',color:C.lightMuted,maxWidth:500,lineHeight:1.7 }}>
            Every event. Every table. Every reservation. One empire, one calendar. RSVP directly through us.
          </p>
        </div>
      </section>

      {/* SPONSOR BAR */}
      <div style={{ padding:'24px clamp(20px,4vw,80px)',borderTop:`1px solid ${C.lightGhost}`,borderBottom:`1px solid ${C.lightGhost}`,display:'flex',alignItems:'center',justifyContent:'center',gap:48,flexWrap:'wrap' }}>
        <span style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:C.lightDim }}>Sponsored by</span>
        {SPONSOR_LOGOS.map(s => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ opacity:0.5,transition:'opacity 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>
            <img src={s.src} alt={s.name} style={{ height:28,width:'auto',objectFit:'contain',filter:'brightness(1.3)' }} />
          </a>
        ))}
      </div>

      {/* FILTER TABS */}
      <div style={{ padding:'32px clamp(20px,4vw,80px)',maxWidth:1400,margin:'0 auto' }}>
        <div className="filter-tabs" style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
          {(Object.keys(FILTER_LABELS) as FilterTab[]).map(key => (
            <button key={key} onClick={() => setFilter(key)} style={{
              fontFamily:'DM Mono,monospace',fontSize:'clamp(9px,0.8vw,11px)',letterSpacing:'0.2em',textTransform:'uppercase',
              padding:'10px 24px',border:`1px solid ${filter===key?C.gold:C.lightGhost}`,
              background:filter===key?C.gold:'transparent',color:filter===key?C.base:C.lightDim,
              cursor:'pointer',transition:'all 0.3s'
            }}>{FILTER_LABELS[key]}</button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      <div style={{ padding:'0 clamp(20px,4vw,80px) 96px',maxWidth:1400,margin:'0 auto' }}>
        {loading ? (
          <div style={{ textAlign:'center',padding:96,color:C.lightDim,fontFamily:'DM Mono,monospace',fontSize:12,letterSpacing:'0.2em' }}>Loading events...</div>
        ) : (
          <div className="events-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:C.lightGhost }}>
            {filtered.map(ev => (
              <div key={ev.id} style={{
                background:C.elevated,padding:0,position:'relative',overflow:'hidden',
                transition:'background 0.4s',cursor:'pointer',
                ...(ev.is_featured ? { gridColumn:'span 2' } : {})
              }}
                onMouseEnter={e => e.currentTarget.style.background = C.surface}
                onMouseLeave={e => e.currentTarget.style.background = C.elevated}
                onClick={() => {
                  if (ev.event_type === 'event_brand' && ev.website_url) window.open(ev.website_url, '_blank');
                  else setRsvpOpen(ev);
                }}>
                {/* Cover image */}
                {ev.cover_image && (
                  <div style={{ height:ev.is_featured?280:180,overflow:'hidden' }}>
                    <img src={ev.cover_image} alt={ev.title} style={{ width:'100%',height:'100%',objectFit:'cover',opacity:0.6,transition:'transform 4s ease' }} />
                  </div>
                )}
                {!ev.cover_image && (
                  <div style={{ height:ev.is_featured?200:120,background:`linear-gradient(135deg,${C.surface},${C.elevated})`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                    {ev.logo_url && <img src={ev.logo_url} alt="" style={{ height:48,width:'auto',objectFit:'contain',opacity:0.4,filter:'brightness(1.5)' }} />}
                  </div>
                )}
                <div style={{ padding:'24px 28px 28px' }}>
                  {/* Type badge */}
                  <div style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.2em',textTransform:'uppercase',color:ev.event_type==='event_brand'?C.gold:ev.event_type==='table_service'?'#4A9FD5':C.red,marginBottom:8 }}>
                    {ev.event_type === 'event_brand' ? 'Event Brand' : ev.event_type === 'restaurant_rsvp' ? 'Restaurant' : 'Table Service'}
                    {ev.recurring_day && ` · ${ev.recurring_day}s`}
                  </div>
                  <h3 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(20px,2.5vw,32px)',fontWeight:400,marginBottom:6 }}>{ev.title}</h3>
                  {ev.venue_name && <div style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.15em',color:C.lightDim,marginBottom:8 }}>{ev.venue_name} · {ev.city}</div>}
                  {ev.description && <p style={{ fontSize:13,color:C.lightMuted,lineHeight:1.5,marginBottom:16 }}>{ev.description}</p>}
                  {/* CTA */}
                  <div style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:ev.event_type==='event_brand'?C.gold:C.light,padding:'8px 16px',border:`1px solid ${ev.event_type==='event_brand'?C.goldDim:C.lightGhost}`,display:'inline-block',transition:'all 0.3s' }}>
                    {ev.event_type === 'event_brand' ? 'Visit Site →' : ev.event_type === 'table_service' ? 'Reserve Table' : 'RSVP Now'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAGA BANNER */}
      <div style={{ padding:'48px clamp(20px,4vw,80px)',borderTop:`1px solid ${C.lightGhost}`,borderBottom:`1px solid ${C.lightGhost}`,textAlign:'center' }}>
        <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.4em',textTransform:'uppercase',color:C.red,marginBottom:12 }}>The MAGA Campaign</div>
        <h2 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(24px,4vw,48px)',fontWeight:300 }}>Make Atlanta Great Again.</h2>
        <p style={{ fontSize:14,color:C.lightMuted,maxWidth:500,margin:'16px auto 0',lineHeight:1.7 }}>Every event on this page is part of Dr. Atlanta&rsquo;s mission to elevate the city&rsquo;s nightlife, dining, and culture.</p>
      </div>

      {/* FOOTER */}
      <footer style={{ padding:'48px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16 }}>
        <div style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',color:C.lightDim }}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
        <a href="/" style={{ fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.2em',color:C.gold,textDecoration:'none' }}>← Back to Home</a>
      </footer>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:9999,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setRsvpOpen(null); }}>
          <div style={{ background:C.elevated,border:`1px solid ${C.lightGhost}`,maxWidth:480,width:'100%',padding:40,position:'relative' }}>
            <button onClick={() => setRsvpOpen(null)} style={{ position:'absolute',top:16,right:16,background:'none',border:'none',color:C.lightDim,fontSize:20,cursor:'pointer' }}>×</button>
            
            {submitted ? (
              <div style={{ textAlign:'center',padding:40 }}>
                <div style={{ fontFamily:'Cormorant Garamond,serif',fontSize:32,fontWeight:300,color:C.gold,marginBottom:12 }}>Confirmed</div>
                <p style={{ color:C.lightMuted,fontSize:14 }}>Your {rsvpOpen.event_type === 'table_service' ? 'table reservation' : 'RSVP'} for {rsvpOpen.title} has been submitted.</p>
              </div>
            ) : (
              <>
                <div style={{ fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'0.3em',textTransform:'uppercase',color:C.gold,marginBottom:8 }}>
                  {rsvpOpen.event_type === 'table_service' ? 'Reserve a Table' : 'RSVP'}
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:300,marginBottom:24 }}>{rsvpOpen.title}</h3>
                {rsvpOpen.venue_name && <p style={{ fontSize:12,color:C.lightDim,marginBottom:24 }}>{rsvpOpen.venue_name} · {rsvpOpen.city}</p>}

                <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
                  {[
                    { key:'name', label:'Name', type:'text', required:true },
                    { key:'email', label:'Email', type:'email' },
                    { key:'phone', label:'Phone', type:'tel' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.lightDim,display:'block',marginBottom:6 }}>{f.label}{f.required && ' *'}</label>
                      <input type={f.type} value={(formData as any)[f.key]} onChange={e => setFormData(p => ({...p,[f.key]:e.target.value}))}
                        style={{ width:'100%',padding:'12px 16px',background:C.surface,border:`1px solid ${C.lightGhost}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.lightDim,display:'block',marginBottom:6 }}>Party Size</label>
                    <input type="number" min={1} max={20} value={formData.party_size} onChange={e => setFormData(p => ({...p,party_size:parseInt(e.target.value)||2}))}
                      style={{ width:100,padding:'12px 16px',background:C.surface,border:`1px solid ${C.lightGhost}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.lightDim,display:'block',marginBottom:6 }}>Special Requests</label>
                    <textarea rows={3} value={formData.special_requests} onChange={e => setFormData(p => ({...p,special_requests:e.target.value}))}
                      style={{ width:'100%',padding:'12px 16px',background:C.surface,border:`1px solid ${C.lightGhost}`,color:C.light,fontFamily:'DM Sans,sans-serif',fontSize:14,outline:'none',resize:'vertical' }} />
                  </div>
                  <button onClick={submitRsvp} disabled={!formData.name || submitting}
                    style={{ fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:C.base,background:C.gold,padding:'16px 40px',border:'none',cursor:'pointer',transition:'all 0.3s',opacity:!formData.name||submitting?0.5:1,marginTop:8 }}>
                    {submitting ? 'Submitting...' : rsvpOpen.event_type === 'table_service' ? 'Reserve Table' : 'Confirm RSVP'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .events-grid{grid-template-columns:1fr!important}
          .events-grid > div{grid-column:span 1!important}
          .filter-tabs{justify-content:center}
        }
        @media(max-width:1024px){
          .events-grid{grid-template-columns:repeat(2,1fr)!important}
        }
      `}</style>
    </>
  );
}
