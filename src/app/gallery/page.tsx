import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our portfolio of boat restoration projects. Before-and-after photos showcasing exterior, interior, and custom work across the Swedish West Coast.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
