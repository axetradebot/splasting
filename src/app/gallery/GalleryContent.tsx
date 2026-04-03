"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";

/* TODO: Replace with real gallery images */
const galleryItems = [
  {
    id: 1,
    title: "Skrovrestaurering — Segelbåt 38ft",
    category: "Exteriör",
    gradient: "from-sky-600/30 to-blue-800/30",
  },
  {
    id: 2,
    title: "Interiör Spackling — Motoryacht",
    category: "Interiör",
    gradient: "from-cyan-600/30 to-teal-800/30",
  },
  {
    id: 3,
    title: "Speciallackering — Raceryacht",
    category: "Special",
    gradient: "from-amber-600/30 to-orange-800/30",
  },
  {
    id: 4,
    title: "Gelcoat-reparation — Dagskryssare",
    category: "Exteriör",
    gradient: "from-indigo-600/30 to-purple-800/30",
  },
  {
    id: 5,
    title: "Kajutrenovering — Klassisk Träbåt",
    category: "Interiör",
    gradient: "from-emerald-600/30 to-green-800/30",
  },
  {
    id: 6,
    title: "Totalrenovering — Veteransegelbåt",
    category: "Exteriör",
    gradient: "from-rose-600/30 to-red-800/30",
  },
  {
    id: 7,
    title: "Specialinteriör — Lyxyacht",
    category: "Special",
    gradient: "from-violet-600/30 to-purple-800/30",
  },
  {
    id: 8,
    title: "Bottenmålning — Fiskebåt",
    category: "Exteriör",
    gradient: "from-blue-600/30 to-sky-800/30",
  },
  {
    id: 9,
    title: "Klädselrestaurering — Kabinkryssare",
    category: "Interiör",
    gradient: "from-teal-600/30 to-cyan-800/30",
  },
];

export default function GalleryContent() {
  const [lightboxItem, setLightboxItem] = useState<
    (typeof galleryItems)[0] | null
  >(null);

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
              <span className="text-text-primary">Galleri</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Våra <span className="text-gradient">Arbeten</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Bläddra bland våra båtrestaureringsprojekt längs Svenska
              Västkusten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid — no filter tabs */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-heading text-6xl font-bold">
                      {item.id}
                    </span>
                  </div>

                  {/* Title + View button overlay — always visible on mobile */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-heading font-semibold text-sm mb-2">
                      {item.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-accent-primary text-sm font-medium">
                      <Eye size={16} />
                      Visa
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute -top-12 right-0 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Stäng"
              >
                <X size={28} />
              </button>

              <div
                className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${lightboxItem.gradient} flex items-center justify-center`}
              >
                <div className="text-center">
                  <span className="text-white/10 font-heading text-8xl font-bold">
                    {lightboxItem.id}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-heading text-xl font-semibold">
                  {lightboxItem.title}
                </h3>
                <p className="text-accent-primary text-sm mt-1">
                  {lightboxItem.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
