"use client";

import { useEffect, useState } from "react";
import styles from "./mobile-experience-enhancer.module.css";

function isGrownishCard(element: Element) {
  const text = element.textContent || "";
  return /grown\s*[-–—]?\s*ish/i.test(text);
}

function primeVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "auto";
  const play = () => video.play().catch(() => undefined);
  if (video.readyState >= 2) play();
  else {
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
  }
}

export default function MobileExperienceEnhancer() {
  const [grownishOpen, setGrownishOpen] = useState(false);

  useEffect(() => {
    let stopped = false;
    const bound = new WeakSet<Element>();

    const refresh = () => {
      if (stopped) return;
      document.querySelectorAll<HTMLVideoElement>("[data-kollective-app] video").forEach(primeVideo);

      document
        .querySelectorAll<Element>("[data-kollective-app] a, [data-kollective-app] button")
        .forEach((element) => {
          if (bound.has(element) || !isGrownishCard(element)) return;
          const heading = element.querySelector("h2, h3, strong");
          if (!heading || !/grown\s*[-–—]?\s*ish/i.test(heading.textContent || "")) return;
          bound.add(element);
          element.setAttribute("data-grownish-actions", "true");
          element.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            setGrownishOpen(true);
          });
        });
    };

    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true });
    const resume = () => document.querySelectorAll<HTMLVideoElement>("[data-kollective-app] video").forEach(primeVideo);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("touchstart", resume, { passive: true });

    return () => {
      stopped = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("touchstart", resume);
    };
  }, []);

  return (
    <>
      <span className={styles.mount} aria-hidden="true" />
      {grownishOpen ? (
        <div className={styles.eventOverlay} role="dialog" aria-modal="true" aria-labelledby="grownish-actions-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setGrownishOpen(false); }}>
          <section className={styles.eventSheet}>
            <button className={styles.close} type="button" onClick={() => setGrownishOpen(false)} aria-label="Close Grown-Ish options">×</button>
            <p>GROWN-ISH · DIRECT ACCESS</p>
            <h2 id="grownish-actions-title">Choose your move.</h2>
            <span>Handle the full night without leaving the Kollective app.</span>
            <div className={styles.actions}>
              <a href="/app/forms/rsvp?event=GROWN-ISH"><small>ENTRY</small><strong>Join VIP List</strong></a>
              <a href="/app/forms/vip-section?event=GROWN-ISH&occasion=birthday"><small>CELEBRATE</small><strong>Birthday Section</strong></a>
              <a href="/app/forms/vip-section?event=GROWN-ISH"><small>TABLES</small><strong>Reserve a Section</strong></a>
              <a href="/app/forms/inquiry?event=GROWN-ISH&topic=faq"><small>HELP</small><strong>FAQ</strong></a>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
