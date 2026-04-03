import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Special Plastning & Målning Västkusten. Located in Marstrand, Sweden — serving the entire Swedish West Coast.",
};

export default function ContactPage() {
  return <ContactContent />;
}
