"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-bg-primary to-accent-secondary/10" />

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-20 opacity-10">
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,100 720,0 1080,50 C1260,75 1380,25 1440,40 L1440,100 L0,100 Z"
            fill="currentColor"
            className="text-accent-primary"
          />
        </svg>
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave-slow"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,20 480,80 720,40 C960,0 1200,60 1440,30 L1440,100 L0,100 Z"
            fill="currentColor"
            className="text-accent-secondary"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl font-bold mb-6"
        >
          Redo att Restaurera{" "}
          <span className="text-gradient">Din Båt?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-text-secondary text-lg mb-10 max-w-xl mx-auto"
        >
          Begär en gratis, förutsättningslös offert idag. Vi har den redo åt dig
          inom ett par timmar.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/quote" size="lg" breathe>
            Begär Gratis Offert
          </Button>
          <Button href="tel:+46000000000" variant="ghost" size="lg">
            Ring Oss Nu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
