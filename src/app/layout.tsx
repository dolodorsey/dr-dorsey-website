import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Dorsey · The Kollective Hospitality Group",
  description: "The Architecture of a Modern Empire. A founder-led multi-brand ecosystem spanning hospitality, events, culture, products, and technology across 8 cities and 50+ ventures.",
  keywords: "Dr. Dorsey, The Kollective Hospitality Group, KHG, HugLife Events, Forever Futbol, Casper Group, Atlanta, empire, hospitality",
  openGraph: {
    title: "Dr. Dorsey · The Kollective Hospitality Group",
    description: "The Architecture of a Modern Empire.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
