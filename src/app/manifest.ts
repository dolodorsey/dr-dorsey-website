import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/app",
    name: "Kollective",
    short_name: "Kollective",
    description: "Events, brands, experiences, and the best of the Kollective in one simplified app.",
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
      { name: "RSVP", short_name: "RSVP", url: "/app#events" },
      { name: "Pay table deposit", short_name: "Deposit", url: "/app/table-deposit" },
    ],
  };
}
