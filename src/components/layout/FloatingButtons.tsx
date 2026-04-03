"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Bot } from "lucide-react";
import ChatBot from "@/components/chat/ChatBot";

export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="fixed z-40">
        {/* Phone button — bottom left, mobile only */}
        <motion.a
          href="tel:+46000000000"
          className="md:hidden fixed left-4 bottom-24 flex items-center justify-center w-14 h-14 rounded-full accent-gradient-bg text-white shadow-lg glow-blue backdrop-blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 0.85, 1.1, 1], opacity: 1 }}
          transition={{
            delay: 4.2,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Call us"
        >
          <Phone size={22} />
        </motion.a>

        {/* AI Chat button — bottom right, all screen sizes */}
        {!chatOpen && (
          <motion.button
            onClick={() => setChatOpen(true)}
            className="fixed right-4 bottom-24 md:bottom-8 flex items-center justify-center w-14 h-14 rounded-full bg-bg-elevated border border-accent-primary/30 text-accent-primary shadow-lg glow-blue backdrop-blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0.85, 1.1, 1], opacity: 1 }}
            transition={{
              delay: 4.2,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open AI assistant chat"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </div>

      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
