"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export type ServicePopupData = {
  title: string;
  images: string[];
  intro?: string;
  included?: string[];
  includedTitle?: string;
  optional?: string[];
  optionalTitle?: string;
  note?: string;
  description?: string;
  closing?: string;
};

type ServicePopupProps = {
  service: ServicePopupData | null;
  imageIndex: number;
  onClose: () => void;
  onImageIndexChange: (index: number) => void;
};

export default function ServicePopup({
  service,
  imageIndex,
  onClose,
  onImageIndexChange,
}: ServicePopupProps) {
  const goNext = useCallback(() => {
    if (!service) return;
    onImageIndexChange((imageIndex + 1) % service.images.length);
  }, [service, imageIndex, onImageIndexChange]);

  const goPrev = useCallback(() => {
    if (!service) return;
    onImageIndexChange(
      (imageIndex - 1 + service.images.length) % service.images.length,
    );
  }, [service, imageIndex, onImageIndexChange]);

  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl shadow-slate-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Stäng"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[4/3] bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={service.images[imageIndex]}
                    alt={`${service.title} — Bild ${imageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {service.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    aria-label="Föregående bild"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 flex items-center justify-center hover:bg-white transition-colors shadow-md"
                    aria-label="Nästa bild"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {service.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageIndexChange(i);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === imageIndex
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Bild ${i + 1}`}
                      />
                    ))}
                  </div>

                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                    {imageIndex + 1} / {service.images.length}
                  </span>
                </>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl font-bold text-text-primary mb-4 pr-8">
                {service.title}
              </h3>

              {(service.intro || service.description) && (
                <p className="text-text-secondary text-base leading-relaxed mb-5">
                  {service.intro ?? service.description}
                </p>
              )}

              {service.included && service.included.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-primary mb-3">
                    {service.includedTitle ?? "Detta ingår"}
                  </h4>
                  <ul className="space-y-2.5">
                    {service.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-text-primary text-base leading-relaxed"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-accent-primary shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.optional && service.optional.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">
                    {service.optionalTitle ?? "Tillval"}
                  </h4>
                  <ul className="space-y-2.5">
                    {service.optional.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-text-primary text-base leading-relaxed"
                      >
                        <span className="w-[18px] shrink-0 mt-2 h-0.5 rounded-full bg-accent-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.closing && (
                <p className="text-text-secondary text-base leading-relaxed mb-5">
                  {service.closing}
                </p>
              )}

              {service.note && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/80 mb-6">
                  <Info
                    size={18}
                    className="text-amber-600 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      Observera
                    </p>
                    <p className="text-sm text-amber-900/80 leading-relaxed">
                      {service.note}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-6 mt-2 border-t border-slate-100 flex justify-center">
                <Button href="/quote" size="md" className="w-full sm:w-auto">
                  Begär Offert
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
