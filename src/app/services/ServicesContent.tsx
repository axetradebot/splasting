"use client";

import { motion } from "framer-motion";
import {
  Sun,
  Sparkles,
  Shield,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

const services = [
  {
    id: "exterior",
    icon: Sun,
    title: "Exterior Restoration",
    description:
      "Bring your boat's exterior back to life with our comprehensive restoration process. From hull repair to a showroom-quality finish.",
    gradient: "from-sky-500/20 to-blue-600/20",
    features: [
      "Hull cleaning and preparation",
      "Gelcoat repair and restoration",
      "Oxidation removal",
      "Machine polishing to mirror finish",
      "Anti-fouling treatment",
      "Protective wax coating",
      "UV protection application",
    ],
    /* TODO: Add real service details and images */
  },
  {
    id: "interior",
    icon: Sparkles,
    title: "Interior Restoration",
    description:
      "Transform your boat's interior with expert plastering, upholstery work, and meticulous refinishing. We make cabins feel brand new.",
    gradient: "from-cyan-500/20 to-teal-600/20",
    features: [
      "Surface plastering and repair",
      "Interior painting and finishing",
      "Woodwork restoration",
      "Upholstery repair and replacement",
      "Detail cleaning and protection",
      "Custom cabinetry touch-ups",
      "Headliner replacement",
    ],
    /* TODO: Add real service details and images */
  },
  {
    id: "custom",
    icon: Shield,
    title: "Custom Work",
    description:
      "Have something specific in mind? We specialize in bespoke modifications and custom finishes that bring your vision to life.",
    gradient: "from-amber-500/20 to-orange-600/20",
    features: [
      "Bespoke design consultation",
      "Custom paint and finishes",
      "Structural modifications",
      "Specialty coatings",
      "One-off fabrication",
      "Color matching and custom blends",
      "Concept to completion service",
    ],
    /* TODO: Add real service details and images */
  },
];

export default function ServicesContent() {
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
              <span className="text-text-primary">Services</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              From hull to helm — comprehensive restoration services tailored to
              your vessel&apos;s needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 px-6 ${index % 2 === 1 ? "bg-bg-secondary/50" : ""}`}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image placeholder */}
              <AnimatedSection
                className={index % 2 === 1 ? "md:order-2" : ""}
              >
                <div
                  className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                >
                  {/* TODO: Replace with real service image */}
                  <service.icon
                    size={80}
                    className="text-white/20"
                  />
                </div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection
                className={index % 2 === 1 ? "md:order-1" : ""}
                delay={0.1}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <service.icon
                      size={24}
                      className="text-accent-primary"
                    />
                  </div>
                  <h2 className="font-heading text-3xl font-bold">
                    {service.title}
                  </h2>
                </div>

                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* TODO: Add real service details */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-text-secondary"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-accent-primary flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button href="/quote">Get a Quote</Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center">
        <SectionHeading
          title="Not Sure What You Need?"
          highlight="Need"
          subtitle="Contact us for a free consultation. We'll inspect your boat and recommend the best approach."
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/quote" size="lg">
            Request a Quote
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
