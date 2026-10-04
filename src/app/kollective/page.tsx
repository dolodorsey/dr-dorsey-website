import type { Metadata } from 'next';
import styles from '../card-directory.module.css';

export const metadata: Metadata = {
  title: 'The Kollective — Portfolio',
  description: 'The Kollective portfolio across hospitality, food, beverages, experiences, technology, community, commerce and culture.',
  alternates: { canonical: 'https://thekollectivehospitality.com' },
};

const cards = [
  {n:'01',name:'Inner Circle',category:'Venue Revenue',tagline:'The Venue Revenue Optimization Engine™.',href:'https://innercircle.thekollectivehospitality.com'},
  {n:'02',name:'Memory Machine',category:'Experiential Media',tagline:'Turning high-traffic moments into media, engagement and measurable value.',href:'https://memory-machine-sigma.vercel.app'},
  {n:'03',name:'BEVCO INTL',category:'Beverages',tagline:'A beverage company built for culture, occasions and hospitality.',href:'https://bevcohq.com',image:'/dorsey/current/infinity-water.jpg'},
  {n:'04',name:'Infinity Water',category:'Premium Hydration',tagline:'Premium hydration for hospitality, events, fitness, retail and everyday life.',href:'https://infinity.bevcohq.com',image:'/dorsey/current/infinity-water.jpg'},
  {n:'05',name:'Pronto Energy',category:'Energy',tagline:'Fast, flavor-forward energy in motion.',href:'https://prontoenergy.bevcohq.com',image:'/dorsey/current/pronto-energy.jpg'},
  {n:'06',name:'ORA',category:'Sparkling Water',tagline:'Elevated sparkling water for a refined world.',href:'https://ora.bevcohq.com'},
  {n:'07',name:'OTINI',category:'Ready-to-Drink',tagline:'Premium ready-to-drink espresso martini for social occasions.',href:'https://otini.bevcohq.com'},
  {n:'08',name:'Casa Cantina',category:'Ready-to-Drink',tagline:'Margarita flavor built for brunch, poolside, travel, hospitality and events.',href:'https://casacantina.bevcohq.com'},
  {n:'09',name:'Double Zero',category:'Zero-Proof',tagline:'Premium zero-proof mocktails without compromising the experience.',href:'https://doublezero.bevcohq.com'},
  {n:'10',name:'Casper Group',category:'Food & Hospitality',tagline:'A house of food brands built for scalable kitchens and different cravings.',href:'https://caspergroupworldwide.com'},
  {n:'11',name:'Angel Wings',category:'Casper Group',tagline:'Bold wings, flavor, culture and community.',href:'https://angelwings.caspergroupworldwide.com'},
  {n:'12',name:'Patty Daddy',category:'Casper Group',tagline:'Big personality. Bigger burgers.',href:'https://pattydaddy.caspergroupworldwide.com'},
  {n:'13',name:'Morning After',category:'Casper Group',tagline:'Breakfast, brunch and recovery built around the universal morning-after occasion.',href:'https://morningafter.caspergroupworldwide.com'},
  {n:'14',name:'Mojo Juice',category:'Casper Group',tagline:'Juice, smoothies, wellness and everyday energy.',href:'https://mojojuice.caspergroupworldwide.com'},
  {n:'15',name:'Espresso Co.',category:'Casper Group',tagline:'Coffee, culture and the daily ritual.',href:'https://espressoco.caspergroupworldwide.com'},
  {n:'16',name:'Sweet Tooth',category:'Casper Group',tagline:'Dessert, indulgence and shareable social-first experiences.',href:'https://sweettooth.caspergroupworldwide.com'},
  {n:'17',name:'Sole Exchange',category:'Commerce & Community',tagline:'Sneakers, streetwear, exchange, restoration and community.',href:'https://sole-exchange-website.vercel.app'},
  {n:'18',name:"Member's Elite",category:'Sports Management',tagline:'Athletes are brands. Representation, development and opportunity.',href:'https://members-elite-website.vercel.app'},
  {n:'19',name:'Good Times',category:'City Discovery',tagline:'What are we doing? Food, nightlife, events, sports and city discovery.',href:'https://thegoodtimesworldwide.com',image:'/dorsey/current/good-times.jpg'},
  {n:'20',name:'S.O.S.',category:'On-Demand Services',tagline:'Real help on standby through a network of independent service providers.',href:'https://thesuperherosonstandby.com'},
  {n:'21',name:'Mission 365',category:'Fundraising & Impact',tagline:'Fundraising, community and mission work 365 days a year.',href:'https://mission-365.vercel.app'},
  {n:'22',name:'Hakuna Matata',category:'Founder / Publishing',tagline:'Live for today. Build for tomorrow.',href:'https://doctordorsey.com/hakuna-matata',image:'/dorsey/book-cover.png'},
];

export default function KollectivePage(){
  return (
    <main className={styles.site}>
      <section className={styles.hero}>
        <img className={styles.heroImage} src="/brand/kollective-hero-poster.png" alt="" />
        <span className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>THE KOLLECTIVE / CULTURE INTO ENTERPRISE</span>
          <h1>PEOPLE.<br/>BRANDS.<br/>WORLDS.</h1>
          <p>
            One enterprise front door into independent companies spanning hospitality, food,
            beverages, experiences, technology, commerce, sports, services, community and culture.
            Every brand keeps its own identity. Every card opens the world behind it.
          </p>
          <a className={styles.scrollCue} href="#portfolio">Open the portfolio ↓</a>
        </div>
      </section>

      <section className={styles.directory} id="portfolio">
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>THE KOLLECTIVE DIRECTORY</span>
            <h2>Choose your world.</h2>
          </div>
          <p>
            Built from the same portfolio architecture as the deck: a visual directory first,
            followed by the specific operating destination for each company, platform or brand.
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

      <footer className={styles.footer}>
        <strong>THE KOLLECTIVE</strong>
        <span>Independent brands. Shared enterprise leverage.</span>
      </footer>
    </main>
  );
}
