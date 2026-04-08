"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUSINESS_CONTEXT = `Du är kundtjänst-assistenten för Special Plastning & Målning Västkusten, ett premium båtrestaureringsföretag baserat i Marstrand, Sverige. Du hjälper kunder med frågor om tjänster, bokning, priser och allmänna frågor.

Viktig företagsinformation:
- Tjänster: Exteriör restaurering (skrovreparation, gelcoat, polering, bottenmålning), Interiör restaurering (spackling, klädsel, renovering, detaljarbete), Specialarbeten (skräddarsydda modifikationer, specialfinish), Plastskadereparation, Underhåll, Blästring, Epoxi behandling, Swimmingpool
- Plats: Marstrand, Svenska Västkusten
- Serviceområde: Marstrand, Göteborg, Kungälv, Stenungsund, Tjörn, Orust och hela Svenska Västkusten
- Öppettider: Mån-Fre 08:00-17:00, Lör-Sön efter överenskommelse
- Telefon: +46 (0) 00 000 00 00
- E-post: info@specialplastning.se
- Gratis offerter, svarstid i snitt 2 timmar
- 5-stjärnigt betyg, nöjdhetsgaranti

Var vänlig, professionell, hjälpsam och koncis. Svara på samma språk som kunden skriver (svenska eller engelska). Om de vill boka eller begära offert, hänvisa till offertsidan (/quote) eller erbjud att samla in deras uppgifter.`;

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! 👋 Välkommen till Special Plastning & Målning. Jag kan hjälpa dig med:\n\n• Information om våra tjänster\n• Begära en gratis offert\n• Boka en konsultation\n• Svara på dina frågor\n\nHur kan jag hjälpa dig idag?",
};

export default function ChatBot({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    /* TODO: Replace with real AI API call */

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const botResponse = getPlaceholderResponse(text);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: botResponse,
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: "none" }}>
      {/* Backdrop — mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="md:hidden absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      />

      {/* Chat panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
        className="absolute bottom-20 left-2 right-2 md:bottom-6 md:right-6 md:left-auto md:w-[400px] rounded-2xl overflow-hidden flex flex-col bg-white border border-slate-200 shadow-2xl shadow-slate-300/50"
        style={{
          pointerEvents: "auto",
          maxHeight: "min(70vh, 550px)",
          height: "min(70vh, 550px)",
        }}
      >
        {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="Fråga Oss"
                width={36}
                height={36}
                className="rounded-xl"
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-text-primary">
                Fråga Oss
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-text-secondary">
                  Tillgänglig dygnet runt
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors"
            aria-label="Stäng chatt"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-accent-primary/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <MessageCircle size={14} className="text-accent-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "accent-gradient-bg text-white rounded-br-md"
                    : "bg-slate-100 text-text-primary rounded-bl-md border border-slate-200"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="w-7 h-7 rounded-lg bg-accent-primary/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <MessageCircle size={14} className="text-accent-primary" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent-primary/60"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent-primary/60"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-accent-primary/60"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv ett meddelande..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary/40 transition-colors"
              aria-label="Chattmeddelande"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl accent-gradient-bg text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              aria-label="Skicka meddelande"
            >
              {isTyping ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function getPlaceholderResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("pris") || lower.includes("kost") || lower.includes("price") || lower.includes("cost")) {
    return "Vi erbjuder gratis, förutsättningslösa offerter anpassade efter ditt specifika projekt. Priset beror på arbetets omfattning, båtens storlek och material som behövs.\n\nVill du begära en offert? Du kan fylla i vårt formulär på /quote eller berätta dina uppgifter här så hjälper jag dig att komma igång! 📋";
  }

  if (lower.includes("book") || lower.includes("boka") || lower.includes("appointment") || lower.includes("tid")) {
    return "Jag hjälper dig gärna att boka! 📅\n\nFör att komma igång behöver jag:\n• Ditt namn\n• Båttyp och storlek\n• Vilken tjänst du är intresserad av\n• Önskad tidsram\n\nEller fyll i vårt offertformulär på /quote så återkommer vi inom 2 timmar!";
  }

  if (lower.includes("service") || lower.includes("tjänst") || lower.includes("what do you")) {
    return "Vi erbjuder ett komplett utbud av restaureringstjänster:\n\n🔧 Exteriör Restaurering — skrovreparation, gelcoat, polering, bottenmålning\n✨ Interiör Restaurering — spackling, klädsel, renovering\n🎨 Specialarbeten — skräddarsydda modifikationer & finish\n🔩 Plastskadereparation\n🛡️ Epoxi Behandling\n💨 Blästring\n🏊 Swimmingpool\n🔄 Underhåll\n\nVilken tjänst intresserar dig?";
  }

  if (lower.includes("hour") || lower.includes("öppet") || lower.includes("open") || lower.includes("tid")) {
    return "Våra öppettider:\n\n🕐 Måndag–Fredag: 08:00–17:00\n📅 Lördag–Söndag: Efter överenskommelse\n\nDu kan alltid nå oss här dygnet runt, och vi svarar vanligtvis på offerter inom 2 timmar under kontorstid!";
  }

  if (lower.includes("where") || lower.includes("location") || lower.includes("var") || lower.includes("address") || lower.includes("adress")) {
    return "Vi finns i vackra Marstrand på Svenska Västkusten 🇸🇪\n\nVi betjänar hela Västkustregionen inklusive Göteborg, Kungälv, Stenungsund, Tjörn och Orust.\n\nBesök vår kontaktsida på /contact för att se oss på kartan!";
  }

  if (lower.includes("hej") || lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hej! 😊 Kul att du hittat hit! Hur kan jag hjälpa dig idag? Jag kan berätta om våra tjänster, hjälpa dig begära en offert eller svara på frågor.";
  }

  if (lower.includes("tack") || lower.includes("thank")) {
    return "Tack själv! 😊 Glad att kunna hjälpa. Tveka inte att höra av dig — jag finns här dygnet runt. Ha en fin dag!";
  }

  return "Tack för ditt meddelande! Jag hjälper dig gärna med det. För snabbast svar rekommenderar jag:\n\n📞 Ring oss: +46 (0) 00 000 00 00\n📧 E-post: info@specialplastning.se\n📋 Eller begär offert på /quote\n\nFinns det något specifikt om våra tjänster jag kan förtydliga?";
}
