'use client';
import { useEffect, useRef, useState } from 'react';

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics';
const CG = 'https://casper-group.vercel.app/images';
const W = `${SB}/dr_dorsey/website`;
const DORSEY_W = `${SB}/dr_dorsey/01_logos/DorseyNewW.png`;

const GOLD = '#D4B87A';
const GB = '#E8D5A3';
const mono = 'DM Mono,monospace';
const serif = 'Cormorant Garamond,serif';

function useReveal(){const ref=useRef<HTMLDivElement>(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect()}},{threshold:0.08,rootMargin:'0px 0px -20px 0px'});obs.observe(el);return()=>obs.disconnect()},[]);return{ref,v}}
function Rv({children,d=0}:{children:React.ReactNode;d?:number}){const{ref,v}=useReveal();return<div ref={ref} style={{opacity:v?1:0,transform:v?'translateY(0)':'translateY(35px)',transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}

interface BrandItem {
  name: string;
  desc: string;
  logo?: string;
  website?: string;
  ig?: string;
  status: 'flagship'|'active'|'seasonal'|'development';
}

interface Division {
  name: string;
  tagline: string;
  desc: string;
  color: string;
  brands: BrandItem[];
}

const DIVISIONS: Division[] = [
  {
    name: 'HugLife × ICONIC',
    tagline: 'The Night District',
    desc: 'Multi-city event production across 15+ brands. From intimate 200-cap experiences to 2,000+ capacity festivals. Every event is a world — its own aesthetic, its own energy, its own universe.',
    color: '#C8A96E',
    brands: [
      { name:'NOIR', desc:'Dark luxury. Dress code enforced. Opulence meets underworld aesthetic. Multi-city.', logo:`${SB}/noir_event/01_logos/NOIR_LOGO.png`, website:'https://noir-event.vercel.app', ig:'@thenoir.worldwide', status:'flagship' },
      { name:'Taste of Art', desc:'Art-meets-nightlife. Live painting, immersive installations, creative energy. Multi-city.', logo:`${SB}/taste_of_art/01_logos/TASTE_OF_ART_LOGO.png`, website:'https://taste-of-art-event.vercel.app', ig:'@thetasteofart', status:'flagship' },
      { name:'REMIX', desc:'DJ culture. Music-first. Turntables, crates, and culture. Multi-city touring.', logo:`${SB}/remix_event/01_logos/REMIX_LOGO.png`, website:'https://remix-event.vercel.app', ig:'@notyouraveragerremix', status:'active' },
      { name:'Gangsta Gospel', desc:'Where the sacred meets the streets. Gospel-infused nightlife. Juneteenth flagship.', logo:`${SB}/gangsta_gospel/01_logos/GANGSTA_GOSPEL_LOGO.png`, website:'https://gangsta-gospel-event.vercel.app', ig:'@thegangstagospel', status:'seasonal' },
      { name:'Paparazzi', desc:'Red carpet energy. Flash photography. Celebrity treatment for everyone.', logo:`${SB}/paparazzi/01_logos/PAPARAZZI_LOGO.png`, website:'https://paparazzi-event.vercel.app', ig:'@thepaparazzipopup', status:'active' },
      { name:"Sunday's Best", desc:'Brunch meets nightlife. Best dressed. Gospel brunch energy with a twist.', logo:`${SB}/sundays_best/01_logos/SUNDAYS_BEST_LOGO.png`, website:'https://sundays-best-event.vercel.app', ig:'@the.sundays.best', status:'active' },
      { name:'WRST BHVR', desc:'Napkin Wars. Crime scene aesthetic. The most unhinged event brand in the portfolio.', logo:`${SB}/wrst_bhvr_event/01_logos/WRST_BHVR_LOGO.png`, website:'https://wrst-bhvr-event.vercel.app', ig:'@thewrstbhvr', status:'seasonal' },
      { name:'Pawchella', desc:'Dog festival. Coachella for canines. August in Atlanta.', logo:`${SB}/pawchella/01_logos/PAWCHELLA_LOGO.png`, website:'https://pawchella-event.vercel.app', status:'seasonal' },
      { name:'Beauty & The Beast', desc:'Couples event. Elegance and edge. September in Atlanta.', logo:`${SB}/beauty_beast/01_logos/BEAUTY_BEAST_LOGO.png`, status:'seasonal' },
      { name:'Black Ball', desc:'Black tie gala. End of year elegance. November in Atlanta.', logo:`${SB}/black_ball/01_logos/BLACK_BALL_LOGO.png`, status:'seasonal' },
      { name:'Underground King', desc:'Raw underground energy. Hip-hop culture. Street meets stage.', logo:`${SB}/underground_king/01_logos/UNDERGROUND_KING_LOGO.png`, website:'https://underground-king-event.vercel.app', status:'active' },
      { name:'Kulture', desc:'Cultural celebration. Diversity, music, art, food — all collide.', website:'https://the-kulture-event.vercel.app', status:'active' },
      { name:'Cravings', desc:'Food-forward event experience. Tastings, pop-ups, culinary culture.', website:'https://cravings-event.vercel.app', status:'active' },
      { name:'Soul Sessions', desc:'Live music. Intimate performances. Acoustic sets and rare moments.', website:'https://soul-sessions-event.vercel.app', status:'active' },
      { name:'Cinco de Drinko', desc:'Taco Tuesday Edition. Touring format. Entry = a pour. 5PM–midnight.', logo:`${SB}/cinco_de_drinko/01_logos/CINCO_DE_DRINKO_LOGO.png`, status:'active' },
    ]
  },
  {
    name: 'Casper Group',
    tagline: 'The Culinary District',
    desc: '10 restaurant and food concepts under one roof. Ghost kitchen model. Multi-unit expansion ready. Every concept has its own identity, menu, and brand DNA.',
    color: '#A0785A',
    brands: [
      { name:'Angel Wings', desc:'Signature wings. Multiple sauces. The flagship food brand.', logo:`${CG}/logo-angel-wings.png`, status:'flagship' },
      { name:'Pasta Bish', desc:'Fresh pasta. Bold flavors. Italian street food energy.', logo:`${CG}/logo-pasta-bish.png`, status:'active' },
      { name:'Patty Daddy', desc:'Premium burgers. Smash style. The burger that hits different.', logo:`${CG}/logo-patty-daddy.png`, status:'active' },
      { name:'Taco Yaki', desc:'Japanese-Mexican fusion. Takoyaki meets tacos. Ninja aesthetic.', logo:`${CG}/logo-taco-yaki.png`, status:'active' },
      { name:'Morning After', desc:'Breakfast all day. The hangover cure. Brunch culture.', logo:`${CG}/logo-morning-after.png`, status:'active' },
      { name:'Sweet Tooth', desc:'Desserts and sweets. Sugar rush. Instagram-ready treats.', logo:`${CG}/logo-sweet-tooth.png`, status:'active' },
      { name:'Mojo Juice', desc:'Fresh juice and smoothies. Health meets flavor. Cold-pressed.', logo:`${CG}/logo-mojo-juice.png`, status:'active' },
      { name:'Mr. Oyster', desc:'Raw bar. Oysters and seafood. Upscale casual.', logo:`${CG}/logo-mr-oyster.png`, status:'active' },
      { name:'The Espresso Co.', desc:'Coffee culture. Espresso forward. Café vibes.', logo:`${CG}/logo-espresso-co.png`, status:'active' },
      { name:'TOSS\'D', desc:'Salads and bowls. Health-conscious. Build your own.', logo:`${CG}/logo-tossd.png`, status:'active' },
    ]
  },
  {
    name: 'Scented Flowers',
    tagline: 'The Museum District',
    desc: 'Immersive museum experiences that travel. Culture preserved. Stories told. Worlds built.',
    color: '#6B8E6B',
    brands: [
      { name:'Forever Futbol', desc:'The world\'s premier futbol museum. Traveling immersive experience. May 29–Jul 6, 2026 in Atlanta. World Cup activation.', logo:`${SB}/forever_futbol/logos/FOREVER_FUTBOL_LOGO.png`, website:'https://foreverfutbolmuseum.com', ig:'@foreverfutbol.museum', status:'flagship' },
      { name:'Living Legends', desc:'Sports legends museum. Stories of greatness preserved.', status:'development' },
      { name:'Women Make The World', desc:'Celebrating women who shaped culture, business, and history.', status:'development' },
      { name:'Fallen Stars', desc:'Tribute to icons gone too soon. Memorial experience.', status:'development' },
    ]
  },
  {
    name: 'Bodega × Products',
    tagline: 'The Shopping District',
    desc: 'Consumer products and retail. Online and physical storefronts. Own brands + curated third-party goods.',
    color: '#8B6B8E',
    brands: [
      { name:'MAGA (Make Atlanta Great Again)', desc:'ATL pride streetwear. Swimwear, hats, culture merch. Shopify store live.', logo:'https://make-atlanta-great-again.vercel.app/brand/MAGA_hawks.png', website:'https://makeatlantagreatagain.myshopify.com', status:'active' },
      { name:'Stush', desc:'Premium lifestyle brand. Fashion, accessories, culture. Shopify store live.', website:'https://stushusa.com', ig:'@hauseofstush', status:'active' },
      { name:'Infinity Water', desc:'Premium alkaline water. Clean design. Health-forward positioning.', website:'https://infinity-water-website.vercel.app', status:'active' },
      { name:'Pronto Energy', desc:'Clean energy drink. Multiple flavors. Vibrant branding.', logo:`${SB}/pronto_energy/logos/pronto-logo.png`, website:'https://pronto-energy-website.vercel.app', status:'active' },
      { name:'Bodega Bodega Bodega', desc:'The retail storefront. Own products + other brands + high-margin concessions.', website:'https://bodegabodegabodega.com', status:'active' },
    ]
  },
  {
    name: 'The Umbrella Group',
    tagline: 'The Service Exchange',
    desc: 'Professional services ecosystem. From auto exchange to realty to legal — a full-service empire.',
    color: '#5A7A8E',
    brands: [
      { name:'The Mind Studio', desc:'Wellness + mental health platform. Teletherapy, clinic partnerships, MCO outreach. 3-portal HIPAA app.', website:'https://themindstudioworldwide.com', ig:'@themindstudioforever', status:'flagship' },
      { name:'Umbrella Injury Network (HURT 911)', desc:'Personal injury pipeline. Attorney partnerships. Multi-city network.', logo:`${SB}/umbrella_injury/00-brand-assets/logos/hurt-911-logo-black.png`, status:'active' },
      { name:'Umbrella Auto Exchange', desc:'Vehicle transactions. Buy, sell, trade. Streamlined process.', status:'active' },
      { name:'Umbrella Realty Group', desc:'Real estate services. Residential and commercial.', status:'active' },
      { name:'Umbrella Clean Services', desc:'Professional cleaning. Commercial and residential.', status:'active' },
      { name:'The People\'s Dept.', desc:'Staffing and workforce solutions. Event staff, hospitality workers.', status:'active' },
      { name:'The Brand Studio', desc:'Full-service creative agency. Logos, websites, reels, commercials for external clients.', status:'active' },
      { name:'The Automation Office', desc:'Business automation consulting. AI systems, workflow design, CRM builds.', status:'active' },
    ]
  },
  {
    name: 'The Inner Circle',
    tagline: 'The Technology Hub',
    desc: 'Consumer-facing technology products. Apps, platforms, and digital tools.',
    color: '#4A6FA5',
    brands: [
      { name:'Good Times', desc:'City concierge + nightlife discovery app. 837 venues across 10 cities. Events, shows, sports, dining. AI-powered recommendations.', logo:`${SB}/good_times/00-brand-assets/logos/good-times-logo-gold-black.png`, website:'https://good-times-app.vercel.app', status:'flagship' },
      { name:'S.O.S Roadside', desc:'On-demand roadside assistance. Fast dispatch. 24/7 coverage.', status:'active' },
      { name:'On Call', desc:'Professional services on-demand. Connect with experts instantly.', status:'development' },
      { name:'Sole Exchange', desc:'Sneaker authentication and trading platform. Culture meets commerce.', status:'development' },
    ]
  },
  {
    name: 'Playmakers Sports Association',
    tagline: 'The Non-Profit Wing',
    desc: 'Community impact through sports, education, and wellness.',
    color: '#8E6B5A',
    brands: [
      { name:'Sole Exchange', desc:'Sneaker culture meets community. Trading events, authentication, youth programs.', status:'active' },
      { name:'Let\'s Talk About It', desc:'Mental health awareness. Community conversations. Breaking stigma.', status:'active' },
    ]
  },
];

const statusBadge = (s: string) => {
  const colors: Record<string,string> = { flagship:'#C8A96E', active:'rgba(111,168,111,0.9)', seasonal:'rgba(111,143,168,0.9)', development:'rgba(168,111,111,0.7)' };
  return { fontFamily:mono, fontSize:7, letterSpacing:'0.15em', textTransform:'uppercase' as const, color:colors[s]||'#888', border:`1px solid ${colors[s]||'#333'}`, padding:'3px 8px', display:'inline-block' };
};

export default function BrandsPage(){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>60);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);

  return <>
    {/* NAV */}
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'20px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.4s,backdrop-filter 0.4s',...(scrolled?{background:'rgba(8,6,4,0.95)',backdropFilter:'blur(20px)'}:{})}}>
      <a href="/" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',color:'#F5F0E8'}}><img src={DORSEY_W} alt="" style={{height:28,objectFit:'contain'}}/></a>
      <a href="/" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',textTransform:'uppercase',color:GOLD,textDecoration:'none'}}>← Back to Home</a>
    </nav>

    {/* HERO */}
    <section style={{position:'relative',minHeight:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',background:'#080604',padding:'clamp(120px,15vw,200px) clamp(20px,4vw,80px) clamp(60px,8vw,100px)'}}>
      <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',opacity:0.15}}><img src={`${W}/hero-bg.jpg`} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
      <div style={{position:'relative',zIndex:1,maxWidth:900}}>
        <div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.5em',textTransform:'uppercase',color:GOLD,marginBottom:24}}>The Kollective Hospitality Group</div>
        <h1 style={{fontFamily:serif,fontSize:'clamp(36px,7vw,96px)',fontWeight:300,lineHeight:1.05,letterSpacing:'-0.02em',marginBottom:24}}>Every Brand.<br/>Every <em style={{fontStyle:'italic',color:GB}}>Division.</em></h1>
        <p style={{fontFamily:mono,fontSize:'clamp(10px,0.9vw,13px)',color:'rgba(245,240,232,0.4)',lineHeight:1.8,maxWidth:600}}>57+ ventures across 7 divisions. Events, food, museums, retail, technology, wellness, and community — all under one ecosystem. Here&rsquo;s everything.</p>
        <div style={{display:'flex',gap:32,marginTop:40}}>
          {[{n:'57+',l:'Brands'},{n:'7',l:'Divisions'},{n:'8',l:'Cities'},{n:'15+',l:'Event Brands'}].map(s=>(
            <div key={s.l}><div style={{fontFamily:serif,fontSize:'clamp(24px,3vw,44px)',fontWeight:300,color:GB,lineHeight:1}}>{s.n}</div><div style={{fontFamily:mono,fontSize:7,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(232,213,163,0.4)',marginTop:4}}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>

    {/* DIVISIONS */}
    {DIVISIONS.map((div,di)=>(
      <section key={div.name} style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:di%2===0?'#080604':'#F5F0E8',color:di%2===0?'#F5F0E8':'#080604'}}>
        <div style={{maxWidth:1400,margin:'0 auto'}}>
          <Rv>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:12}}>
              <div style={{width:40,height:1,background:div.color}}/>
              <div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.35em',textTransform:'uppercase',color:div.color}}>{div.tagline}</div>
            </div>
          </Rv>
          <Rv><h2 style={{fontFamily:serif,fontSize:'clamp(32px,5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:16}}>{div.name}</h2></Rv>
          <Rv><p style={{fontSize:'clamp(13px,1.1vw,16px)',color:di%2===0?'rgba(245,240,232,0.45)':'rgba(8,6,4,0.45)',lineHeight:1.8,maxWidth:700,marginBottom:56}}>{div.desc}</p></Rv>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:2}}>
            {div.brands.map((b,bi)=>(
              <Rv key={b.name} d={bi*0.04}>
                <div className="brand-card" style={{
                  padding:'clamp(28px,3vw,40px)',
                  background:di%2===0?'rgba(245,240,232,0.03)':'rgba(8,6,4,0.02)',
                  border:`1px solid ${di%2===0?'rgba(245,240,232,0.06)':'rgba(8,6,4,0.06)'}`,
                  height:'100%',
                  transition:'all 0.4s',
                  cursor:'pointer',
                  position:'relative',
                  overflow:'hidden'
                }}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:serif,fontSize:'clamp(20px,2vw,28px)',fontWeight:700,marginBottom:8,lineHeight:1.2}}>{b.name}</div>
                      <span style={statusBadge(b.status)}>{b.status}</span>
                    </div>
                    {b.logo && <img src={b.logo} alt="" style={{width:48,height:48,objectFit:'contain',opacity:0.7,flexShrink:0,marginLeft:12}}/>}
                  </div>
                  <p style={{fontSize:'clamp(11px,0.9vw,13px)',color:di%2===0?'rgba(245,240,232,0.45)':'rgba(8,6,4,0.45)',lineHeight:1.7,marginBottom:16}}>{b.desc}</p>
                  <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                    {b.website && <a href={b.website} target="_blank" rel="noopener noreferrer" style={{fontFamily:mono,fontSize:8,letterSpacing:'0.1em',color:div.color,textDecoration:'none',borderBottom:`1px solid ${div.color}`}}>Visit Site →</a>}
                    {b.ig && <span style={{fontFamily:mono,fontSize:8,letterSpacing:'0.1em',color:di%2===0?'rgba(245,240,232,0.3)':'rgba(8,6,4,0.3)'}}>{b.ig}</span>}
                  </div>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',background:'#080604',textAlign:'center'}}>
      <div style={{maxWidth:700,margin:'0 auto'}}>
        <Rv>
          <div style={{fontFamily:mono,fontSize:'clamp(8px,0.7vw,10px)',letterSpacing:'0.5em',textTransform:'uppercase',color:GOLD,marginBottom:24}}>Join the Ecosystem</div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(28px,5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:24}}>Want to be part of <em style={{fontStyle:'italic',color:GB}}>this?</em></h2>
          <p style={{fontFamily:mono,fontSize:'clamp(9px,0.8vw,11px)',color:'rgba(245,240,232,0.35)',lineHeight:1.8,marginBottom:40}}>Sponsorship · Investment · Venue Partnership · Brand Collaboration · Consulting</p>
          <a href="mailto:thedoctordorsey@gmail.com?subject=Partnership Inquiry" style={{fontFamily:serif,fontSize:'clamp(16px,2vw,24px)',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',color:'#080604',background:`linear-gradient(135deg,${GOLD},${GB},${GOLD})`,padding:'clamp(18px,2vw,24px) clamp(48px,6vw,80px)',textDecoration:'none',display:'inline-block',boxShadow:'0 4px 30px rgba(212,184,122,0.3)'}}>Get in Touch</a>
        </Rv>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{padding:'40px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(245,240,232,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#080604'}}>
      <div style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.2em',color:'rgba(245,240,232,0.2)'}}>&copy; 2026 Dr. DoLo Dorsey — The Kollective Hospitality Group</div>
      <a href="/" style={{fontFamily:mono,fontSize:'clamp(7px,0.65vw,9px)',letterSpacing:'0.15em',textTransform:'uppercase',color:GOLD,textDecoration:'none'}}>Home</a>
    </footer>

    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      .brand-card:hover{border-color:rgba(212,184,122,0.3)!important;transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.15)}
      @media(max-width:768px){.brand-card{min-height:auto!important}}
    `}</style>
  </>;
}
