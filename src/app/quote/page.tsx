import type { Metadata } from "next";
import QuoteContent from "./QuoteContent";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free, no-obligation quote for your boat restoration project. We'll respond within hours with a detailed estimate.",
};

export default function QuotePage() {
  return <QuoteContent />;
}
