import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/app",
    name: "The Kollective",
    short_name: "Kollective",
    description: "Member access to Grown-Ish, reservations, perks, brands, staff, and direct Kollective connections.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#050505",
    theme_color: "#050505",
    categories: ["lifestyle", "entertainment", "business"],
    icons: [
      {
        src: "/app/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    prefer_related_applications: false,
    shortcuts: [
      { name: "Grown-Ish RSVP", short_name: "Grown-Ish", url: "/app#events" },
      { name: "Reserve a table", short_name: "Reserve", url: "/app/forms/reserve-table" },
      { name: "Member perks", short_name: "Perks", url: "/app/forms/member-offers" },
    ],
  };
}
