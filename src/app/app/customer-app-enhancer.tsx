"use client";

import { useEffect } from "react";

const BRAND_GRAPHICS =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics";
const EMBLEM =
  `${BRAND_GRAPHICS}/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png`;

const ENTITY_POPUP_STILLS = [
  { names: ["black pages"], src: `${BRAND_GRAPHICS}/motion/black-pages-ani2.jpg` },
  { names: ["bodega"], src: `${BRAND_GRAPHICS}/motion/bodega-ani.jpg` },
  { names: ["grown ish", "grownish"], src: `${BRAND_GRAPHICS}/motion/grown-ani.jpg` },
  { names: ["hakuna matata"], src: `${BRAND_GRAPHICS}/motion/hakuna-ani.jpg` },
  { names: ["help 911", "hurt 911"], src: `${BRAND_GRAPHICS}/motion/help-911-ani.jpg` },
  { names: ["the law"], src: `${BRAND_GRAPHICS}/motion/the-law-ani.jpg` },
  { names: ["taste of art"], src: `${BRAND_GRAPHICS}/motion/taste-of-art.jpg` },
  { names: ["goodfellas"], src: `${BRAND_GRAPHICS}/motion/goodfellas-ani2.jpg` },
  { names: ["hungry af"], src: `${BRAND_GRAPHICS}/motion/hungry-ani.jpg` },
  { names: ["tulum"], src: `${BRAND_GRAPHICS}/motion/tulum-ani.jpg` },
  { names: ["make atlanta great again", "maga"], src: `${BRAND_GRAPHICS}/motion/maga-anii.jpg` },
  { names: ["pronto"], src: `${BRAND_GRAPHICS}/motion/pronto-cans.jpg` },
  { names: ["pulse"], src: `${BRAND_GRAPHICS}/motion/pulse-ani.jpg` },
  { names: ["sole exchange"], src: `${BRAND_GRAPHICS}/motion/sole-exchange-ani.jpg` },
  { names: ["sos", "superheroes on standby"], src: `${BRAND_GRAPHICS}/motion/sos-ani.jpg` },
  { names: ["stush"], src: `${BRAND_GRAPHICS}/motion/stush-ani.jpg` },
  { names: ["umbrella"], src: `${BRAND_GRAPHICS}/motion/umbrella-group-ani.jpg` },
] as const;

type TeamEntry = {
  name?: string | null;
  full_name?: string | null;
  role?: string | null;
  brand?: string | null;
  brand_logo_url?: string | null;
};
type EnhancementPayload = {
  directory?: {
    entityLogos?: Record<string, string>;
    excludedEventNames?: string[];
    team?: TeamEntry[];
  };
};

