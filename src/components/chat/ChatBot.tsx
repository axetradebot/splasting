"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/config/contact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  showQuoteButton?: boolean;
  quoteButtonLabel?: string;
}

type ChatResponse = {
  content: string;
  showQuoteButton?: boolean;
  quoteButtonLabel?: string;
};

// Reserved for future AI API integration — keeps business facts in one place
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUSINESS_CONTEXT = `Du är kundtjänst-assistenten för Special Plastning & Målning Västkusten, ett båtrestaureringsföretag. Du hjälper kunder med frågor om tjänster, bokning, priser och allmänna frågor.

Kontakt:
- Namn: ${CONTACT.contactName}
- Telefon: ${CONTACT.phoneDisplay}
- E-post: ${CONTACT.email}

Plats & serviceområde:
- Bas i Göteborg och ute på Klöverön
- Mobilt företag — arbetar runt hela västkusten och tar uppdrag i andra delar av Sverige vid önskemål
- Över 10 års erfarenhet inom glasfiber- och träbåtsreparationer

Tjänster:
1. Epoxibehandling — bottenbehandling med slipning, epoxispackling, 2 lager epoxifärg + 2 lager bottenfärg. Bottensanering av gammal färg ingår ej.
2. Polering & vaxning — 3-stegspolering, rubbing, finpolering, vaxning, polering av rostfria detaljer
3. Gelcoat-reparation — skador ovan/under vattenlinjen, färgmatchning, våtslipning och finish
4. Teaktvätt — 2-stegsbehandling (rengöring + blekning). Tillval: oljning, impregnering
5. Specialarbeten — mindre reparationer, montering, böldpestbehandlingar, teakdeck, swimmingpool m.m.

Priser (vägledande):
- Polering & vaxning: ca 635 kr per fot (båtlängd)
- Epoxibehandling: ca 900 kr/m² bottenyta (valfri garanti +5%)
- Gelcoat, teaktvätt och specialarbeten: offert efter behov
- Gratis offerter, svarstid i snitt ett par timmar

Var vänlig, professionell och koncis. Svara på samma språk som kunden (svenska eller engelska). Vid bokning eller offertförfrågan, visa Begär Offert-knapp till /quote.`;

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hej! 👋 Välkommen till Special Plastning & Målning.\n\nJag kan hjälpa dig med:\n• Våra tjänster och priser\n• Begära en gratis offert\n• Kontaktuppgifter\n• Bokning och frågor\n\nHur kan jag hjälpa dig idag?",
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

    /* TODO: Replace with real AI API call using BUSINESS_CONTEXT */

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const response = getChatResponse(text);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      showQuoteButton: response.showQuoteButton,
      quoteButtonLabel: response.quoteButtonLabel,
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
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "accent-gradient-bg text-white rounded-br-md whitespace-pre-line"
                    : "bg-slate-100 text-text-primary rounded-bl-md border border-slate-200"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                {msg.showQuoteButton && (
                  <Link
                    href="/quote"
                    onClick={onClose}
                    className="mt-3 flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl accent-gradient-bg text-white text-sm font-heading font-semibold shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {msg.quoteButtonLabel ?? "Begär Offert"}
                    <ArrowRight size={16} />
                  </Link>
                )}
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

function isEnglish(input: string): boolean {
  const swedishMarkers =
    /[åäöÅÄÖ]|\b(hej|pris|boka|tjänst|ring|tack|var|offert|kostnad|kontakt|epoxi|polering|gelcoat|teak)\b/i;
  const englishMarkers =
    /\b(hello|hi|hey|book|price|call|service|where|thank|what|how|quote|appointment|contact|epoxy|polish|gelcoat|teak)\b/i;
  if (swedishMarkers.test(input)) return false;
  if (englishMarkers.test(input)) return true;
  return false;
}

function wantsQuoteOrCall(lower: string): boolean {
  const patterns = [
    "boka",
    "book",
    "booking",
    "appointment",
    "schedule",
    "offert",
    "quote",
    "begär",
    "request a quote",
    "get a quote",
    "free quote",
    "ring",
    "call",
    "callback",
    "call me",
    "phone me",
    "samtal",
    "ringa",
    "ring mig",
    "kontakta mig",
    "contact me",
    "telefon",
    "konsultation",
    "consultation",
    "möte",
    "meeting",
    "återkoppling",
    "call back",
  ];
  return patterns.some((p) => lower.includes(p));
}

