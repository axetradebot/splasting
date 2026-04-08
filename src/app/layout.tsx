import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileTabBar from "@/components/layout/MobileTabBar";
import FloatingButtons from "@/components/layout/FloatingButtons";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Special Plastning & Målning Västkusten | Boat Restoration Marstrand",
    template: "%s | Special Plastning & Målning Västkusten",
  },
  description:
    "Premium båtrestaurering i Marstrand, Sverige. Expert spackling, skrovreparation, gelcoat-restaurering och specialfinish längs Svenska Västkusten.",
  keywords: [
    "båtrestaurering",
    "Marstrand",
    "Sverige",
    "båtspackling",
    "skrovreparation",
    "gelcoat restaurering",
    "Svenska Västkusten",
    "boat restoration Sweden",
  ],
  openGraph: {
    title: "Special Plastning & Målning Västkusten",
    description:
      "Premium båtrestaurering i Marstrand, Sverige. Professionellt hantverk, enastående resultat.",
    type: "website",
    locale: "sv_SE",
    url: "https://specialplastning.se",
    siteName: "Special Plastning & Målning Västkusten",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Special Plastning & Målning Västkusten",
    description:
      "Premium boat interior and exterior restoration in Marstrand, Sweden.",
    url: "https://specialplastning.se",
    telephone: "+46000000000",
    email: "info@specialplastning.se",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marstrand",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 57.8884,
      longitude: 11.59,
    },
    areaServed: "Swedish West Coast",
    priceRange: "$$",
  };

  return (
    <html
      lang="sv"
      className={`${dmSans.variable} ${outfit.variable}`}
      style={{ backgroundColor: "#ffffff" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <MobileTabBar />
      </body>
    </html>
  );
}
