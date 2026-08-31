import Image from 'next/image';
import Link from 'next/link';
import styles from './legal-page.module.css';

const EMBLEM = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png';

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export default function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="The Kollective home">
          <Image src={EMBLEM} alt="The Kollective" width={42} height={42} />
          <span>The Kollective</span>
        </Link>
        <nav aria-label="Legal navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/sms-consent">SMS Consent</Link>
        </nav>
      </header>

      <article className={styles.document}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.updated}>Effective August 31, 2026</p>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.content}>{children}</div>
      </article>

      <footer className={styles.footer}>
        <p>Kollective Hospitality Texas</p>
        <p>2811 Washington Ave, Houston, TX 77007</p>
        <a href="mailto:thekollectivehospitality@gmail.com">thekollectivehospitality@gmail.com</a>
      </footer>
    </main>
  );
}
