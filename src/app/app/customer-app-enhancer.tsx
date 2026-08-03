"use client";

import { useEffect } from "react";

const EMBLEM =
  "https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png";

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
