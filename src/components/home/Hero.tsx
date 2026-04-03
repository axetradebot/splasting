"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Star, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const words = ["Välkommen", "till", "Special", "Plastning", "&", "Målning"];

const services = [
  "Plastskador",
  "Underhåll",
  "Blästring",
  "Epoxi Behandling",
  "Swimmingpool",
];

const trustBadges = [
  { icon: BadgeCheck, label: "Free Quotes" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Shield, label: "Satisfaction Guaranteed" },
];

function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 animate-ken-burns">
          {/* TODO: Replace with actual hero image - public/images/hero.jpg */}
          <div className="w-full h-full bg-gradient-to-br from-[#070b14] via-bg-primary to-[#0c1829]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating glow orbs */}
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
        <GlowOrb
          color="rgba(14,165,233,0.1)"
          size={300}
          x={["50%", "70%", "50%"]}
          y={["10%", "50%", "10%"]}
          duration={15}
          delay={6}
        />

        {/* Particles */}
        <Particles />

        {/* Gradient fade to content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-6 md:pt-20">
        {/* Logo — animates in FIRST */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            delay: 0,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex justify-center mb-6 md:hidden"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(14,165,233,0)",
                "0 0 40px rgba(14,165,233,0.3)",
                "0 0 0px rgba(14,165,233,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/logo.jpg"
              alt="Special Plastning & Målning Västkusten"
              width={140}
              height={140}
              priority
              className="rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Flag + tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-text-secondary text-sm md:text-base tracking-wider uppercase">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🇸🇪
            </motion.span>
            Sweden&apos;s Trusted Boat Restoration Specialists
          </span>
        </motion.div>

        {/* Main headline — blur-to-sharp + scale + y per word */}
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          {words.map((word, i) => {
            const isHighlight =
              word === "Special" || word === "Plastning" || word === "Målning";
            return (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.8,
                  filter: "blur(12px)",
                  rotateX: 45,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                }}
                transition={{
                  delay: 1.0 + i * 0.12,
                  duration: 0.7,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className={`inline-block mr-[0.3em] ${
                  isHighlight ? "hero-shimmer" : ""
                }`}
                style={{ perspective: "600px" }}
              >
                {word}
              </motion.span>
            );
          })}
        </h1>

        {/* Animated divider line */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            style={{ maxWidth: 200 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-accent-primary"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 2.2, duration: 0.4 }}
          />
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            style={{ maxWidth: 200 }}
          />
        </motion.div>

        {/* Subtitle — "Din pålitliga partner för" + staggered service tags */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="text-text-secondary text-base md:text-lg mb-4"
        >
          Din pålitliga partner för
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {services.map((service, i) => (
            <motion.span
              key={service}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 2.1 + i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-flex items-center px-4 py-2 rounded-full glass-card text-text-primary text-sm md:text-base font-medium hover:border-accent-primary/30 transition-colors duration-300 cursor-default"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-2"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
              {service}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.8,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button href="/quote" size="lg" breathe>
            Get a Free Quote
          </Button>
          <Button href="/services" variant="ghost" size="lg">
            Our Services
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-2.5 text-text-secondary text-sm"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
              >
                <badge.icon size={18} className="text-accent-primary" />
              </motion.div>
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12 flex flex-col items-center gap-2 cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.span
          className="text-text-secondary/40 text-xs tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-accent-primary/50" />
        </motion.div>
      </motion.button>

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />
    </section>
  );
}
