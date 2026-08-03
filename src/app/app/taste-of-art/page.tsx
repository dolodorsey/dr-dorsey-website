import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "@/lib/motion";
import styles from "../experience.module.css";

export const metadata: Metadata = { title: "Taste of Art — The Kollective" };

export default function TasteOfArtPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Link className={styles.back} href="/app">← BACK TO THE APP</Link>
        <video autoPlay muted loop playsInline poster={motion.tasteOfArt.poster}>
          <source src={motion.tasteOfArt.src} type="video/mp4" />
        </video>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CANVAS · CUISINE · CULTURE</p>
          <h1>Taste of Art</h1>
          <p>An immersive collision of art, nightlife and the people shaping the city.</p>
        </div>
      </section>
      <section className={styles.notice}>
        <p className={styles.eyebrow}>UPCOMING</p>
        <h2>Fall and winter dates coming soon.</h2>
        <p>New dates, venue details and direct access will appear here first.</p>
      </section>
    </main>
  );
}
