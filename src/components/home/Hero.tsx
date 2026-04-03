"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Star, BadgeCheck, Clock } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const words = ["Välkommen", "till", "Special", "Plastning", "&", "Målning"];

const services = [
  "Plastskador",
  "Underhåll",
  "Blästring",
  "Epoxi",
  "Swimmingpool",
];

const trustBadges = [
  { icon: BadgeCheck, label: "Gratis Offert" },
  { icon: Star, label: "5-Stjärnigt Betyg" },
  { icon: Shield, label: "Nöjdhetsgaranti" },
  { icon: Clock, label: "10+ Års Erfarenhet" },
];

function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, Math.random() * 60 - 30, Math.random() * 80 - 40],
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function GlowOrb({
  color,
  size,
  x,
  y,
  duration,
  delay,
}: {
  color: string;
  size: number;
  x: [string, string, string];
  y: [string, string, string];
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: color,
        left: x[0],
        top: y[0],
      }}
      animate={{
        left: x,
        top: y,
        scale: [1, 1.3, 0.9, 1],
        opacity: [0.15, 0.25, 0.1, 0.15],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-ken-burns">
          {/* TODO: Replace with actual hero image - public/images/hero.jpg */}
          <div className="w-full h-full bg-gradient-to-br from-[#070b14] via-bg-primary to-[#0c1829]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <GlowOrb
          color="rgba(14,165,233,0.2)"
          size={400}
          x={["10%", "30%", "10%"]}
          y={["20%", "60%", "20%"]}
          duration={18}
          delay={0}
        />
        <GlowOrb
          color="rgba(6,182,212,0.15)"
          size={350}
          x={["70%", "50%", "70%"]}
          y={["60%", "20%", "60%"]}
          duration={22}
          delay={3}
        />

        <Particles />

        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      </div>

      {/* === CONTENT — fills available space, centered === */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-5 text-center pb-20 md:pb-0">
        {/* Logo — mobile only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-3 md:hidden"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(14,165,233,0)",
                "0 0 40px rgba(14,165,233,0.3)",
                "0 0 0px rgba(14,165,233,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/logo.jpg"
              alt="Special Plastning & Målning Västkusten"
              width={130}
              height={130}
              priority
              className="rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Flag + tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-3 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-card text-text-secondary text-xs md:text-base tracking-wider uppercase">
            🇸🇪 Sveriges Pålitliga Båtrestaureringsspecialister
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 md:mb-6">
          {words.map((word, i) => {
            const isHighlight =
              word === "Special" || word === "Plastning" || word === "Målning";
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.5 + i * 0.08,
                  duration: 0.5,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className={`inline-block mr-[0.3em] ${isHighlight ? "hero-shimmer" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Animated divider line */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-3 md:mb-6 w-full"
          style={{ maxWidth: 420 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <motion.div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" as const }}
            style={{ transformOrigin: "right" }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 1.3, duration: 0.3 }}
          />
          <motion.div
            className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" as const }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="text-text-secondary text-base md:text-lg mb-2 md:mb-4"
        >
          Din pålitliga partner för
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 mb-5 md:mb-10">
          {services.map((service, i) => (
            <motion.span
              key={service}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.2 + i * 0.08,
                duration: 0.4,
              }}
              className="inline-flex items-center px-3.5 py-1.5 md:px-4 md:py-2 rounded-full glass-card text-text-primary text-sm md:text-base font-medium cursor-default"
            >
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent-primary mr-1.5 md:mr-2" />
              {service}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex flex-row items-center justify-center gap-3 mb-5 md:mb-10"
        >
          <Button href="/quote" size="sm" breathe className="text-base px-7 py-4 sm:px-9 sm:py-4 sm:text-lg">
            Begär Gratis Offert
          </Button>
          <Button href="/services" variant="ghost" size="sm" className="text-base px-7 py-4 sm:px-9 sm:py-4 sm:text-lg">
            Våra Tjänster
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="grid grid-cols-2 gap-x-4 gap-y-1.5 md:flex md:flex-wrap md:items-center md:justify-center md:gap-8 max-w-xs md:max-w-none mx-auto"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-1.5 md:gap-2 text-text-secondary text-sm md:text-sm"
            >
              <badge.icon size={16} className="text-accent-primary md:w-[18px] md:h-[18px]" />
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* === SCROLL INDICATOR — visible on all screens === */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="relative z-10 flex flex-col items-center gap-1 pb-20 md:pb-8 cursor-pointer"
        aria-label="Scrolla ner"
      >
        <motion.span
          className="text-text-secondary/40 text-xs tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-accent-primary/50" />
        </motion.div>
      </motion.button>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />
    </section>
  );
}
