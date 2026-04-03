"use client";

import { motion } from "framer-motion";
import { Palette, Coins, CalendarCheck, CircleCheckBig } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Palette,
    title: "Mästerliga Hantverkare",
    description:
      "Mångårig erfarenhet av båtrestaurering med noggrann omsorg om varje detalj.",
  },
  {
    icon: Coins,
    title: "Ärlig Prissättning",
    description:
      "Transparenta offerter utan dolda avgifter. Du vet alltid vad du betalar för.",
  },
  {
    icon: CalendarCheck,
    title: "Enkel Bokning",
    description:
      "Få en detaljerad offert och boka din restaurering på bara några minuter.",
  },
  {
    icon: CircleCheckBig,
    title: "Garanterade Resultat",
    description:
      "Vi står bakom varje jobb med vår nöjdhetsgaranti. Din båt förtjänar det bästa.",
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
          title="Varför Välja Oss"
          highlight="Välja"
          subtitle="Vi kombinerar traditionellt hantverk med moderna tekniker för att leverera exceptionella resultat varje gång."
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
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-primary/10 mb-4">
                  <feature.icon
                    size={26}
                    className="text-accent-primary"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed">
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
