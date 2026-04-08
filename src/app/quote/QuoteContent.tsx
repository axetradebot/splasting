"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Ship,
  Waves,
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calculator,
  ClipboardCheck,
  Sparkles,
  Paintbrush,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Info,
} from "lucide-react";
import Link from "next/link";

type FormStatus = "idle" | "loading" | "success" | "error";
type CalcService = "polishing" | "epoxy" | null;

const INPUT_CLASS =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-base text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/10 transition-all duration-300 shadow-sm";

const serviceTypes = [
  {
    id: "boat" as const,
    label: "Båt",
    icon: Ship,
    description: "Restaurering & reparation",
  },
  {
    id: "pool" as const,
    label: "Pool",
    icon: Waves,
    description: "Swimming pool arbeten",
  },
  {
    id: "other" as const,
    label: "Annat",
    icon: HelpCircle,
    description: "Övriga förfrågningar",
  },
];

/* ──────────────────── Step progress indicator ──────────────────── */
function StepIndicator({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels: string[];
}) {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="flex items-center gap-0">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={step} className="flex items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all duration-300 ${
                  done
                    ? "accent-gradient-bg text-white"
                    : active
                      ? "accent-gradient-bg text-white shadow-md shadow-accent-primary/30"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {done ? <CheckCircle size={16} /> : step}
              </div>
              {step < total && (
                <div
                  className={`w-10 md:w-16 h-0.5 transition-colors duration-300 ${
                    done ? "bg-accent-primary" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <span className="text-text-secondary text-sm">
        {labels[current - 1]}
      </span>
    </div>
  );
}

/* ──────────────────── Main component ──────────────────── */
export default function QuoteContent() {
  /* ── Free-quote tab state ── */
  const [activeTab, setActiveTab] = useState<"quote" | "calculator">("quote");
  const [selectedService, setSelectedService] = useState("boat");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  /* ── Calculator wizard state ── */
  const [calcStep, setCalcStep] = useState(1);
  const [calcService, setCalcService] = useState<CalcService>(null);
  const [boatFeet, setBoatFeet] = useState("");
  const [hullLength, setHullLength] = useState("");
  const [hullWidth, setHullWidth] = useState("");
  const [hullHeight, setHullHeight] = useState("");
  const [addWarranty, setAddWarranty] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [bookingStatus, setBookingStatus] = useState<FormStatus>("idle");

  const totalCalcSteps = calcService === "epoxy" ? 4 : 3;
  const calcStepLabels =
    calcService === "epoxy"
      ? ["Välj tjänst", "Båtens mått", "Uppgradera garanti", "Din offert"]
      : ["Välj tjänst", "Båtens mått", "Din offert"];

  /* ── Pricing calculations ── */
  const polishPrice = boatFeet ? Math.round(parseFloat(boatFeet) * 635) : 0;

  const hullArea =
    hullLength && hullWidth && hullHeight
      ? parseFloat(hullLength) *
        (parseFloat(hullWidth) + 2 * parseFloat(hullHeight))
      : 0;
  const epoxyBasePrice = Math.round(hullArea * 1100);
  const warrantyCost = addWarranty ? Math.round(epoxyBasePrice * 0.05) : 0;
  const epoxyTotalPrice = epoxyBasePrice + warrantyCost;

  const finalPrice =
    calcService === "polishing" ? polishPrice : epoxyTotalPrice;

  /* ── Handlers ── */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        "https://formspree.io/f/QUOTE_FORM_ID" /* TODO: Replace with real Formspree ID */,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, service: selectedService }),
        }
      );
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", details: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    try {
      const res = await fetch(
        "https://formspree.io/f/QUOTE_FORM_ID" /* TODO: Replace with real Formspree ID */,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingForm,
            service: calcService,
            estimatedPrice: finalPrice,
            warranty: calcService === "epoxy" ? addWarranty : "N/A",
          }),
        }
      );
      if (res.ok) {
        setBookingStatus("success");
        setBookingForm({ name: "", phone: "", email: "" });
      } else {
        setBookingStatus("error");
      }
    } catch {
      setBookingStatus("error");
    }
  };

  const resetCalc = () => {
    setCalcStep(1);
    setCalcService(null);
    setBoatFeet("");
    setHullLength("");
    setHullWidth("");
    setHullHeight("");
    setAddWarranty(false);
    setBookingForm({ name: "", phone: "", email: "" });
    setBookingStatus("idle");
  };

  const canContinueStep2 =
    calcService === "polishing"
      ? boatFeet && parseFloat(boatFeet) > 0
      : hullLength &&
        hullWidth &&
        hullHeight &&
        parseFloat(hullLength) > 0 &&
        parseFloat(hullWidth) > 0 &&
        parseFloat(hullHeight) > 0;

  /* ──────────────────────────────────────────── */
  return (
    <>
      {/* Hero banner */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 px-6">
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
              <span className="text-text-primary">Begär Offert</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Begär Din{" "}
              <span className="text-gradient">Gratis Offert</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Två sätt att få din offert: begär en gratis konsultation eller
              använd vår kalkylator för en snabb uppskattning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab switcher */}
      <section className="px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex gap-3 mb-10"
          >
            <button
              onClick={() => {
                setActiveTab("quote");
                resetCalc();
              }}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-heading font-semibold text-base transition-all duration-300 ${
                activeTab === "quote"
                  ? "accent-gradient-bg text-white shadow-lg shadow-accent-primary/20"
                  : "bg-slate-100 text-text-secondary hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <ClipboardCheck size={20} />
              Gratis Offert
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-heading font-semibold text-base transition-all duration-300 ${
                activeTab === "calculator"
                  ? "accent-gradient-bg text-white shadow-lg shadow-accent-primary/20"
                  : "bg-slate-100 text-text-secondary hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <Calculator size={20} />
              Kalkylator
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content area */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ═══════════ FREE QUOTE TAB ═══════════ */}
            {activeTab === "quote" ? (
              <motion.div
                key="quote"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.1,
                        }}
                      >
                        <CheckCircle
                          size={72}
                          className="text-emerald-500 mx-auto mb-5"
                        />
                      </motion.div>
                      <h3 className="font-heading text-2xl font-bold mb-3">
                        Offertförfrågan Skickad!
                      </h3>
                      <p className="text-text-secondary text-base max-w-md mx-auto mb-6">
                        Tack! Vi granskar din förfrågan och återkommer inom ett
                        par timmar med en detaljerad offert.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="text-accent-primary hover:underline text-base font-medium"
                      >
                        Skicka en ny förfrågan
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-8">
                        <h2 className="font-heading text-2xl font-bold mb-2">
                          Begär en Gratis Konsultation
                        </h2>
                        <p className="text-text-secondary text-base">
                          Vi kontaktar dig, bedömer dina behov och ger en exakt
                          offert.
                        </p>
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-text-secondary mb-3">
                          Vad vill du ha hjälp med?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {serviceTypes.map((service) => {
                            const isActive = selectedService === service.id;
                            return (
                              <motion.button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedService(service.id)}
                                whileTap={{ scale: 0.97 }}
                                className={`relative flex flex-col items-center gap-2 p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                                  isActive
                                    ? "border-accent-primary bg-accent-primary/5 shadow-md shadow-accent-primary/10"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                }`}
                              >
                                {isActive && (
                                  <motion.div
                                    layoutId="service-indicator"
                                    className="absolute top-2 right-2 w-3 h-3 rounded-full accent-gradient-bg"
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 25,
                                    }}
                                  />
                                )}
                                <div
                                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                                    isActive
                                      ? "accent-gradient-bg text-white"
                                      : "bg-slate-100 text-slate-400"
                                  }`}
                                >
                                  <service.icon size={28} strokeWidth={1.8} />
                                </div>
                                <span
                                  className={`font-heading font-semibold text-base transition-colors duration-300 ${
                                    isActive
                                      ? "text-accent-primary"
                                      : "text-text-primary"
                                  }`}
                                >
                                  {service.label}
                                </span>
                                <span
                                  className={`text-xs leading-tight transition-colors duration-300 ${
                                    isActive
                                      ? "text-accent-primary/70"
                                      : "text-text-secondary"
                                  }`}
                                >
                                  {service.description}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-text-secondary mb-2"
                          >
                            Namn{" "}
                            <span className="text-accent-primary">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ditt fullständiga namn"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className={INPUT_CLASS}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-text-secondary mb-2"
                          >
                            Telefon{" "}
                            <span className="text-accent-primary">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+46 ..."
                            required
                            value={form.phone}
                            onChange={handleChange}
                            className={INPUT_CLASS}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-text-secondary mb-2"
                          >
                            E-post
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="din@epost.se"
                            value={form.email}
                            onChange={handleChange}
                            className={INPUT_CLASS}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="details"
                            className="block text-sm font-semibold text-text-secondary mb-2"
                          >
                            Ytterligare Information
                          </label>
                          <textarea
                            id="details"
                            name="details"
                            placeholder="Berätta kort om ditt projekt..."
                            rows={4}
                            value={form.details}
                            onChange={handleChange}
                            className={`${INPUT_CLASS} resize-none`}
                          />
                        </div>

                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl"
                          >
                            <AlertCircle size={16} />
                            Något gick fel. Vänligen försök igen.
                          </motion.div>
                        )}

                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl accent-gradient-bg text-white font-heading font-semibold text-lg shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === "loading" ? (
                            <Loader2 size={22} className="animate-spin" />
                          ) : (
                            <>
                              <Send size={20} />
                              Begär Gratis Offert
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* ═══════════ CALCULATOR WIZARD TAB ═══════════ */
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step indicator */}
                {calcService && (
                  <StepIndicator
                    current={calcStep}
                    total={totalCalcSteps}
                    labels={calcStepLabels}
                  />
                )}

                <AnimatePresence mode="wait">
                  {/* ── STEP 1: Select service ── */}
                  {calcStep === 1 && (
                    <motion.div
                      key="calc-step-1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10"
                    >
                      <div className="text-center mb-8">
                        <h2 className="font-heading text-2xl font-bold mb-2">
                          Vad vill du beräkna?
                        </h2>
                        <p className="text-text-secondary text-base">
                          Välj din tjänst för att komma igång
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Polishing & Waxing */}
                        <motion.button
                          type="button"
                          onClick={() => setCalcService("polishing")}
                          whileTap={{ scale: 0.97 }}
                          className={`relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                            calcService === "polishing"
                              ? "border-accent-primary bg-accent-primary/5 shadow-lg shadow-accent-primary/10"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          <div
                            className={`w-18 h-18 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              calcService === "polishing"
                                ? "accent-gradient-bg text-white shadow-md"
                                : "bg-slate-100 text-slate-400"
                            }`}
                            style={{ width: 72, height: 72 }}
                          >
                            <Sparkles size={34} strokeWidth={1.6} />
                          </div>
                          <span
                            className={`font-heading font-bold text-lg transition-colors ${
                              calcService === "polishing"
                                ? "text-accent-primary"
                                : "text-text-primary"
                            }`}
                          >
                            Polering & Vaxning
                          </span>
                          <span className="text-text-secondary text-sm">
                            635 SEK per fot (inkl. moms)
                          </span>
                        </motion.button>

                        {/* Epoxy Painting */}
                        <motion.button
                          type="button"
                          onClick={() => setCalcService("epoxy")}
                          whileTap={{ scale: 0.97 }}
                          className={`relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                            calcService === "epoxy"
                              ? "border-accent-primary bg-accent-primary/5 shadow-lg shadow-accent-primary/10"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          <div
                            className={`rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              calcService === "epoxy"
                                ? "accent-gradient-bg text-white shadow-md"
                                : "bg-slate-100 text-slate-400"
                            }`}
                            style={{ width: 72, height: 72 }}
                          >
                            <Paintbrush size={34} strokeWidth={1.6} />
                          </div>
                          <span
                            className={`font-heading font-bold text-lg transition-colors ${
                              calcService === "epoxy"
                                ? "text-accent-primary"
                                : "text-text-primary"
                            }`}
                          >
                            Epoxilackering
                          </span>
                          <span className="text-text-secondary text-sm">
                            1 100 SEK per m² (inkl. moms)
                          </span>
                        </motion.button>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          type="button"
                          disabled={!calcService}
                          onClick={() => setCalcStep(2)}
                          whileHover={calcService ? { scale: 1.02 } : {}}
                          whileTap={calcService ? { scale: 0.98 } : {}}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl accent-gradient-bg text-white font-heading font-semibold text-base shadow-lg shadow-accent-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          Fortsätt
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Enter dimensions ── */}
                  {calcStep === 2 && (
                    <motion.div
                      key="calc-step-2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10"
                    >
                      {calcService === "polishing" ? (
                        <>
                          <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl accent-gradient-bg text-white flex items-center justify-center mx-auto mb-4">
                              <Sparkles size={30} strokeWidth={1.6} />
                            </div>
                            <h2 className="font-heading text-2xl font-bold mb-2">
                              Hur lång är din båt?
                            </h2>
                            <p className="text-text-secondary text-base">
                              Ange längden i fot för att beräkna priset
                            </p>
                          </div>

                          <div className="max-w-xs mx-auto mb-8">
                            <label
                              htmlFor="boatFeet"
                              className="block text-sm font-semibold text-text-secondary mb-2"
                            >
                              Båtens längd (fot){" "}
                              <span className="text-accent-primary">*</span>
                            </label>
                            <input
                              id="boatFeet"
                              type="number"
                              min="1"
                              step="1"
                              placeholder="t.ex. 32"
                              value={boatFeet}
                              onChange={(e) => setBoatFeet(e.target.value)}
                              className={`${INPUT_CLASS} text-center text-xl font-heading font-bold`}
                            />
                            {boatFeet && parseFloat(boatFeet) > 0 && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-accent-primary font-heading font-bold text-lg mt-3"
                              >
                                ≈{" "}
                                {polishPrice.toLocaleString("sv-SE")} SEK
                              </motion.p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl accent-gradient-bg text-white flex items-center justify-center mx-auto mb-4">
                              <Paintbrush size={30} strokeWidth={1.6} />
                            </div>
                            <h2 className="font-heading text-2xl font-bold mb-2">
                              Ange båtens mått
                            </h2>
                            <p className="text-text-secondary text-base">
                              Vi beräknar skrovets yta för din offert
                            </p>
                          </div>

                          <div className="space-y-4 max-w-sm mx-auto mb-8">
                            <div>
                              <label
                                htmlFor="hullLength"
                                className="block text-sm font-semibold text-text-secondary mb-2"
                              >
                                Längd (meter){" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <input
                                id="hullLength"
                                type="number"
                                min="0.1"
                                step="0.1"
                                placeholder="t.ex. 10.5"
                                value={hullLength}
                                onChange={(e) => setHullLength(e.target.value)}
                                className={INPUT_CLASS}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="hullWidth"
                                className="block text-sm font-semibold text-text-secondary mb-2"
                              >
                                Bredd (meter){" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <input
                                id="hullWidth"
                                type="number"
                                min="0.1"
                                step="0.1"
                                placeholder="t.ex. 3.2"
                                value={hullWidth}
                                onChange={(e) => setHullWidth(e.target.value)}
                                className={INPUT_CLASS}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="hullHeight"
                                className="block text-sm font-semibold text-text-secondary mb-2"
                              >
                                Djupgående (meter){" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <input
                                id="hullHeight"
                                type="number"
                                min="0.1"
                                step="0.1"
                                placeholder="t.ex. 1.5"
                                value={hullHeight}
                                onChange={(e) => setHullHeight(e.target.value)}
                                className={INPUT_CLASS}
                              />
                            </div>

                            {hullArea > 0 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center pt-2"
                              >
                                <p className="text-text-secondary text-sm">
                                  Beräknad skrovyta:{" "}
                                  <span className="font-bold text-text-primary">
                                    {hullArea.toFixed(1)} m²
                                  </span>
                                </p>
                                <p className="text-accent-primary font-heading font-bold text-lg mt-1">
                                  ≈{" "}
                                  {epoxyBasePrice.toLocaleString("sv-SE")} SEK
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCalcStep(1)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-text-secondary font-heading font-semibold text-base hover:bg-slate-50 transition-colors"
                        >
                          <ArrowLeft size={18} />
                          Tillbaka
                        </button>
                        <motion.button
                          type="button"
                          disabled={!canContinueStep2}
                          onClick={() =>
                            setCalcStep(calcService === "epoxy" ? 3 : 3)
                          }
                          whileHover={canContinueStep2 ? { scale: 1.02 } : {}}
                          whileTap={canContinueStep2 ? { scale: 0.98 } : {}}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl accent-gradient-bg text-white font-heading font-semibold text-base shadow-lg shadow-accent-primary/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          Fortsätt
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3 (EPOXY ONLY): Warranty upsell ── */}
                  {calcStep === 3 && calcService === "epoxy" && (
                    <motion.div
                      key="calc-step-3-warranty"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10"
                    >
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                          <ShieldCheck size={32} />
                        </div>
                        <h2 className="font-heading text-2xl font-bold mb-2">
                          Uppgradera till 5-Årsgaranti
                        </h2>
                        <p className="text-accent-primary text-base font-medium">
                          Total trygghet för bara lite extra
                        </p>
                      </div>

                      {/* Warranty card */}
                      <motion.button
                        type="button"
                        onClick={() => setAddWarranty(!addWarranty)}
                        className={`w-full text-left rounded-2xl border-2 p-6 mb-6 transition-all duration-300 ${
                          addWarranty
                            ? "border-accent-primary bg-accent-primary/5 shadow-md"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                addWarranty
                                  ? "border-accent-primary bg-accent-primary"
                                  : "border-slate-300"
                              }`}
                            >
                              {addWarranty && (
                                <CheckCircle
                                  size={14}
                                  className="text-white"
                                />
                              )}
                            </div>
                            <span className="font-heading font-bold text-lg text-text-primary">
                              5-Årsgaranti
                            </span>
                          </div>
                          <span className="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-heading font-bold text-sm whitespace-nowrap">
                            Bara +
                            {warrantyCost > 0
                              ? warrantyCost.toLocaleString("sv-SE")
                              : Math.round(epoxyBasePrice * 0.05).toLocaleString("sv-SE")}{" "}
                            SEK
                          </span>
                        </div>
                        <p className="text-text-secondary text-base mb-4 ml-9">
                          Få{" "}
                          <span className="font-semibold text-text-primary">
                            fem gånger längre skydd
                          </span>{" "}
                          än vår standardgaranti. Problem? Vi fixar det.
                        </p>
                        <div className="grid grid-cols-2 gap-2 ml-9">
                          {[
                            "Flagning? Åtgärdas gratis",
                            "Bubblor? Åtgärdas gratis",
                            "Missfärgning? Åtgärdas gratis",
                            "Alla problem? Inga frågor",
                          ].map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-sm text-text-secondary"
                            >
                              <CheckCircle
                                size={14}
                                className="text-emerald-500 flex-shrink-0"
                              />
                              {item}
                            </div>
                          ))}
                        </div>
                      </motion.button>

                      <p className="text-center text-text-secondary text-sm mb-8">
                        {addWarranty ? (
                          <>
                            Det är bara{" "}
                            <span className="font-bold text-text-primary">
                              {Math.round(
                                (epoxyBasePrice * 0.05) / 5
                              ).toLocaleString("sv-SE")}{" "}
                              SEK per år
                            </span>{" "}
                            för total trygghet
                          </>
                        ) : (
                          "Inte intresserad? Inga problem — du har fortfarande vår standardgaranti."
                        )}
                      </p>

                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCalcStep(2)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-text-secondary font-heading font-semibold text-base hover:bg-slate-50 transition-colors"
                        >
                          <ArrowLeft size={18} />
                          Tillbaka
                        </button>
                        <motion.button
                          type="button"
                          onClick={() => setCalcStep(4)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl accent-gradient-bg text-white font-heading font-semibold text-base shadow-lg shadow-accent-primary/20 transition-all"
                        >
                          {addWarranty
                            ? "Fortsätt med Garanti"
                            : "Fortsätt med Standardgaranti"}
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── FINAL STEP: Quote summary (step 3 for polish, step 4 for epoxy) ── */}
                  {((calcStep === 3 && calcService === "polishing") ||
                    (calcStep === 4 && calcService === "epoxy")) && (
                    <motion.div
                      key="calc-summary"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Quote card */}
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 mb-6">
                        <div className="text-center mb-8">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              delay: 0.1,
                            }}
                          >
                            <CheckCircle
                              size={56}
                              className="text-emerald-500 mx-auto mb-4"
                            />
                          </motion.div>
                          <h2 className="font-heading text-2xl font-bold mb-1">
                            Din Uppskattade Offert
                          </h2>
                          <p className="text-text-secondary text-base">
                            Här är en sammanfattning av din beräkning
                          </p>
                        </div>

                        {/* Price breakdown */}
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 mb-6 space-y-3">
                          <div className="flex items-center justify-between text-base">
                            <span className="text-text-secondary">Tjänst</span>
                            <span className="font-semibold text-text-primary">
                              {calcService === "polishing"
                                ? "Polering & Vaxning"
                                : "Epoxilackering"}
                            </span>
                          </div>

                          {calcService === "polishing" ? (
                            <div className="flex items-center justify-between text-base">
                              <span className="text-text-secondary">
                                Båtens längd
                              </span>
                              <span className="font-semibold text-text-primary">
                                {boatFeet} fot × 635 SEK
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between text-base">
                                <span className="text-text-secondary">
                                  Mått (L × B × D)
                                </span>
                                <span className="font-semibold text-text-primary">
                                  {hullLength} × {hullWidth} × {hullHeight} m
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-base">
                                <span className="text-text-secondary">
                                  Skrovyta
                                </span>
                                <span className="font-semibold text-text-primary">
                                  {hullArea.toFixed(1)} m² × 1 100 SEK
                                </span>
                              </div>
                            </>
                          )}

                          <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-base">
                            <span className="text-text-secondary">
                              Baspris
                            </span>
                            <span className="font-semibold text-text-primary">
                              {(calcService === "polishing"
                                ? polishPrice
                                : epoxyBasePrice
                              ).toLocaleString("sv-SE")}{" "}
                              SEK
                            </span>
                          </div>

                          {calcService === "epoxy" && addWarranty && (
                            <div className="flex items-center justify-between text-base">
                              <span className="text-text-secondary">
                                5-Årsgaranti (+5%)
                              </span>
                              <span className="font-semibold text-text-primary">
                                +{warrantyCost.toLocaleString("sv-SE")} SEK
                              </span>
                            </div>
                          )}

                          <div className="border-t-2 border-accent-primary/20 pt-3 flex items-center justify-between">
                            <span className="font-heading font-bold text-lg text-text-primary">
                              Uppskattat Totalt
                            </span>
                            <span className="font-heading font-bold text-2xl text-accent-primary">
                              {finalPrice.toLocaleString("sv-SE")} SEK
                            </span>
                          </div>

                          <p className="text-xs text-text-secondary">
                            Alla priser inkl. moms
                          </p>
                        </div>

                        {/* Disclaimer */}
                        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
                          <Info
                            size={20}
                            className="text-amber-600 flex-shrink-0 mt-0.5"
                          />
                          <div className="text-sm text-amber-800 leading-relaxed">
                            <span className="font-bold">
                              Detta är en ungefärlig uppskattning.
                            </span>{" "}
                            Det slutgiltiga priset kan variera beroende på
                            faktorer som båtens skick, avstånd/plats,
                            tillgänglighet och materialval. Vi ger dig en exakt
                            offert efter en personlig bedömning.
                          </div>
                        </div>
                      </div>

                      {/* Booking form */}
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10">
                        <AnimatePresence mode="wait">
                          {bookingStatus === "success" ? (
                            <motion.div
                              key="booking-success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-8"
                            >
                              <CheckCircle
                                size={56}
                                className="text-emerald-500 mx-auto mb-4"
                              />
                              <h3 className="font-heading text-xl font-bold mb-2">
                                Tack! Vi hör av oss snart.
                              </h3>
                              <p className="text-text-secondary text-base mb-6">
                                Vi granskar din förfrågan och kontaktar dig inom
                                kort.
                              </p>
                              <button
                                onClick={resetCalc}
                                className="text-accent-primary hover:underline text-base font-medium"
                              >
                                Beräkna en ny offert
                              </button>
                            </motion.div>
                          ) : (
                            <motion.form
                              key="booking-form"
                              onSubmit={handleBookingSubmit}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="space-y-5"
                            >
                              <div className="text-center mb-4">
                                <h3 className="font-heading text-xl font-bold mb-1">
                                  Nöjd med offerten? Boka in dig!
                                </h3>
                                <p className="text-text-secondary text-base">
                                  Fyll i dina uppgifter så kontaktar vi dig
                                </p>
                              </div>

                              <div>
                                <label
                                  htmlFor="booking-name"
                                  className="block text-sm font-semibold text-text-secondary mb-2"
                                >
                                  Namn{" "}
                                  <span className="text-accent-primary">
                                    *
                                  </span>
                                </label>
                                <input
                                  id="booking-name"
                                  type="text"
                                  placeholder="Ditt fullständiga namn"
                                  required
                                  value={bookingForm.name}
                                  onChange={(e) =>
                                    setBookingForm((p) => ({
                                      ...p,
                                      name: e.target.value,
                                    }))
                                  }
                                  className={INPUT_CLASS}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="booking-phone"
                                  className="block text-sm font-semibold text-text-secondary mb-2"
                                >
                                  Telefon{" "}
                                  <span className="text-accent-primary">
                                    *
                                  </span>
                                </label>
                                <input
                                  id="booking-phone"
                                  type="tel"
                                  placeholder="+46 ..."
                                  required
                                  value={bookingForm.phone}
                                  onChange={(e) =>
                                    setBookingForm((p) => ({
                                      ...p,
                                      phone: e.target.value,
                                    }))
                                  }
                                  className={INPUT_CLASS}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="booking-email"
                                  className="block text-sm font-semibold text-text-secondary mb-2"
                                >
                                  E-post
                                </label>
                                <input
                                  id="booking-email"
                                  type="email"
                                  placeholder="din@epost.se"
                                  value={bookingForm.email}
                                  onChange={(e) =>
                                    setBookingForm((p) => ({
                                      ...p,
                                      email: e.target.value,
                                    }))
                                  }
                                  className={INPUT_CLASS}
                                />
                              </div>

                              {bookingStatus === "error" && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl"
                                >
                                  <AlertCircle size={16} />
                                  Något gick fel. Vänligen försök igen.
                                </motion.div>
                              )}

                              <motion.button
                                type="submit"
                                disabled={bookingStatus === "loading"}
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl accent-gradient-bg text-white font-heading font-semibold text-lg shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/30 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {bookingStatus === "loading" ? (
                                  <Loader2
                                    size={22}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <>
                                    <Send size={20} />
                                    Skicka Bokningsförfrågan
                                  </>
                                )}
                              </motion.button>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Back / start over */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          type="button"
                          onClick={() =>
                            setCalcStep(calcService === "epoxy" ? 3 : 2)
                          }
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-text-secondary font-heading font-semibold text-base hover:bg-slate-50 transition-colors"
                        >
                          <ArrowLeft size={18} />
                          Tillbaka
                        </button>
                        <button
                          type="button"
                          onClick={resetCalc}
                          className="text-text-secondary hover:text-accent-primary text-sm font-medium transition-colors"
                        >
                          Börja om
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
