"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Layers,
  Paintbrush,
  Trees,
  Shield,
  ChevronRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

type Service = {
  id: string;
  icon: typeof Sparkles;
  title: string;
  description: string;
  image: string;
  disclaimer?: string;
  highlights?: string[];
};

const services: Service[] = [
  {
    id: "polering",
    icon: Sparkles,
    title: "Polering & Vaxning",
    description:
      "Ge din båt ett lyft du verkligen ser skillnad på. Med vår 3-stegspolering och skyddande vaxning återfår båten sin djupa glans och ett långvarigt skydd mot väder och slitage.",
    image:
      "/images/special_plastning_1729589628_3484372805142370507_68356511885.jpg",
    highlights: [
      "3-stegspolering för djup glans",
      "Skyddande vaxning",
      "Skydd mot väder och slitage",
    ],
  },
  {
    id: "epoxi",
    icon: Layers,
    title: "Epoxibehandling",
    description:
      "Skydda din investering på riktigt. Vi bygger upp, slipar och behandlar din båtbotten med epoxi i flera lager för ett starkt, hållbart och professionellt resultat.",
    disclaimer:
      "Skrapning eller blästring ingår ej och bokas separat vid behov.",
    image:
      "/images/special_plastning_1759043440_3731449288560506059_68356511885.jpg",
    highlights: [
      "Uppbyggnad och slipning",
      "Flerlagers epoxi på båtbotten",
      "Starkt och långsiktigt skydd",
    ],
  },
  {
    id: "gelcoat",
    icon: Paintbrush,
    title: "Gelcoat-reparation",
    description:
      "Skador händer – vi fixar dem. Med noggrann färgmatchning och hög precision återställer vi ytan så att båten ser ut som ny igen.",
    image:
      "/images/special_plastning_1759411459_3734536459605562494_68356511885.jpg",
    highlights: [
      "Noggrann färgmatchning",
      "Precision återställning av ytan",
      "Resultat som känns som nytt",
    ],
  },
  {
    id: "teak",
    icon: Trees,
    title: "Teaktvätt",
    description:
      "Ge din teak nytt liv. Vår tvåstegsbehandling rengör på djupet och lyfter fram träets naturliga lyster – med möjlighet till skyddande efterbehandling.",
    image:
      "/images/special_plastning_1730359307_3490829337874861622_68356511885.jpg",
    highlights: [
      "Tvåstegsbehandling på djupet",
      "Träets naturliga lyster",
      "Valfri skyddande efterbehandling",
    ],
  },
  {
    id: "special",
    icon: Shield,
    title: "Specialarbeten",
    description:
      "Har du något utöver det vanliga i åtanke? Vi gillar utmaningar – hör av dig så hittar vi en lösning.",
    image:
      "/images/special_plastning_1726561199_3458968500960872617_68356511885.jpg",
    highlights: [
      "Skräddarsydda lösningar",
      "Utmaningar välkomna",
      "Konsultation och genomförande",
    ],
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
                Hem
              </Link>
              <ChevronRight size={14} />
              <span className="text-text-primary">Tjänster</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Våra <span className="text-gradient">Tjänster</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Polering, epoxi, gelcoat, teak och specialarbeten — hantverk
              anpassat efter din båt.
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
              <AnimatedSection
                className={index % 2 === 1 ? "md:order-2" : ""}
              >
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-300/50 border border-slate-200">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <service.icon
                      size={22}
                      className="text-accent-primary"
                    />
                  </div>
                </div>
              </AnimatedSection>

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

                {service.disclaimer && (
                  <div className="flex gap-3 p-4 mb-6 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-sm leading-relaxed">
                    <Info
                      size={20}
                      className="text-amber-600 flex-shrink-0 mt-0.5"
                    />
                    <p>
                      <span className="font-semibold">Observera: </span>
                      {service.disclaimer}
                    </p>
                  </div>
                )}

                {service.highlights && service.highlights.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-text-secondary text-base"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-accent-primary flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Button href="/quote">Begär Offert</Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center">
        <SectionHeading
          title="Osäker på Vad Du Behöver?"
          highlight="Behöver"
          subtitle="Kontakta oss för en gratis konsultation. Vi inspekterar din båt och rekommenderar bästa tillvägagångssättet."
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/quote" size="lg">
            Begär Offert
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Kontakta Oss
          </Button>
        </div>
      </section>
    </>
  );
}
