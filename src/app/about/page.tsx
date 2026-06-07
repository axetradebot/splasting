import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Med över 10 års erfarenhet inom glasfiber- och träbåtsreparationer. Baserade i Göteborg och Klöverön, vi arbetar runt hela västkusten.",
};

export default function AboutPage() {
  return <AboutContent />;
}
