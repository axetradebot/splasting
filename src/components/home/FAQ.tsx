"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "What types of boats do you work on?",
    a: "We work on all types of vessels — sailboats, motorboats, wooden classics, and modern fiberglass hulls. Whether it's a 20-foot day cruiser or a 60-foot yacht, we have the experience and tools to deliver exceptional results.",
  },
  {
    q: "How long does a typical restoration take?",
    a: "Timeline depends on the scope of work. A standard exterior polish and gelcoat repair typically takes 2–5 days. Full interior restorations can take 1–3 weeks. We'll provide a detailed timeline with your quote.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Absolutely! We provide free, no-obligation quotes for all our services. Simply fill out our quote form or give us a call, and we'll get back to you within a few hours.",
  },
  {
    q: "What areas do you serve?",
    a: "We're based in Marstrand and serve the entire Swedish West Coast, including Gothenburg, Kungälv, Stenungsund, Tjörn, and Orust. We can also arrange service for boats in other locations — just ask!",
  },
  {
    q: "What's included in an exterior restoration?",
    a: "Our exterior restoration typically includes hull cleaning and preparation, gelcoat repair, oxidation removal, machine polishing, anti-fouling treatment, and a protective wax finish. We tailor each job to your boat's specific needs.",
  },
  {
    q: "Can I see examples of your work?",
    a: "Of course! Visit our Gallery page to see before-and-after photos of our recent projects. We're proud of every restoration we complete and love sharing the results.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-6 bg-bg-secondary/50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          highlight="Questions"
          subtitle="Got questions? We've got answers."
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
                  <span className="font-heading font-medium text-text-primary pr-4">
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
                      <div className="px-5 pb-5 text-text-secondary leading-relaxed">
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
