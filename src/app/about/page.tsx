import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Special Plastning & Målning Västkusten — Marstrand's trusted boat restoration specialists. Our story, values, and commitment to craftsmanship.",
};

export default function AboutPage() {
  return <AboutContent />;
}
