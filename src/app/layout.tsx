import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060607',
};

export const metadata: Metadata = {
  title: "Dr. DoLo Dorsey — Founder. Architect. Empire Builder.",
  description: "Founder & CEO of The Kollective Hospitality Group. 57+ ventures across 8 cities. Live for today, plan for tomorrow, party tonight.",
  keywords: "Dr. Dorsey, DoLo Dorsey, The Kollective Hospitality Group, KHG, HugLife Events, Forever Futbol, Casper Group, Good Times, Atlanta, hospitality, events, empire builder",
  openGraph: {
    title: "Dr. DoLo Dorsey — Empire Builder",
    description: "Founder & CEO of The Kollective Hospitality Group. 57+ ventures. 8 cities. One frequency.",
    type: "website",
    siteName: "Dr. DoLo Dorsey",
    images: ['https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website/hero-bg.jpg'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. DoLo Dorsey — Empire Builder",
    description: "57+ ventures. 8 cities. One frequency.",
  },
  icons: {
    icon: 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/00-brand-assets/logos/kollective-emblem-gold-white.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context": "https://schema.org", "@type": "Person", "name": "Dr. DoLo Dorsey", "jobTitle": "Founder & CEO", "worksFor": {"@type": "Organization", "name": "The Kollective Hospitality Group"}, "url": "https://doctordorsey.com", "sameAs": ["https://instagram.com/dolodorsey"], "knowsAbout": ["Hospitality", "Event Production", "Food & Beverage", "Entertainment", "Technology"]}' }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
