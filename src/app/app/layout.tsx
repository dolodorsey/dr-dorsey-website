import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Kollective — Events, Brands & Experiences",
  description: "A simplified mobile front door to the Kollective: discover events, brands, experiences, and Good Times energy.",
  applicationName: "Kollective",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kollective",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/kollective-app-icon.svg",
    apple: "/kollective-app-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
};

export default function CustomerAppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
