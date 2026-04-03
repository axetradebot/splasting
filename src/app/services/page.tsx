import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive boat restoration services — exterior restoration, interior refinishing, and custom work. Serving Marstrand and the Swedish West Coast.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
