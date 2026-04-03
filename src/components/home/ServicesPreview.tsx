"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Sun, Sparkles } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Exterior Restoration",
    description:
      "Hull repair, gelcoat restoration, professional polishing, and anti-fouling treatments that protect and beautify.",
    tags: ["UV Protection", "Gelcoat Repair", "Anti-Fouling"],
    icon: Sun,
    gradient: "from-sky-500/20 to-blue-600/20",
  },
  {
    title: "Interior Restoration",
    description:
      "Complete interior refinishing — upholstery, plastering, woodwork, and detailing to make your cabin feel brand new.",
    tags: ["Upholstery", "Plastering", "Refinishing"],
    icon: Sparkles,
    gradient: "from-cyan-500/20 to-teal-600/20",
  },
  {
    title: "Custom Work",
    description:
      "Bespoke modifications and custom finishes tailored to your vision. From concept to completion, we bring ideas to life.",
    tags: ["Bespoke Design", "Custom Finishes", "Modifications"],
    icon: Shield,
    gradient: "from-amber-500/20 to-orange-600/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Professional Restoration For Every Vessel"
          highlight="Every Vessel"
          subtitle="From hull to helm, we deliver comprehensive restoration services that exceed expectations."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link href="/services" className="block group">
                <div className="glass-card rounded-2xl overflow-hidden h-full">
                  {/* Image placeholder */}
                  <div
                    className={`relative h-48 md:h-56 bg-gradient-to-br ${service.gradient}`}
                  >
                    {/* TODO: Add real service images */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <service.icon
                        size={48}
                        className="text-white/30"
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-bg-primary/80 to-transparent" />
                    {/* Tags */}
                    <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-accent-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Learn More{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
