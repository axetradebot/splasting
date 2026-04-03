"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gem, Handshake, Hammer } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const values = [
  {
    icon: Gem,
    title: "Quality",
    description:
      "We never cut corners. Every restoration meets the highest standards of Scandinavian craftsmanship.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description:
      "Honest communication, transparent pricing, and genuine care for every customer and their vessel.",
  },
  {
    icon: Hammer,
    title: "Craft",
    description:
      "We are artisans at heart. Each project is approached with passion, skill, and meticulous attention to detail.",
  },
];

export default function AboutContent() {
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
              <span className="text-text-primary">About</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About <span className="text-gradient">Us</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The story behind Marstrand&apos;s trusted boat restoration
              specialists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <AnimatedSection>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center">
              {/* TODO: Replace with real team/owner photo */}
              <span className="text-white/10 font-heading text-4xl font-bold">
                Photo
              </span>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Passion for <span className="text-gradient">Perfection</span>
            </h2>
            {/* TODO: Replace with real business story */}
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Based in the historic maritime town of Marstrand on
                Sweden&apos;s stunning West Coast, Special Plastning & Målning
                Västkusten was born from a deep love for the sea and the craft
                of boat restoration.
              </p>
              <p>
                With years of experience in professional plastering, painting,
                and marine restoration, we bring a level of precision and care
                that transforms vessels from worn to extraordinary. Every hull we
                restore, every interior we refinish, reflects our commitment to
                excellence.
              </p>
              <p>
                We believe that every boat has a story worth preserving. Whether
                it&apos;s a classic wooden sailboat or a modern motor yacht, we
                treat each project as if it were our own — because that&apos;s
                the only standard we know.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 px-6 bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Promise</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The principles that guide every restoration we undertake.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <Card className="h-full text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 mb-5"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  >
                    <value.icon
                      size={30}
                      className="text-accent-primary"
                    />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team section placeholder */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Meet the <span className="text-gradient">Team</span>
            </h2>
            {/* TODO: Replace with real owner/team photo and bio */}
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white/20 text-2xl font-bold">👤</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-2">
                {/* TODO: Add real name */}
                Owner Name
              </h3>
              <p className="text-accent-primary text-sm mb-4">
                Founder & Lead Craftsman
              </p>
              <p className="text-text-secondary max-w-lg mx-auto leading-relaxed">
                {/* TODO: Add real bio */}
                With a passion for marine craftsmanship and years of experience
                in professional restoration, our founder brings expertise,
                dedication, and a personal touch to every project.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/quote" size="lg">
              Get a Quote
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
