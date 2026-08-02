import styles from './worlds.module.css';
import type { World } from './worldData';
import MotionCover from '@/components/MotionCover';
import { motionFor } from '@/lib/motion';

export default function WorldPage({ world }: { world: World }) {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}><a href="/"><img src="/dorsey/logo.png" alt="Dr. Dorsey" /></a><div><a href="/companies">Companies</a><a href="/directory">Directory</a><a href="/links">Links</a><a href="/access">Access</a></div></nav>
      <header className={styles.hero}>
        <img src={world.image} alt="" /><span />
        <div><p>{world.eyebrow}</p><h1>{world.title}</h1><b>{world.intro}</b></div>
      </header>
      {world.videos ? (
        <section className={styles.motion}>
          <header><p>Animated worlds</p><h2>EVERY IDENTITY <em>MOVES.</em></h2></header>
          <div>{world.videos.map((video) => <a href={video.href} key={video.title}><video autoPlay muted loop playsInline><source src={video.src} type="video/mp4" /></video><h3>{video.title}</h3><b>Enter ↗</b></a>)}</div>
        </section>
      ) : null}
      {(() => {
        const hasCover = world.items.some(
          (item) => item.image || item.animation || motionFor(item.title),
        );
        return (
          <section className={`${styles.grid} ${hasCover ? styles.withImages : ''}`}>
            {world.items.map((item, index) => {
              const cover = item.animation || motionFor(item.title);
              return (
                <a
                  id={item.title === 'Casper Group' ? 'casper-group' : undefined}
                  href={item.href}
                  key={item.title}
                  className={index < 2 ? styles.gridFeature : styles.gridTile}
                >
                  {hasCover ? (
                    <span className={styles.gridMedia}>
                      <MotionCover
                        name={item.title}
                        animation={cover}
                        image={item.image}
                        alt={item.title}
                      />
                    </span>
                  ) : null}
                  <div><span>{String(index + 1).padStart(2, '0')} / {item.eyebrow}</span><h2>{item.title}</h2><p>{item.detail}</p><b>Enter world ↗</b></div>
                </a>
              );
            })}
          </section>
        );
      })()}
      <footer className={styles.footer}><img src="/dorsey/logo.png" alt="Dr. Dorsey" /><p>Live for today. Plan for tomorrow. Party tonight.</p><a href="/forms/inquiry">Start a conversation ↗</a></footer>
    </main>
  );
}
