"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import ChatBot from "@/components/chat/ChatBot";

export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const bounceIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.4, 0.85, 1.1, 1], opacity: 1 },
    transition: {
      delay: 2.2,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  };

  const alreadyVisible = {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0 },
  };

  const enterProps = hasEntered ? alreadyVisible : bounceIn;

  return (
    <>
      <div className="fixed z-40">
        {/* Phone button — bottom left, mobile only, pill with text */}
        <motion.a
          href="tel:+46000000000"
          className="md:hidden fixed left-4 bottom-24 flex items-center gap-2 px-5 py-3.5 rounded-full accent-gradient-bg text-white shadow-lg glow-blue backdrop-blur-sm font-heading font-semibold text-sm"
          {...enterProps}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Ring oss"
        >
          <Phone size={18} />
          Ring Oss
        </motion.a>

        {/* Chat button — bottom right, all screen sizes */}
        {!chatOpen && (
          <motion.button
            onClick={() => setChatOpen(true)}
            className="fixed right-4 bottom-24 md:bottom-8 flex items-center gap-2 px-5 py-3.5 md:px-4 md:py-3 rounded-full bg-bg-elevated border border-accent-primary/30 text-accent-primary shadow-lg glow-blue backdrop-blur-sm font-heading font-semibold text-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              hasEntered
                ? { duration: 0.3, ease: "easeOut" as const }
                : { delay: 2.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Fråga oss"
          >
            <MessageCircle size={18} />
            <span className="md:hidden">Fråga Oss</span>
            <span className="hidden md:inline">Fråga Oss</span>
          </motion.button>
        )}
      </div>

      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
