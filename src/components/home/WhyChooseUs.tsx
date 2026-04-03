"use client";

import { motion } from "framer-motion";
import { Palette, Coins, CalendarCheck, CircleCheckBig } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Palette,
    title: "Master Craftsmen",
    description:
      "Years of hands-on boat restoration experience with meticulous attention to every detail.",
  },
  {
    icon: Coins,
    title: "Honest Pricing",
    description:
      "Transparent quotes with no hidden fees. You know exactly what you're paying for.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description:
      "Get a detailed quote and schedule your restoration in just minutes.",
  },
  {
    icon: CircleCheckBig,
    title: "Guaranteed Results",
    description:
      "We stand behind every job with our satisfaction guarantee. Your boat deserves the best.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Why Choose Us"
          highlight="Choose"
          subtitle="We combine traditional craftsmanship with modern techniques to deliver exceptional results every time."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-primary/10 mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <feature.icon
                    size={26}
                    className="text-accent-primary"
                  />
                </motion.div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
