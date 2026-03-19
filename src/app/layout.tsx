import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030303',
};

export const metadata: Metadata = {
  title: "Dr. Dorsey · The Kollective Hospitality Group",
  description: "The Architecture of a Modern Empire. A founder-led multi-brand ecosystem spanning hospitality, events, food & beverage, museums, products, and technology — 8 cities, 57+ ventures.",
  keywords: "Dr. Dorsey, The Kollective Hospitality Group, KHG, HugLife Events, Forever Futbol, Casper Group, Good Times, Infinity Water, Pronto Energy, Atlanta, hospitality, events, empire",
  openGraph: {
    title: "Dr. Dorsey · The Kollective Hospitality Group",
    description: "The Architecture of a Modern Empire. 57+ ventures across 8 cities.",
    type: "website",
    siteName: "Dr. Dorsey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Dorsey · KHG",
    description: "The Architecture of a Modern Empire.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
