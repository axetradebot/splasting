"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Exteriör Restaurering",
    description:
      "Skrovreparation, gelcoat-restaurering, professionell polering och bottenmålning som skyddar och förskönar.",
    tags: ["UV-Skydd", "Gelcoat", "Bottenmålning"],
    image:
      "/images/special_plastning_1759043440_3731449288560506059_68356511885.jpg",
  },
  {
    title: "Interiör Restaurering",
    description:
      "Komplett interiör renovering — klädsel, spackling, träarbeten och detaljarbete för att ge din kajuta nytt liv.",
    tags: ["Klädsel", "Spackling", "Renovering"],
    image:
      "/images/special_plastning_1726561199_3458968500960888356_68356511885.jpg",
  },
  {
    title: "Specialarbeten",
    description:
      "Skräddarsydda modifikationer och specialfinish efter din vision. Från idé till färdigt resultat.",
    tags: ["Skräddarsytt", "Specialfinish", "Modifikationer"],
    image:
      "/images/special_plastning_1726561199_3458968500960872617_68356511885.jpg",
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
          title="Professionell Restaurering För Varje Fartyg"
          highlight="Varje Fartyg"
          subtitle="Från köl till mast levererar vi heltäckande restaureringstjänster som överträffar förväntningarna."
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
                  <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-accent-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent-primary text-base font-medium group-hover:gap-2 transition-all">
                      Läs Mer{" "}
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
