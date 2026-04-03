"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import QuoteForm from "@/components/forms/QuoteForm";

const trustItems = [
  {
    icon: Clock,
    title: "Fast Response",
    description: "Average response time: 2 hours",
  },
  {
    icon: Shield,
    title: "No Obligation",
    description: "Free quotes with no strings attached",
  },
  {
    icon: Star,
    title: "5-Star Service",
    description: "Consistently rated by our customers",
  },
];

export default function QuoteContent() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary mb-4">
              <Link
                href="/"
                className="hover:text-accent-primary transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-text-primary">Get a Quote</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Get a Free{" "}
              <span className="text-gradient">Quote</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Tell us about your project and we&apos;ll prepare a detailed,
              no-obligation quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote form + sidebar */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form — 2 cols */}
          <AnimatedSection className="lg:col-span-2">
            <QuoteForm />
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection delay={0.1} className="space-y-6">
            {/* Trust badges */}
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon
                    size={20}
                    className="text-accent-primary"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Quick contact */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-heading font-semibold mb-4">
                Prefer to talk?
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:+46000000000"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-sm"
                >
                  <Phone size={16} className="text-accent-primary" />
                  +46 (0) 00 000 00 00
                </a>
                <a
                  href="mailto:info@specialplastning.se"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-sm"
                >
                  <Mail size={16} className="text-accent-primary" />
                  info@specialplastning.se
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
