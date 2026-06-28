import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import MapTextures from "@/components/MapTextures";
import RouteAnimation from "@/components/RouteAnimation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chronicle-compass-demo.vercel.app"),
  title: "Chronicle & Compass | Personal Luxury Travel Advisor",
  description:
    "A boutique travel advisor crafting custom itineraries for cruises, safaris, Europe, and off-the-grid trips. IATA and CLIA accredited. Every journey starts with a complimentary call.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Chronicle & Compass | Personal Luxury Travel Advisor",
    description: "Custom itineraries, planned by a real person you can trust. IATA and CLIA accredited.",
    url: "https://chronicle-compass-demo.vercel.app",
    siteName: "Chronicle & Compass",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Chronicle & Compass Travel",
  description: "Boutique personal travel advisor for luxury escapes, cruises, safaris, and custom itineraries.",
  url: "https://chronicle-compass-demo.vercel.app",
  telephone: "+1-630-310-2861",
  email: "kristycontreras@chronicle-compass.com",
  founder: { "@type": "Person", name: "Kristy Contreras" },
  areaServed: "Worldwide",
  hasCredential: ["IATA Accredited", "CLIA Member", "Fora Certified Advisor"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body className="font-sans text-navy">
        <MapTextures />
        <RouteAnimation />
        {children}
      </body>
    </html>
  );
}
