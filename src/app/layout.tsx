import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://doctordorsey.com"),
  title: "Dr. DoLo Dorsey — Founder, Lifestyle Specialist & Enterprise Builder",
  description: "The official platform for Dr. DoLo Dorsey: founder of The Kollective, author of Hakuna Matata, lifestyle specialist, operator and architect of a multi-division enterprise.",
  keywords: "Dr. Dorsey, DoLo Dorsey, The Kollective, Hakuna Matata, enterprise builder, hospitality, technology, consumer brands, Atlanta",
  openGraph: {
    title: "Dr. DoLo Dorsey — Founder, Lifestyle Specialist & Enterprise Builder",
    description: "Meet the founder, explore the current companies, enter The Kollective and take direct action.",
    type: "website",
    siteName: "Dr. DoLo Dorsey",
    images: ['https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website/hero-bg.jpg'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. DoLo Dorsey — Enterprise Builder",
    description: "Founder of The Kollective. Author of Hakuna Matata. Lifestyle specialist building a multi-division enterprise.",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dr. DoLo Dorsey',
              jobTitle: 'Founder & CEO',
              worksFor: { '@type': 'Organization', name: 'The Kollective' },
              url: 'https://doctordorsey.com',
              sameAs: ['https://instagram.com/dolodorsey'],
              knowsAbout: ['Enterprise Architecture', 'Hospitality', 'Brand Strategy', 'Event Production', 'Consumer Products', 'Technology'],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
