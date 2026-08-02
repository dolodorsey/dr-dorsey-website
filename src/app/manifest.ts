import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kollective",
    short_name: "Kollective",
    description: "Events, brands, experiences, and the best of the Kollective in one simplified app.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#070707",
    theme_color: "#070707",
    categories: ["lifestyle", "entertainment", "business"],
    icons: [
      {
        src: "/kollective-app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      {
        name: "Discover events",
        short_name: "Events",
        url: "/app?tab=events",
        icons: [{ src: "/kollective-app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Explore brands",
        short_name: "Brands",
        url: "/app?tab=brands",
        icons: [{ src: "/kollective-app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
    ],
  };
}