function key(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function entityPopupStill(value: unknown) {
  const normalized = key(value);
  return ENTITY_POPUP_STILLS.find((entry) =>
    entry.names.some((name) => normalized.includes(name)),
  )?.src;
}

function findGrid(root: Element, eyebrow: string) {
  const label = Array.from(root.querySelectorAll("p")).find(
    (node) => node.textContent?.trim().toUpperCase() === eyebrow,
  );
  return label?.parentElement?.nextElementSibling ?? null;
}

function enhance(payload: EnhancementPayload) {
  const root = document.querySelector("[data-kollective-app]");
  if (!root) return;

  const entityLogos = new Map(
    Object.entries(payload.directory?.entityLogos ?? {}).map(([name, logo]) => [key(name), logo]),
  );
  const excluded = new Set((payload.directory?.excludedEventNames ?? []).map(key));
  const team = new Map(
    (payload.directory?.team ?? []).map((entry) => [key(entry.name || entry.full_name), entry]),
  );

  const entityGrid = findGrid(root, "ENTITY DIRECTORY");
  entityGrid?.querySelectorAll("article").forEach((card) => {
    const heading = card.querySelector("h2");
    const name = heading?.textContent?.trim() || "";
    if (!heading || !name) return;

    if (excluded.has(key(name))) {
      card.setAttribute("data-kollective-directory-event", "removed");
      (card as HTMLElement).hidden = true;
      return;
    }

    card.setAttribute("data-kollective-directory-entity", "true");
    if (card.querySelector(".kollective-directory-logo-wrap")) return;

    const wrap = document.createElement("div");
    wrap.className = "kollective-directory-logo-wrap";
    const logo = document.createElement("img");
    logo.src = entityLogos.get(key(name)) || EMBLEM;
    logo.alt = `${name} logo`;
    logo.loading = "lazy";
    logo.decoding = "async";
    wrap.appendChild(logo);
    heading.parentElement?.insertBefore(wrap, heading);
    heading.classList.add("kollective-directory-name-hidden");
  });

  const staffGrid = findGrid(root, "COMPANY TEAM MEMBERS");
  if (staffGrid) staffGrid.setAttribute("data-kollective-staff-section", "true");
  staffGrid?.querySelectorAll("article").forEach((card) => {
    const heading = card.querySelector("h2");
    const name = heading?.textContent?.trim() || "";
    if (!heading || !name) return;

    const entry = team.get(key(name));
    card.setAttribute("data-kollective-directory-staff", "true");
    if (card.querySelector(".kollective-staff-identity")) return;

    const identity = document.createElement("div");
    identity.className = "kollective-staff-identity";
    const avatar = document.createElement("div");
    avatar.className = "kollective-staff-avatar";
    const logo = document.createElement("img");
    logo.src = entry?.brand_logo_url || EMBLEM;
    logo.alt = entry?.brand ? `${entry.brand} logo` : "Kollective logo";
    logo.loading = "lazy";
    logo.decoding = "async";
    avatar.appendChild(logo);

    const copy = document.createElement("span");
    const brand = document.createElement("strong");
    brand.textContent = entry?.brand || "The Kollective";
    const role = document.createElement("small");
    role.textContent = entry?.role || "Company team member";
    copy.append(brand, role);
    identity.append(avatar, copy);
    card.insertBefore(identity, card.firstChild);
  });

  const grownIshRows = Array.from(root.querySelectorAll("a")).filter((anchor) => {
    const heading = anchor.querySelector("h2");
    return /\bgrown\s*[-–—]?\s*ish\b/i.test(heading?.textContent || "");
  });
  const featured = grownIshRows[0];
  if (featured) {
    featured.setAttribute("data-kollective-featured-event", "true");
    if (!featured.querySelector(".kollective-featured-event-badge")) {
      const badge = document.createElement("span");
      badge.className = "kollective-featured-event-badge";
      badge.textContent = "KOLLECTIVE FEATURED · GROWN-ISH";
      featured.prepend(badge);
    }
  }

  const popupTitle = root.querySelector<HTMLElement>("#company-profile-title");
  const popupName = popupTitle?.textContent?.trim();
  const still = entityPopupStill(popupName);
  const popupArticle = popupTitle?.closest("article");
  const popupMedia = popupArticle?.querySelector<HTMLElement>("[class*='companySheetMedia']");

  if (still && popupMedia) {
    popupMedia.setAttribute("data-kollective-entity-still", "true");
    popupMedia.dataset.kollectiveEntityStillUrl = still;
    popupMedia.style.backgroundImage = `url("${still}")`;
    popupMedia.style.backgroundPosition = "center";
    popupMedia.style.backgroundRepeat = "no-repeat";
    popupMedia.style.backgroundSize = "contain";
  }
}

export default function CustomerAppEnhancer() {
  useEffect(() => {
    let disposed = false;
    let payload: EnhancementPayload | null = null;
    let scheduled = false;

    const run = () => {
      if (disposed || !payload || scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        if (!disposed && payload) enhance(payload);
      });
    };

    fetch("/api/customer/home", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Directory unavailable"))))
      .then((data: EnhancementPayload) => {
        payload = data;
        run();
      })
      .catch(() => undefined);

    const observer = new MutationObserver(run);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", run);

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("hashchange", run);
    };
  }, []);

  return null;
}
