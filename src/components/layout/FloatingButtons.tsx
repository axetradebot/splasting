"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="md:hidden fixed z-40">
      {/* Phone button — bottom left */}
      <motion.a
        href="tel:+46000000000"
        className="fixed left-4 bottom-24 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg glow-green backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        aria-label="Call us"
      >
        <Phone size={22} />
      </motion.a>

      {/* Book Now button — bottom right */}
      <motion.a
        href="/quote"
        className="fixed right-4 bottom-24 flex items-center justify-center px-4 py-3 rounded-full accent-gradient-bg text-white text-sm font-heading font-semibold shadow-lg glow-blue backdrop-blur-sm whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        aria-label="Book now - get a quote"
      >
        Book Now
      </motion.a>
    </div>
  );
}
