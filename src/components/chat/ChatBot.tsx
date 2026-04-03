"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Loader2 } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUSINESS_CONTEXT = `You are the AI assistant for Special Plastning & Målning Västkusten, a premium boat restoration business based in Marstrand, Sweden. You help customers with questions about services, booking, pricing, and general inquiries.

Key business information:
- Services: Exterior restoration (hull repair, gelcoat, polishing, anti-fouling), Interior restoration (plastering, upholstery, refinishing, detailing), Custom work (bespoke modifications, custom finishes), Plastic damage repair, Maintenance, Blasting, Epoxy treatment, Swimming pools
- Location: Marstrand, Swedish West Coast
- Service area: Marstrand, Gothenburg, Kungälv, Stenungsund, Tjörn, Orust, and the entire Swedish West Coast
- Hours: Mon-Fri 08:00-17:00, Sat-Sun by appointment
- Phone: +46 (0) 00 000 00 00
- Email: info@specialplastning.se
- Free quotes available, average response time 2 hours
- 5-star rated, satisfaction guaranteed

Be friendly, professional, helpful, and concise. Answer in the same language the customer writes in (Swedish or English). If they want to book or get a quote, direct them to the quote page (/quote) or offer to collect their details.`;

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! 👋 I'm your 24/7 assistant for Special Plastning & Målning. I can help you with:\n\n• Information about our services\n• Getting a free quote\n• Booking a consultation\n• Answering any questions\n\nHow can I help you today?",
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

    /* TODO: Replace with real AI API call (e.g. OpenAI, Anthropic, etc.)
       Send BUSINESS_CONTEXT as the system prompt along with the conversation history.
       Example:
       const res = await fetch("/api/chat", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
           system: BUSINESS_CONTEXT,
         }),
       });
       const data = await res.json();
    */

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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
            className="fixed z-50 bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[85vh] md:h-[600px] md:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col bg-bg-secondary border border-glass-border shadow-2xl shadow-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-glass-border bg-bg-elevated/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden">
                  <Image
                    src="/images/logo.jpg"
                    alt="Assistant"
                    width={36}
                    height={36}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-text-primary">
                    SP&M Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-text-secondary">
                      Online 24/7
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
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
                      <Bot size={14} className="text-accent-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "accent-gradient-bg text-white rounded-br-md"
                        : "bg-bg-elevated text-text-primary rounded-bl-md border border-glass-border"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent-primary/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot size={14} className="text-accent-primary" />
                  </div>
                  <div className="bg-bg-elevated rounded-2xl rounded-bl-md px-4 py-3 border border-glass-border">
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
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-glass-border bg-bg-elevated/30 safe-bottom"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-bg-elevated border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-primary/40 transition-colors"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl accent-gradient-bg text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  aria-label="Send message"
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
        </>
      )}
    </AnimatePresence>
  );
}

function getPlaceholderResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("pris") || lower.includes("kost") || lower.includes("price") || lower.includes("cost")) {
    return "We provide free, no-obligation quotes tailored to your specific project. Pricing depends on the scope of work, boat size, and materials needed.\n\nWould you like to request a quote? You can fill out our form at /quote or tell me your details and I'll help get the process started! 📋";
  }

  if (lower.includes("book") || lower.includes("boka") || lower.includes("appointment") || lower.includes("tid")) {
    return "I'd love to help you book! 📅\n\nTo get started, I'll need:\n• Your name\n• Boat type & size\n• The service you're interested in\n• Your preferred timeframe\n\nOr you can fill out our quick quote form at /quote and we'll get back to you within 2 hours!";
  }

  if (lower.includes("service") || lower.includes("tjänst") || lower.includes("what do you")) {
    return "We offer a full range of restoration services:\n\n🔧 **Exterior Restoration** — hull repair, gelcoat, polishing, anti-fouling\n✨ **Interior Restoration** — plastering, upholstery, refinishing\n🎨 **Custom Work** — bespoke modifications & finishes\n🔩 **Plastic Damage Repair**\n🛡️ **Epoxy Treatment**\n💨 **Blasting**\n🏊 **Swimming Pools**\n🔄 **Maintenance**\n\nWhich service interests you?";
  }

  if (lower.includes("hour") || lower.includes("öppet") || lower.includes("open") || lower.includes("tid")) {
    return "Our business hours are:\n\n🕐 Monday–Friday: 08:00–17:00\n📅 Saturday–Sunday: By appointment\n\nYou can always reach me here 24/7, and we typically respond to quotes within 2 hours during business hours!";
  }

  if (lower.includes("where") || lower.includes("location") || lower.includes("var") || lower.includes("address") || lower.includes("adress")) {
    return "We're based in beautiful Marstrand on the Swedish West Coast 🇸🇪\n\nWe serve the entire West Coast region including Gothenburg, Kungälv, Stenungsund, Tjörn, and Orust.\n\nVisit our contact page at /contact to see us on the map!";
  }

  if (lower.includes("hej") || lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hej! 😊 Great to have you here! How can I help you today? I can tell you about our services, help you get a quote, or answer any questions you might have.";
  }

  if (lower.includes("tack") || lower.includes("thank")) {
    return "Tack själv! 😊 Happy to help. Don't hesitate to reach out anytime — I'm here 24/7. Have a wonderful day!";
  }

  return "Thanks for your message! I'd be happy to help with that. For the most accurate answer, I'd recommend:\n\n📞 Calling us: +46 (0) 00 000 00 00\n📧 Emailing: info@specialplastning.se\n📋 Or requesting a quote at /quote\n\nIs there anything specific about our services I can help clarify?";
}
