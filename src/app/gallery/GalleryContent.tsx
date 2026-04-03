"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ZoomIn } from "lucide-react";
import Link from "next/link";

const filters = ["All", "Exterior", "Interior", "Custom"];

/* TODO: Replace with real gallery images */
const galleryItems = [
  {
    id: 1,
    title: "Hull Restoration — Sailboat 38ft",
    category: "Exterior",
    gradient: "from-sky-600/30 to-blue-800/30",
  },
  {
    id: 2,
    title: "Interior Plastering — Motor Yacht",
    category: "Interior",
    gradient: "from-cyan-600/30 to-teal-800/30",
  },
  {
    id: 3,
    title: "Custom Paint — Racing Yacht",
    category: "Custom",
    gradient: "from-amber-600/30 to-orange-800/30",
  },
  {
    id: 4,
    title: "Gelcoat Repair — Day Cruiser",
    category: "Exterior",
    gradient: "from-indigo-600/30 to-purple-800/30",
  },
  {
    id: 5,
    title: "Cabin Refinishing — Classic Wooden Boat",
    category: "Interior",
    gradient: "from-emerald-600/30 to-green-800/30",
  },
  {
    id: 6,
    title: "Full Restoration — Vintage Sailboat",
    category: "Exterior",
    gradient: "from-rose-600/30 to-red-800/30",
  },
  {
    id: 7,
    title: "Custom Interior — Luxury Yacht",
    category: "Custom",
    gradient: "from-violet-600/30 to-purple-800/30",
  },
  {
    id: 8,
    title: "Anti-Fouling Treatment — Fishing Boat",
    category: "Exterior",
    gradient: "from-blue-600/30 to-sky-800/30",
  },
  {
    id: 9,
    title: "Upholstery Restoration — Cabin Cruiser",
    category: "Interior",
    gradient: "from-teal-600/30 to-cyan-800/30",
  },
];

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<
    (typeof galleryItems)[0] | null
  >(null);

  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

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
              <span className="text-text-primary">Gallery</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="text-gradient">Work</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Browse our portfolio of boat restorations across the Swedish West
              Coast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "accent-gradient-bg text-white shadow-lg shadow-accent-primary/20"
                  : "glass-card text-text-secondary hover:text-text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                    {/* TODO: Replace with real images */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/10 font-heading text-6xl font-bold">
                        {item.id}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <ZoomIn
                          size={32}
                          className="text-white mx-auto mb-2"
                        />
                        <p className="text-white font-heading font-semibold text-sm px-4">
                          {item.title}
                        </p>
                        <span className="text-accent-primary text-xs mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
                aria-label="Close lightbox"
              >
                <X size={28} />
              </button>

              <div
                className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${lightboxItem.gradient} flex items-center justify-center`}
              >
                {/* TODO: Replace with real image */}
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
