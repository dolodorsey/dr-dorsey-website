import type { Metadata } from 'next';
import styles from '../card-directory.module.css';

export const metadata: Metadata = {
  title: 'Inner Circle — Portfolio',
  description: 'The Inner Circle portfolio of venue revenue, guest experience, media, technology, food, beverage, manufacturing, and commerce platforms.',
  alternates: { canonical: 'https://houstatlantavegas.com' },
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
  return (
    <main className={styles.site}>
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

      <section style={{padding:'56px 5vw',background:'#0b0a08',color:'#fff',borderTop:'1px solid rgba(255,255,255,.12)',textAlign:'center'}}>
        <p style={{margin:'0 0 8px',fontSize:11,letterSpacing:2,textTransform:'uppercase',opacity:.7}}>Venue owners · operators · hospitality groups</p>
        <h2 style={{margin:'0 auto 16px',maxWidth:860,fontSize:'clamp(34px,5vw,64px)',lineHeight:.95,fontWeight:500}}>Find the revenue already sitting inside your four walls.</h2>
        <p style={{maxWidth:760,margin:'0 auto 24px',opacity:.72,lineHeight:1.6}}>Inner Circle reviews your venue across guest acquisition, media, food, beverage, automated retail, merchandise, community activation and underused operating capacity—then recommends only the assets that fit.</p>
        <a href="/inner-circle/revenue-review" style={{display:'inline-flex',padding:'14px 22px',borderRadius:999,background:'#fff',color:'#111',textDecoration:'none',fontWeight:900,letterSpacing:1,textTransform:'uppercase'}}>Start the Revenue Review ↗</a>
      </section>

      <footer className={styles.footer}>
        <strong>INNER CIRCLE</strong>
        <span>The Venue Revenue Optimization Engine™</span>
      </footer>
    </main>
  );
}
