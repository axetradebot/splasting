"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gem, Handshake, Hammer, Phone } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
      "Ärlig kommunikation, transparenta priser och genuint engagemang för varje kund och deras fartyg.",
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
              Historien bakom Marstrands pålitliga
              båtrestaureringsspecialister.
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
              Passion för <span className="text-gradient">Perfektion</span>
            </h2>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>
                Baserade i den historiska sjöstaden Marstrand på Sveriges
                vackra Västkust, föddes Special Plastning & Målning Västkusten
                ur en djup kärlek till havet och hantverket att restaurera
                båtar.
              </p>
              <p>
                Med 15+ års erfarenhet av professionell spackling, målning och
                marin restaurering tillför vi en nivå av precision och omsorg
                som förvandlar fartyg från slitna till extraordinära. Varje
                skrov vi restaurerar, varje interiör vi renoverar, speglar
                vårt engagemang för excellens.
              </p>
              <p>
                Vi tror att varje båt har en historia värd att bevara. Oavsett
                om det är en klassisk segelbåt i trä eller en modern
                motoryacht behandlar vi varje projekt som om det vore vårt
                eget — för det är den enda standard vi känner.
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
                ⭐ 15+ Års Erfarenhet
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

      {/* Team section placeholder */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Möt <span className="text-gradient">Teamet</span>
            </h2>
            {/* TODO: Replace with real owner/team photo and bio — critical for trust */}
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white/20 text-2xl font-bold">👤</span>
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-2">
                {/* TODO: Add real name */}
                Ägarens Namn
              </h3>
              <p className="text-accent-primary text-sm mb-4">
                Grundare & Ledande Hantverkare
              </p>
              <p className="text-text-secondary text-base max-w-lg mx-auto leading-relaxed">
                {/* TODO: Add real bio */}
                Med en passion för marint hantverk och mångårig erfarenhet
                av professionell restaurering tillför vår grundare expertis,
                engagemang och en personlig touch till varje projekt.
              </p>
            </div>
          </AnimatedSection>
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
            href="tel:+46000000000"
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
