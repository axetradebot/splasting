"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Ship,
  Wrench,
  Paintbrush,
  Sparkles,
  Waves,
  Film,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Category =
  | "all"
  | "exterior"
  | "repair"
  | "detail"
  | "process"
  | "pool"
  | "video";

interface GalleryProject {
  id: number;
  title: string;
  category: Category;
  description: string;
  images: string[];
  beforeAfter?: boolean;
}

const categories: { id: Category; label: string; icon: typeof Ship }[] = [
  { id: "all", label: "Alla", icon: Sparkles },
  { id: "exterior", label: "Exteriör", icon: Ship },
  { id: "repair", label: "Reparation", icon: Wrench },
  { id: "detail", label: "Detaljer", icon: Paintbrush },
  { id: "pool", label: "Pool", icon: Waves },
  { id: "video", label: "Videor", icon: Film },
];

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const projects: GalleryProject[] = [
  {
    id: 1,
    title: "Skrovrestaurering — Före & Efter",
    category: "exterior",
    description:
      "Komplett renovering av skrovband med professionell finish.",
    images: [
      "/images/special_plastning_1726560036_3458958748759485728_68356511885.jpg",
    ],
    beforeAfter: true,
  },
  {
    id: 2,
    title: "Iron Motorbåt — Polering",
    category: "exterior",
    description:
      "Spegelblank polering av Iron motorbåts exteriör och interiör.",
    images: [
      "/images/special_plastning_1726561199_3458968500960872617_68356511885.jpg",
      "/images/special_plastning_1726561199_3458968500960888356_68356511885.jpg",
      "/images/special_plastning_1726561199_3458968500969287980_68356511885.jpg",
    ],
  },
  {
    id: 3,
    title: "Segelbåt — Skrovmålning",
    category: "exterior",
    description:
      "Heltäckande skrovmålning och bottenberedning i Marstrands hamn.",
    images: [
      "/images/special_plastning_1726562752_3458981531388398693_68356511885.jpg",
      "/images/special_plastning_1726562752_3458981531388330133_68356511885.jpg",
      "/images/special_plastning_1726562752_3458981531396616315_68356511885.jpg",
      "/images/special_plastning_1726562752_3458981531396710121_68356511885.jpg",
      "/images/special_plastning_1726562752_3458981531740765573_68356511885.jpg",
    ],
  },
  {
    id: 4,
    title: "Segelbåt — Bottenmålning Före & Efter",
    category: "exterior",
    description:
      "Borttagning av gammal bottenfärg och ny professionell bottenmålning.",
    images: [
      "/images/special_plastning_1759043440_3731449288560528618_68356511885.jpg",
      "/images/special_plastning_1759043440_3731449288560506059_68356511885.jpg",
    ],
    beforeAfter: true,
  },
  {
    id: 5,
    title: "Kabinkryssare SFE4638 — Lackrenovering",
    category: "process",
    description:
      "Från maskering till färdigt resultat — komplett lackrenovering.",
    images: [
      "/images/special_plastning_1759411459_3734536459597170281_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459605560184_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459605562494_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459605566010_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459639121197_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459731395809_68356511885.jpg",
    ],
  },
  {
    id: 6,
    title: "Maskinrum — Rengöring Före & Efter",
    category: "detail",
    description:
      "Grundlig rengöring och ytbehandling av maskinrum och bilge.",
    images: [
      "/images/special_plastning_1730211517_3489589590296649026_68356511885.jpg",
      "/images/special_plastning_1730211517_3489589590288423274_68356511885.jpg",
    ],
    beforeAfter: true,
  },
  {
    id: 7,
    title: "Skrovskador — Osmosreparation",
    category: "repair",
    description:
      "Professionell reparation av osmoskador och blistering på segelbåt.",
    images: [
      "/images/special_plastning_1730645914_3493233572939571357_68356511885.jpg",
      "/images/special_plastning_1730645914_3493233572939640141_68356511885.jpg",
      "/images/special_plastning_1730645914_3493233572939644622_68356511885.jpg",
      "/images/special_plastning_1730645914_3493233572948200569_68356511885.jpg",
    ],
  },
  {
    id: 8,
    title: "Detaljarbete — Båtfittings",
    category: "detail",
    description:
      "Polering och montering av rostfria fittings på WinTec-båt.",
    images: [
      "/images/special_plastning_1730359307_3490829337874857873_68356511885.jpg",
      "/images/special_plastning_1730359307_3490829337874861622_68356511885.jpg",
    ],
  },
  {
    id: 9,
    title: "Skrovarbete — Blästring & Spackling",
    category: "repair",
    description:
      "Blästring och spackling av motorbåtsskrov med gelcoat-reparation.",
    images: [
      "/images/special_plastning_1726565858_3459007586077576214_68356511885.jpg",
      "/images/special_plastning_1726565858_3459007586085908475_68356511885.jpg",
      "/images/special_plastning_1726565858_3459007586085979160_68356511885.jpg",
      "/images/special_plastning_1726565858_3459007586102791171_68356511885.jpg",
    ],
  },
  {
    id: 17,
    title: "Skrovarbete — I Aktion",
    category: "video",
    description: "Se vårt team arbeta med skrovrenovering på nära håll.",
    images: [
      "/images/special_plastning_1726565858_3459007416644609674_68356511885.mp4",
    ],
  },
  {
    id: 10,
    title: "Segelbåt — Vinteruppställning",
    category: "process",
    description:
      "Professionell inpackning och skydd inför vintern.",
    images: [
      "/images/special_plastning_1760538509_3743990834623203698_68356511885.jpg",
    ],
  },
  {
    id: 19,
    title: "Vinteruppställning — Inpackning",
    category: "video",
    description: "Professionell vinterinpackning av segelbåt steg för steg.",
    images: [
      "/images/special_plastning_1760538509_3743990731988540407_68356511885.mp4",
    ],
  },
  {
    id: 11,
    title: "Motoryacht — Exteriör",
    category: "exterior",
    description: "Komplett exteriörrestaurering av motoryacht.",
    images: [
      "/images/special_plastning_1729927007_3487202950227988632_68356511885.jpg",
      "/images/special_plastning_1729927007_3487202950228135277_68356511885.jpg",
    ],
  },
  {
    id: 12,
    title: "Polering & Finish",
    category: "exterior",
    description: "Professionell polering med spegelblank finish.",
    images: [
      "/images/special_plastning_1729589628_3484372805142370507_68356511885.jpg",
      "/images/special_plastning_1729589628_3484372805142441003_68356511885.jpg",
    ],
  },
  {
    id: 18,
    title: "Polering — Spegelblank Finish",
    category: "video",
    description:
      "Maskinpolering live — från matt yta till spegelblank finish.",
    images: [
      "/images/special_plastning_1756883164_3713325542641546521_68356511885.mp4",
    ],
  },
  {
    id: 13,
    title: "Pool — Renovering & Ytbehandling",
    category: "pool",
    description:
      "Komplett renovering och ytbehandling av utomhuspool med trädäck.",
    images: [
      "/images/special_plastning_1729580756_3484298382251075200_68356511885.jpg",
    ],
  },
  {
    id: 15,
    title: "Skrovkant — Detaljarbete",
    category: "detail",
    description:
      "Precisionsarbete kring skrovkant och tätningslister.",
    images: [
      "/images/special_plastning_1729599844_3484458501962077958_68356511885.jpg",
    ],
  },
  {
    id: 16,
    title: "Skrovreparation — Spackling",
    category: "repair",
    description:
      "Spackling och fyllning av skador inför slutlig lackering.",
    images: [
      "/images/special_plastning_1729746685_3485690298154633577_68356511885.jpg",
    ],
  },
  {
    id: 14,
    title: "Underhåll & Service",
    category: "process",
    description: "Regelbundet underhåll och service av båtar.",
    images: [
      "/images/special_plastning_1730039908_3488150025522519535_68356511885.jpg",
      "/images/special_plastning_1759411459_3734536459597170281_68356511885.jpg",
    ],
  },
];

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{
    project: GalleryProject;
    imageIndex: number;
  } | null>(null);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (project: GalleryProject, imageIndex = 0) =>
    setLightbox({ project, imageIndex });

  const closeLightbox = () => setLightbox(null);

  const lightboxNext = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      imageIndex:
        (lightbox.imageIndex + 1) % lightbox.project.images.length,
    });
  };

  const lightboxPrev = () => {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      imageIndex:
        (lightbox.imageIndex - 1 + lightbox.project.images.length) %
        lightbox.project.images.length,
    });
  };

  return (
    <>
      {/* Hero banner */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6">
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
              Verkliga projekt från vår vardag — före, under och efter
              restaurering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 mb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "accent-gradient-bg text-white shadow-md shadow-accent-primary/20"
                      : "bg-slate-100 text-text-secondary hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <cat.icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* Main media */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      {isVideo(project.images[0]) ? (
                        <video
                          src={project.images[0]}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Before/After badge */}
                      {project.beforeAfter && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-primary text-white text-xs font-heading font-bold shadow-md">
                          Före & Efter
                        </div>
                      )}

                      {/* Video badge */}
                      {isVideo(project.images[0]) && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-heading font-bold shadow-md">
                          <Play size={11} className="fill-white" />
                          Video
                        </div>
                      )}

                      {/* Image count badge */}
                      {project.images.length > 1 && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold">
                          {project.images.length} bilder
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-300 pointer-events-none" />
                    </div>

                    {/* Info bar */}
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-base text-text-primary mb-1 group-hover:text-accent-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl mx-4 md:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Stäng"
              >
                <X size={28} />
              </button>

              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightbox.imageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isVideo(
                      lightbox.project.images[lightbox.imageIndex],
                    ) ? (
                      <video
                        src={lightbox.project.images[lightbox.imageIndex]}
                        autoPlay
                        loop
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={lightbox.project.images[lightbox.imageIndex]}
                        alt={`${lightbox.project.title} — Bild ${lightbox.imageIndex + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Before/After label */}
                {lightbox.project.beforeAfter &&
                  lightbox.project.images.length >= 2 && (
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full font-heading font-bold text-sm shadow-lg z-10">
                      {lightbox.imageIndex === 0 ? (
                        <span className="text-white bg-red-500/90 px-4 py-1.5 rounded-full">
                          Före
                        </span>
                      ) : lightbox.imageIndex ===
                        lightbox.project.images.length - 1 ? (
                        <span className="text-white bg-emerald-500/90 px-4 py-1.5 rounded-full">
                          Efter
                        </span>
                      ) : (
                        <span className="text-white bg-amber-500/90 px-4 py-1.5 rounded-full">
                          Under arbete
                        </span>
                      )}
                    </div>
                  )}

                {/* Nav arrows */}
                {lightbox.project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        lightboxPrev();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                      aria-label="Föregående"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        lightboxNext();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                      aria-label="Nästa"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {lightbox.project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {lightbox.project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox({ ...lightbox, imageIndex: i });
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === lightbox.imageIndex
                            ? "w-5 bg-white"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Bild ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info below image */}
              <div className="mt-4 text-center">
                <h3 className="font-heading text-xl font-bold text-white">
                  {lightbox.project.title}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {lightbox.project.description}
                </p>
                {lightbox.project.images.length > 1 && (
                  <p className="text-white/40 text-xs mt-2">
                    {lightbox.imageIndex + 1} /{" "}
                    {lightbox.project.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
