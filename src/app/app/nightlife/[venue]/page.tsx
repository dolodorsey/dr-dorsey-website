import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "@/lib/motion";
import styles from "../../experience.module.css";

const VENUES = {
  opium: { name: "Opium ATL", motion: motion.opium, line: "RSVP and reserve your table directly with the Kollective." },
  revel: { name: "Revel", motion: motion.revel, line: "RSVP and reserve your table directly with the Kollective." },
} as const;

export function generateStaticParams() { return Object.keys(VENUES).map((venue) => ({ venue })); }
export function generateMetadata({ params }: { params: { venue: string } }): Metadata {
  const venue = VENUES[params.venue as keyof typeof VENUES];
  return { title: venue ? `${venue.name} — Direct Access` : "Nightlife — The Kollective" };
}

export default function NightlifeVenuePage({ params }: { params: { venue: string } }) {
  const venue = VENUES[params.venue as keyof typeof VENUES];
  if (!venue) notFound();
  const label = encodeURIComponent(venue.name);
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/app">← BACK TO THE APP</Link>
        <video autoPlay muted loop playsInline poster={venue.motion.poster}>
          <source src={venue.motion.src} type="video/mp4" />
        </video>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>KOLLECTIVE NIGHTLIFE · DIRECT ACCESS</p>
          <h1>{venue.name}</h1>
          <p>{venue.line}</p>
        </div>
      </section>
      <div className={styles.actions}>
        <Link href={`/forms/inquiry?brand=${label}&request=rsvp`}>RSVP DIRECTLY</Link>
        <Link href={`/app/table-deposit?venue=${label}`}>PAY TABLE DEPOSIT</Link>
        <Link href={`/forms/table_reservation?venue=${label}`}>REQUEST A TABLE</Link>
      </div>
      <section className={styles.notice}>
        <p className={styles.eyebrow}>TABLE SALES</p>
        <h2>Pricing is being finalized.</h2>
        <p>Once the table prices are supplied, this page will show the exact packages and required 25% deposit.</p>
      </section>
    </main>
  );
}
