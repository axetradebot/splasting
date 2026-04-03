"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Erik Lindqvist",
    text: "Helt fantastiskt arbete med vår segelbåts interiör. Spacklingen var felfri och detaljnivån var anmärkningsvärd. Rekommenderas varmt!",
    rating: 5,
    date: "Mars 2026",
  },
  {
    name: "Ingrid Bergström",
    text: "De restaurerade vårt skrov till bättre-än-nytt skick. Professionella, punktliga och resultaten talar för sig själva. Anlitar dem definitivt igen.",
    rating: 5,
    date: "Februari 2026",
  },
  {
    name: "Lars Johansson",
    text: "Bästa båtrestaureringsföretaget på Västkusten. Rättvisa priser, utmärkt kommunikation och kvaliteten är enastående.",
    rating: 5,
    date: "Januari 2026",
  },
  {
    name: "Anna Svensson",
    text: "Vår gamla träbåt ser helt fantastisk ut efter deras restaurering. De bryr sig verkligen om sitt hantverk och det syns i varje detalj.",
    rating: 5,
    date: "December 2025",
  },
  {
    name: "Magnus Karlsson",
    text: "Från första offerten till det färdiga resultatet — allt var sömlöst. Det specialarbete de gjorde i vår kajuta överträffade alla förväntningar.",
    rating: 5,
    date: "November 2025",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Vad Våra Kunder Säger"
          highlight="Kunder"
          subtitle="Ärlig feedback från båtägare längs Svenska Västkusten."
        />

        {/* Google Reviews badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-accent-warm fill-accent-warm"
              />
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            5.0 på Google Reviews
          </span>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 items-center justify-center w-10 h-10 rounded-full glass-card text-text-secondary hover:text-accent-primary transition-colors"
            aria-label="Föregående omdöme"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 items-center justify-center w-10 h-10 rounded-full glass-card text-text-secondary hover:text-accent-primary transition-colors"
            aria-label="Nästa omdöme"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass-card rounded-2xl p-8 md:p-12 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-accent-warm fill-accent-warm"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-text-primary/90">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div>
                  <p className="font-heading font-semibold text-text-primary">
                    {testimonials[current].name}
                  </p>
                  <p className="text-text-secondary text-sm mt-1">
                    {testimonials[current].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-accent-primary"
                    : "bg-text-secondary/30 hover:bg-text-secondary/50"
                }`}
                aria-label={`Gå till omdöme ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
