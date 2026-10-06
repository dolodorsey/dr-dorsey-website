import type { Metadata } from 'next';
import styles from '../card-directory.module.css';

export const metadata: Metadata = {
  title: 'The Inner Circle — Venue Revenue Optimization Engine™',
  description: 'The Inner Circle helps independent venues identify and activate new revenue from guest traffic, media, food, beverage, underused space, automated retail, merchandise and digital follow-up.',
  alternates: { canonical: 'https://innercircle.thekollectivehospitality.com' },
  openGraph: {
    title: 'The Inner Circle — Venue Revenue Optimization Engine™',
    description: 'Find the revenue already sitting inside your four walls.',
    url: 'https://innercircle.thekollectivehospitality.com',
    siteName: 'The Inner Circle',
    type: 'website',
  },
};

const cards = [
  {
    n:'01', name:'Memory Machine', category:'Experiential Media',
    tagline:'Turn high-traffic moments into measurable media and guest engagement.',
    href:'https://memory-machine-sigma.vercel.app',
  },
  {
    n:'02', name:'Good Times', category:'City Discovery App',
    tagline:'Food, nightlife, events, sports, festivals and city discovery in one platform.',
    href:'https://thegoodtimesworldwide.com',
    image:'/dorsey/current/good-times.jpg',
  },
  {
    n:'03', name:'BEVCO + Beverages', category:'Beverage Portfolio',
    tagline:'Hydration, sparkling, energy, ready-to-drink, zero-proof and hospitality beverage brands.',
    href:'https://bevcohq.com',
    image:'/dorsey/current/infinity-water.jpg',
  },
  {
    n:'04', name:'VAPR', category:'Automated Retail',
    tagline:'Vape vending and automated retail infrastructure built for high-traffic venues.',
    href:'https://vapr-seven.vercel.app',
  },
  {
    n:'05', name:'Casper Group + Entities', category:'Food & Hospitality',
    tagline:'A multi-brand food platform built for scalable kitchens, venues and delivery.',
    href:'https://caspergroupworldwide.com',
  },
  {
    n:'06', name:'Mister Manufacturing', category:'Manufacturing',
    tagline:'Production infrastructure for merchandise, packaging, fabrication and branded goods.',
    href:'https://mister-manufacturing.vercel.app',
  },
  {
    n:'07', name:'Sole Exchange', category:'Commerce & Community',
    tagline:'Sneakers, streetwear, exchange, restoration, collection and community impact.',
    href:'https://sole-exchange-website.vercel.app',
  },
];

