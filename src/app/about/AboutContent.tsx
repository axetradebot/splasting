"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gem, Handshake, Hammer, Phone } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/config/contact";

const values = [
  {
    icon: Gem,
    title: "Kvalitet",
    description:
      "Vi tar aldrig genvägar. Varje restaurering uppfyller de högsta standarderna för skandinaviskt hantverk.",
  },
  {
    icon: Handshake,
    title: "Integritet",
    description:
      "Ärlig kommunikation, transparenta priser och genuint engagemang för varje kund och deras båt.",
  },
  {
    icon: Hammer,
    title: "Hantverk",
    description:
      "Vi är hantverkare i hjärtat. Varje projekt hanteras med passion, skicklighet och noggrann uppmärksamhet på detaljer.",
  },
];

export default function AboutContent() {
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
              <span className="text-text-primary">Om Oss</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Om <span className="text-gradient">Oss</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Med över 10 års erfarenhet inom glasfiber- och träbåtsreparationer
              med fokus på kvalitet, hållbarhet och resultat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center">
              {/* TODO: Replace with real team/owner photo — high priority for trust */}
              <span className="text-white/10 font-heading text-4xl font-bold">
                Foto
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Möt <span className="text-gradient">Erik</span>
            </h2>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>
                Med över 10 års erfarenhet inom glasfiber- och träbåtsreparationer
                erbjuder vi noggrant utförda arbeten med fokus på kvalitet,
                hållbarhet och resultat.
              </p>
              <p>
                Vi är baserade i Göteborg och ute på Klöverön, men som ett mobilt
                företag arbetar vi runt hela västkusten och tar även uppdrag i
                andra delar av Sverige vid önskemål.
              </p>
              <p>
                Vårt mål är alltid detsamma – att leverera ett arbete vi kan vara
                stolta över. Vi utvecklas ständigt, arbetar med stor noggrannhet
                och strävar alltid efter högsta möjliga kvalitet i varje projekt.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-text-secondary">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
                ✅ F-skatt registrerad
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
                🛡️ Fullständigt försäkrad
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
                ⭐ 10+ Års Erfarenhet
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values section */}
      <section className="py-20 px-6 bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Vårt <span className="text-gradient">Löfte</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Principerna som vägleder varje restaurering vi utför.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <Card className="h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 mb-5">
                    <value.icon
                      size={30}
                      className="text-accent-primary"
                    />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Redo att Arbeta Med Oss?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Låt oss diskutera ditt projekt och förverkliga din vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/quote" size="lg">
              Begär Offert
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Kontakta Oss
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Sticky bottom CTA — mobile only */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 px-3 pb-2 safe-bottom">
        <div className="flex items-center gap-2 glass-card-strong rounded-xl p-2">
          <Button href="/quote" size="sm" className="flex-1 text-sm py-3 justify-center">
            Begär Offert
          </Button>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="flex items-center justify-center gap-2 flex-1 text-sm py-3 rounded-xl bg-bg-elevated border border-glass-border text-text-primary font-heading font-semibold"
          >
            <Phone size={16} className="text-accent-primary" />
            Ring Oss
          </a>
        </div>
      </div>
    </>
  );
}
