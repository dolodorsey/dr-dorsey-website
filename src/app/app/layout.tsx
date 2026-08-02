import type { Metadata, Viewport } from "next";
import "./customer-emblem.css";
import "./customer-ui-continuity.css";

const title = "Kollective — Events, Brands & Experiences";
const description = "A simplified mobile front door to the Kollective: discover events, brands, experiences, and Good Times energy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thekollectivehospitality.com"),
  title,
  description,
  applicationName: "Kollective",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/app",
  },
  icons: {
    icon: [{ url: "/app/icon", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/app/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kollective",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    title,
    description,
    url: "/app",
    siteName: "Kollective",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

/**
 * The customer app is a KOLLECTIVE product, not a Dorsey one. Declaring the
 * brand here hands it the Kollective palette from src/lib/brand-tokens.ts —
 * the same tokens thekollectivehospitality.com uses — so it can never drift
 * onto the founder palette again.
 */
export default function CustomerAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-kollective-app data-brand="kollective">
      {children}
    </div>
  );
}