export default function InnerCirclePage(){
  const serviceSchema = {
    '@context':'https://schema.org',
    '@type':'Service',
    '@id':'https://innercircle.thekollectivehospitality.com/#service',
    name:'The Venue Revenue Optimization Engine™',
    provider:{
      '@type':'Organization',
      name:'The Inner Circle',
      url:'https://innercircle.thekollectivehospitality.com',
    },
    areaServed:'United States',
    serviceType:'Venue revenue optimization and hospitality commercial strategy',
    url:'https://innercircle.thekollectivehospitality.com',
    description:'A strategic operating layer that helps independent venues identify and activate revenue from guest traffic, media, food, beverage, underused space, automated retail, merchandise and digital follow-up.',
  };
  const faqSchema = {
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity:[
      {
        '@type':'Question',
        name:'What is The Inner Circle Venue Revenue Optimization Engine?',
        acceptedAnswer:{'@type':'Answer',text:'The Inner Circle reviews how an independent venue uses guest traffic, time, space, media, food, beverage, commerce and digital follow-up, then recommends only the revenue opportunities that fit the property.'}
      },
      {
        '@type':'Question',
        name:'What kinds of venues are a fit for Inner Circle?',
        acceptedAnswer:{'@type':'Answer',text:'The strongest fits include nightlife venues, event spaces, sports bars and lounges, entertainment destinations, mixed-use properties and other high-traffic hospitality venues.'}
      },
      {
        '@type':'Question',
        name:'Does Inner Circle replace the companies in its portfolio?',
        acceptedAnswer:{'@type':'Answer',text:'No. Each company, product and platform remains a separate operating brand. Inner Circle is the strategic front door that selects and coordinates the right assets for a venue.'}
      },
      {
        '@type':'Question',
        name:'What happens after a Venue Revenue Review?',
        acceptedAnswer:{'@type':'Answer',text:'The process is audit, architect, align, activate and optimize. A review identifies monetization gaps first; only the highest-fit opportunities move into partner alignment and activation.'}
      }
    ]
  };
  return (
    <main className={styles.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}} />
      <section className={styles.hero}>
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>THE INNER CIRCLE / VENUE REVENUE ECOSYSTEM</span>
          <h1>MORE VALUE.<br/>SAME FOUR WALLS.</h1>
          <p>
            One front door into the platforms and operating companies that can activate underused
            venue assets, improve guest experience, create media, add commerce, expand food and
            beverage revenue, and build new reasons for customers to stay longer and spend more.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:24}}>
            <a className={styles.scrollCue} href="#portfolio">Enter the portfolio ↓</a>
            <a href="/inner-circle/revenue-review" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'12px 18px',border:'1px solid rgba(255,255,255,.55)',borderRadius:999,color:'#fff',textDecoration:'none',fontSize:12,fontWeight:800,letterSpacing:1,textTransform:'uppercase'}}>Request Venue Revenue Review ↗</a>
          </div>
        </div>
      </section>

      <section style={{padding:'64px 5vw',background:'#f5efe3',color:'#16130f',borderBottom:'1px solid rgba(0,0,0,.08)'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <span className={styles.kicker}>THE COMMERCIAL OPERATING LAYER</span>
          <h2 style={{fontSize:'clamp(42px,6vw,78px)',lineHeight:.94,margin:'12px 0 18px'}}>Not another vendor.<br/>One venue. One strategy.</h2>
          <p style={{fontSize:17,lineHeight:1.65,maxWidth:860,opacity:.76}}>
            Inner Circle connects separate venue opportunities—traffic, attention, time, space, infrastructure and brand equity—into one coordinated commercial strategy. The goal is to identify what should be monetized, how it should be monetized, who should operate it, where it should live and when it should expand.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:10,marginTop:24}}>
            {[
              ['Revenue / guest','How many profitable transactions can one visit support?'],
              ['Revenue / sq. ft.','Which physical areas are economically productive?'],
              ['Revenue / hour','Can infrastructure create value outside current operating periods?'],
              ['Revenue / impression','What is the commercial value of venue attention?'],
              ['Revenue / experience','Can moments generate content, sponsorship, data or repeat visits?'],
              ['Revenue beyond visit','Can the relationship continue digitally after guests leave?'],
            ].map(([title,copy])=><div key={title} style={{padding:16,border:'1px solid rgba(0,0,0,.1)',borderRadius:14,background:'rgba(255,255,255,.55)'}}><b style={{display:'block',fontSize:13,textTransform:'uppercase',letterSpacing:1}}>{title}</b><span style={{display:'block',marginTop:7,fontSize:12,lineHeight:1.45,opacity:.68}}>{copy}</span></div>)}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 5vw',background:'#11100e',color:'#fff',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <span className={styles.kicker}>HOW INNER CIRCLE ACTIVATES A PROPERTY</span>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,minmax(0,1fr))',gap:10,marginTop:22}}>
            {[
              ['01','Audit','Identify underused space, traffic, touchpoints and monetization gaps.'],
              ['02','Architect','Build the right revenue model, offer mix and operating structure.'],
              ['03','Align','Secure the right partners, approvals and launch requirements.'],
              ['04','Activate','Deploy the concepts, experiences and commercial systems.'],
              ['05','Optimize','Track performance, improve conversion and scale what works.'],
            ].map(([n,title,copy])=><div key={title} style={{padding:18,border:'1px solid rgba(255,255,255,.12)',borderRadius:14,background:'rgba(255,255,255,.04)'}}><span style={{fontSize:11,opacity:.5}}>{n}</span><h3 style={{margin:'10px 0 8px',fontSize:22}}>{title}</h3><p style={{margin:0,fontSize:12,lineHeight:1.5,opacity:.66}}>{copy}</p></div>)}
          </div>
          <p style={{margin:'28px 0 0',paddingTop:24,borderTop:'1px solid rgba(255,255,255,.1)',fontSize:15,lineHeight:1.7,opacity:.8}}>
            Best fit: nightlife venues · event spaces · sports bars and lounges · entertainment destinations · mixed-use properties · high-traffic hospitality venues.
          </p>
        </div>
      </section>

      <section className={styles.directory} id="portfolio">
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>THE INNER CIRCLE DIRECTORY</span>
            <h2>Choose the asset.</h2>
          </div>
          <p>
            Every card remains its own company, product or platform. Inner Circle is the strategic
            front door; each click enters the entity&apos;s actual operating site.
          </p>
        </header>

        <div className={styles.grid}>
          {cards.map((card) => (
            <a className={styles.card} href={card.href} key={card.name} rel="noopener">
              {card.image ? <img className={styles.cardImage} src={card.image} alt="" /> : <span className={styles.cover} />}
              <span className={styles.veil} />
              <span className={styles.topline}><b>{card.n}</b><span>{card.category}</span></span>
              <div className={styles.copy}>
                <h3>{card.name}</h3>
                <p>{card.tagline}</p>
                <span className={styles.enter}>Enter site <b>→</b></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section style={{padding:'64px 5vw',background:'#f5efe3',color:'#16130f',borderTop:'1px solid rgba(0,0,0,.08)'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <span className={styles.kicker}>VENUE REVENUE FAQ</span>
          <h2 style={{fontSize:'clamp(38px,5vw,64px)',lineHeight:.96,margin:'12px 0 26px'}}>The questions venue operators ask first.</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>
            {[
              ['What is the Venue Revenue Optimization Engine™?','A commercial review of guest traffic, time, space, media, food, beverage, commerce and digital follow-up. Inner Circle recommends only the revenue opportunities that fit the property.'],
              ['What venues are the best fit?','Nightlife venues, event spaces, sports bars and lounges, entertainment destinations, mixed-use properties and other high-traffic hospitality venues.'],
              ['Does Inner Circle replace the portfolio companies?','No. Each company, product and platform stays separate. Inner Circle is the strategic front door that selects and coordinates the right assets for a venue.'],
              ['What happens after the Revenue Review?','Audit first. Then architect the model, align the required partners and approvals, activate only the fit opportunities, and optimize from measured performance.'],
            ].map(([q,a])=><article key={q} style={{padding:20,border:'1px solid rgba(0,0,0,.1)',borderRadius:14,background:'rgba(255,255,255,.6)'}}><h3 style={{margin:'0 0 9px',fontSize:20}}>{q}</h3><p style={{margin:0,fontSize:13,lineHeight:1.6,opacity:.72}}>{a}</p></article>)}
          </div>
        </div>
      </section>

      <section style={{padding:'56px 5vw',background:'#0b0a08',color:'#fff',borderTop:'1px solid rgba(255,255,255,.12)',textAlign:'center'}}>
        <p style={{margin:'0 0 8px',fontSize:11,letterSpacing:2,textTransform:'uppercase',opacity:.7}}>Venue owners · operators · hospitality groups</p>
        <h2 style={{margin:'0 auto 16px',maxWidth:860,fontSize:'clamp(34px,5vw,64px)',lineHeight:.95,fontWeight:500}}>Find the revenue already sitting inside your four walls.</h2>
        <p style={{maxWidth:760,margin:'0 auto 24px',opacity:.72,lineHeight:1.6}}>Inner Circle reviews your venue across guest acquisition, media, food, beverage, automated retail, merchandise, community activation and underused operating capacity—then recommends only the assets that fit.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/inner-circle/revenue-review" style={{display:'inline-flex',padding:'14px 22px',borderRadius:999,background:'#fff',color:'#111',textDecoration:'none',fontWeight:900,letterSpacing:1,textTransform:'uppercase'}}>Start the Revenue Review ↗</a>
          <a href="/inner-circle/brief" style={{display:'inline-flex',padding:'14px 22px',borderRadius:999,border:'1px solid rgba(255,255,255,.45)',color:'#fff',textDecoration:'none',fontWeight:900,letterSpacing:1,textTransform:'uppercase'}}>Join the Venue Revenue Brief ↗</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <strong>INNER CIRCLE</strong>
        <span>The Venue Revenue Optimization Engine™</span>
      </footer>
    </main>
  );
}
