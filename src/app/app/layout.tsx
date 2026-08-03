import type { Metadata, Viewport } from "next";
import "./customer-emblem.css";
import "./customer-ui-continuity.css";
import "./customer-app-enhancements.css";
import "./mobile-card-grid.css";

const title = "The Kollective App — Members, Events & Direct Access";
const description = "Create your Kollective account to access Grown-Ish, reservations, member perks, brands, and direct customer connections.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thekollectivehospitality.com"),
  title,
  description,
  applicationName: "The Kollective",
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
    title: "The Kollective",
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
    siteName: "The Kollective",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Kollective customer app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/app/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function CustomerAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-kollective-app data-brand="kollective">
      {children}
    </div>
  );
}
