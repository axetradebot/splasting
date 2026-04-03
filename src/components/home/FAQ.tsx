"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Vilka typer av båtar arbetar ni med?",
    a: "Vi arbetar med alla typer av fartyg — segelbåtar, motorbåtar, klassiska träbåtar och moderna glasfiberskrov. Oavsett om det är en 20-fots dagskryssare eller en 60-fots yacht har vi erfarenheten och verktygen för att leverera exceptionella resultat.",
  },
  {
    q: "Hur lång tid tar en typisk restaurering?",
    a: "Tidsramen beror på arbetets omfattning. En standard exteriörpolering och gelcoat-reparation tar vanligtvis 2–5 dagar. Kompletta interiörrenoveringar kan ta 1–3 veckor. Vi ger en detaljerad tidsplan med din offert.",
  },
  {
    q: "Erbjuder ni gratis offerter?",
    a: "Absolut! Vi erbjuder gratis, förutsättningslösa offerter för alla våra tjänster. Fyll bara i vårt offertformulär eller ring oss, så återkommer vi inom ett par timmar.",
  },
  {
    q: "Vilka områden betjänar ni?",
    a: "Vi är baserade i Marstrand och betjänar hela Svenska Västkusten, inklusive Göteborg, Kungälv, Stenungsund, Tjörn och Orust. Vi kan även arrangera service för båtar på andra platser — fråga bara!",
  },
  {
    q: "Vad ingår i en exteriörrestaurering?",
    a: "Vår exteriörrestaurering omfattar vanligtvis skrovrengöring och förberedelse, gelcoat-reparation, oxidationsborttagning, maskinpolering, bottenmålning och en skyddande vaxfinish. Vi anpassar varje jobb efter din båts specifika behov.",
  },
  {
    q: "Kan jag se exempel på ert arbete?",
    a: "Självklart! Besök vår Galleri-sida för att se före-och-efter-foton av våra senaste projekt. Vi är stolta över varje restaurering vi utför och delar gärna resultaten.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Vanliga Frågor"
          highlight="Frågor"
          subtitle="Har du frågor? Vi har svaren."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-heading font-medium text-text-primary pr-4 text-base">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      size={20}
                      className="text-text-secondary"
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-text-secondary leading-relaxed text-base">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