function quoteResponse(en: boolean): ChatResponse {
  return {
    content: en
      ? "I'd be happy to help you get started! Fill in our quote form and we'll get back to you within a couple of hours with a free, no-obligation quote.\n\nYou can also call us directly at " +
        CONTACT.phoneDisplay +
        "."
      : "Jag hjälper dig gärna att komma igång! Fyll i vårt offertformulär så återkommer vi inom ett par timmar med en gratis och förutsättningslös offert.\n\nDu kan även ringa oss direkt på " +
        CONTACT.phoneDisplay +
        ".",
    showQuoteButton: true,
    quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
  };
}

function getChatResponse(input: string): ChatResponse {
  const lower = input.toLowerCase();
  const en = isEnglish(input);

  if (wantsQuoteOrCall(lower)) {
    return quoteResponse(en);
  }

  if (
    lower.includes("pris") ||
    lower.includes("kost") ||
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("how much")
  ) {
    return {
      content: en
        ? "Here are our guide prices:\n\n✨ Polering & waxing — approx. 635 SEK per foot (boat length)\n🛡️ Epoxy treatment — approx. 900 SEK/m² hull area (optional +5% warranty)\n🎨 Gelcoat repair, teak cleaning & special work — quoted per project\n\nAll quotes are free and tailored to your boat. Use our calculator on /quote for polishing and epoxy estimates!"
        : "Här är våra vägledande priser:\n\n✨ Polering & vaxning — ca 635 kr per fot (båtlängd)\n🛡️ Epoxibehandling — ca 900 kr/m² bottenyta (valfri garanti +5%)\n🎨 Gelcoat-reparation, teaktvätt & specialarbeten — offert per projekt\n\nAlla offerter är gratis och skräddarsydda. Använd kalkylatorn på /quote för polering och epoxi!",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (
    lower.includes("service") ||
    lower.includes("tjänst") ||
    lower.includes("what do you") ||
    lower.includes("vad erbjuder") ||
    lower.includes("arbeten")
  ) {
    return {
      content: en
        ? "We offer five main services:\n\n🛡️ Epoxy treatment — hull protection with multi-layer epoxy & antifouling\n✨ Polishing & waxing — 3-step polish for lasting shine\n🎨 Gelcoat repair — damage repair with colour matching\n🌿 Teak cleaning — 2-step deep clean (optional oiling)\n🔧 Special work — custom repairs, teak decks, swimming pools & more\n\n10+ years of experience in fibreglass and wooden boat repairs. Which service interests you?"
        : "Vi erbjuder fem huvudtjänster:\n\n🛡️ Epoxibehandling — bottenbehandling med flera lager epoxi & bottenfärg\n✨ Polering & vaxning — 3-stegspolering för långvarig glans\n🎨 Gelcoat-reparation — skador med noggrann färgmatchning\n🌿 Teaktvätt — 2-stegsbehandling (tillval: oljning & impregnering)\n🔧 Specialarbeten — reparationer, teakdeck, swimmingpool m.m.\n\nÖver 10 års erfarenhet inom glasfiber- och träbåtsreparationer. Vilken tjänst intresserar dig?",
    };
  }

  if (
    lower.includes("epox") ||
    lower.includes("botten") ||
    lower.includes("hull") ||
    lower.includes("antifouling")
  ) {
    return {
      content: en
        ? "Epoxy treatment protects your hull with sanding, cleaning, epoxy filler, 2 coats of epoxy primer and 2 coats of antifouling — approx. 900 SEK/m².\n\nNote: removal of old antifouling is not included; blasting or scraping is quoted separately."
        : "Epoxibehandling skyddar båtbotten med slipning, rengöring, epoxispackling, 2 lager epoxifärg och 2 lager bottenfärg — ca 900 kr/m².\n\nObservera: bottensanering av gammal bottenfärg ingår ej. Blästring eller skrapning offereras separat.",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (lower.includes("poler") || lower.includes("vax") || lower.includes("wax") || lower.includes("glans")) {
    return {
      content: en
        ? "Polishing & waxing includes 3-step polishing, oxidation removal, fine polish, wax protection and stainless detail polishing — from approx. 635 SEK per foot of boat length."
        : "Polering & vaxning inkluderar 3-stegspolering, rubbing, finpolering, vaxning och polering av rostfria detaljer — från ca 635 kr per fot båtlängd.",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (lower.includes("gelcoat") || lower.includes("skada") || lower.includes("damage") || lower.includes("reparation")) {
    return {
      content: en
        ? "Gelcoat repair covers damage above or below the waterline — inspection, prep, gelcoat & filler, colour matching, wet sanding and finishing for a seamless result. Price on request."
        : "Gelcoat-reparation återställer skador ovan eller under vattenlinjen — inspektion, förberedelse, gelcoat & filler, färgmatchning, våtslipning och finish. Pris efter offert.",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (lower.includes("teak")) {
    return {
      content: en
        ? "Teak cleaning is a 2-step treatment: deep cleaning of dirt and discolouration, then bleaching to restore natural colour. Optional: oiling and impregnation for extra protection."
        : "Teaktvätt är en 2-stegsbehandling: rengöring av smuts och missfärgningar, sedan blekning för att återställa teakens färg. Tillval: oljning och impregnering.",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (lower.includes("special") || lower.includes("swimming") || lower.includes("pool") || lower.includes("böldpest")) {
    return {
      content: en
        ? "Special work covers repairs, assembly, blister treatment, teak deck replacement, swimming pool work and more. Tell us what you need and we'll find a solution!"
        : "Specialarbeten omfattar reparationer, montering, böldpestbehandlingar, teakdeck, swimmingpool-arbeten med mera. Berätta vad du behöver så hittar vi en lösning!",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (
    lower.includes("hour") ||
    lower.includes("öppet") ||
    lower.includes("öppettider") ||
    lower.includes("open")
  ) {
    return {
      content: en
        ? "Opening hours:\n\n🕐 Mon–Fri: 08:00–17:00\n📅 Sat–Sun: By appointment\n\nWe're available here 24/7 and typically reply to quotes within a couple of hours during business hours!"
        : "Öppettider:\n\n🕐 Måndag–Fredag: 08:00–17:00\n📅 Lördag–Söndag: Efter överenskommelse\n\nDu kan alltid nå oss här dygnet runt, och vi svarar vanligtvis på offerter inom ett par timmar!",
    };
  }

  if (
    lower.includes("where") ||
    lower.includes("location") ||
    lower.includes("var ") ||
    lower.includes("adress") ||
    lower.includes("address") ||
    lower.includes("område") ||
    lower.includes("västkust")
  ) {
    return {
      content: en
        ? "We're based in Gothenburg and at Klöverön. As a mobile company we work along the entire west coast and take on jobs elsewhere in Sweden on request.\n\n📞 " +
          CONTACT.phoneDisplay +
          "\n📧 " +
          CONTACT.email
        : "Vi är baserade i Göteborg och ute på Klöverön. Som mobilt företag arbetar vi runt hela västkusten och tar uppdrag i andra delar av Sverige vid önskemål.\n\n📞 " +
          CONTACT.phoneDisplay +
          "\n📧 " +
          CONTACT.email,
    };
  }

  if (
    lower.includes("kontakt") ||
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("e-post") ||
    lower.includes("mail") ||
    lower.includes("erik") ||
    lower.includes("phone") && !wantsQuoteOrCall(lower)
  ) {
    return {
      content: en
        ? "Contact us:\n\n👤 " +
          CONTACT.contactName +
          "\n📞 " +
          CONTACT.phoneDisplay +
          "\n📧 " +
          CONTACT.email +
          "\n\nFree quotes — we typically reply within a couple of hours!"
        : "Kontakta oss:\n\n👤 " +
          CONTACT.contactName +
          "\n📞 " +
          CONTACT.phoneDisplay +
          "\n📧 " +
          CONTACT.email +
          "\n\nGratis offerter — vi svarar vanligtvis inom ett par timmar!",
      showQuoteButton: true,
      quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
    };
  }

  if (lower.includes("hej") || lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return {
      content: en
        ? "Hello! 😊 Great to hear from you. I can tell you about our services, prices and help you request a free quote. How can I help?"
        : "Hej! 😊 Kul att du hittat hit. Jag kan berätta om våra tjänster, priser och hjälpa dig begära en gratis offert. Hur kan jag hjälpa dig?",
    };
  }

  if (lower.includes("tack") || lower.includes("thank")) {
    return {
      content: en
        ? "You're welcome! 😊 Happy to help. Don't hesitate to reach out — we're here 24/7. Have a great day!"
        : "Tack själv! 😊 Glad att kunna hjälpa. Tveka inte att höra av dig — vi finns här dygnet runt. Ha en fin dag!",
    };
  }

  return {
    content: en
      ? "Thanks for your message! For the fastest response:\n\n📞 Call: " +
        CONTACT.phoneDisplay +
        "\n📧 Email: " +
        CONTACT.email +
        "\n\nI can also help with services, prices and booking. What would you like to know?"
      : "Tack för ditt meddelande! För snabbast svar:\n\n📞 Ring: " +
        CONTACT.phoneDisplay +
        "\n📧 E-post: " +
        CONTACT.email +
        "\n\nJag kan även hjälpa med tjänster, priser och bokning. Vad vill du veta mer om?",
    showQuoteButton: true,
    quoteButtonLabel: en ? "Request Quote" : "Begär Offert",
  };
}
