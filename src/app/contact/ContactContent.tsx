"use client";

import { motion } from "framer-motion";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactContent() {
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
                Hem
              </Link>
              <ChevronRight size={14} />
              <span className="text-text-primary">Kontakt</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Kontakta <span className="text-gradient">Oss</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Vi vill gärna höra från dig. Hör av dig så diskuterar vi ditt
              projekt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
                <h3 className="font-heading text-xl font-semibold">
                  Kontaktinformation
                </h3>

                <a
                  href="tel:+46000000000"
                  className="flex items-center gap-4 text-text-secondary hover:text-accent-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                    <Phone size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary/70 mb-0.5">
                      Telefon
                    </p>
                    <p className="text-text-primary text-base">+46 (0) 00 000 00 00</p>
                  </div>
                </a>

                <a
                  href="mailto:info@specialplastning.se"
                  className="flex items-center gap-4 text-text-secondary hover:text-accent-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                    <Mail size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary/70 mb-0.5">
                      E-post
                    </p>
                    <p className="text-text-primary text-base">
                      info@specialplastning.se
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <MapPin size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary/70 mb-0.5">
                      Plats
                    </p>
                    <p className="text-text-primary text-base">Marstrand, Sverige</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <Clock size={18} className="text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary/70 mb-0.5">
                      Öppettider
                    </p>
                    <p className="text-text-primary text-base">
                      Mån–Fre: 08:00–17:00
                    </p>
                    <p className="text-text-secondary text-sm">
                      Lör–Sön: Efter överenskommelse
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-glass-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8330.42!2d11.59!3d57.8884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464f883a5c86214d%3A0x4073b7c54d322c7c!2sMarstrand!5e0!3m2!1sen!2sse!4v1700000000000!5m2!1sen!2sse"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vår plats i Marstrand, Sverige"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
