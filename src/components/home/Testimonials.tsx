"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Erik Lindqvist",
    text: "Absolutely fantastic work on our sailboat's interior. The plastering was flawless, and the attention to detail was remarkable. Highly recommend!",
    rating: 5,
    date: "March 2026",
  },
  {
    name: "Ingrid Bergström",
    text: "They restored our hull to better-than-new condition. Professional, punctual, and the results speak for themselves. Will definitely use again.",
    rating: 5,
    date: "February 2026",
  },
  {
    name: "Lars Johansson",
    text: "Best boat restoration service on the West Coast. Fair pricing, excellent communication throughout, and the quality is outstanding.",
    rating: 5,
    date: "January 2026",
  },
  {
    name: "Anna Svensson",
    text: "Our old wooden boat looks absolutely stunning after their restoration. They truly care about their craft and it shows in every detail.",
    rating: 5,
    date: "December 2025",
  },
  {
    name: "Magnus Karlsson",
    text: "From the initial quote to the final result — everything was seamless. The custom work they did on our cabin exceeded all expectations.",
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
          title="What Our Customers Say"
          highlight="Customers"
          subtitle="Real feedback from boat owners across the Swedish West Coast."
        />

        <div className="relative">
          {/* Navigation arrows — desktop */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 items-center justify-center w-10 h-10 rounded-full glass-card text-text-secondary hover:text-accent-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 items-center justify-center w-10 h-10 rounded-full glass-card text-text-secondary hover:text-accent-primary transition-colors"
            aria-label="Next testimonial"
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
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 0.9, 1], opacity: [1, 0.7, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Star
                          size={20}
                          className="text-accent-warm fill-accent-warm"
                        />
                      </motion.div>
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

          {/* Dots indicator */}
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
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
