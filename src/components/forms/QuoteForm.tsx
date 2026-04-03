"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    details: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

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
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", service: "", details: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle
                size={64}
                className="text-emerald-400 mx-auto mb-4"
              />
            </motion.div>
            <h3 className="font-heading text-2xl font-bold mb-2">
              Offertförfrågan Skickad!
            </h3>
            <p className="text-text-secondary text-base">
              Vi granskar din förfrågan och återkommer inom ett par timmar med
              en detaljerad offert.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-accent-primary hover:underline text-sm"
            >
              Skicka en ny förfrågan
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold mb-1">
                Begär en Gratis Offert
              </h3>
              <p className="text-text-secondary text-base">
                Fyll i uppgifterna nedan så kontaktar vi dig snabbt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Namn"
                name="name"
                placeholder="Ditt namn"
                required
                value={form.name}
                onChange={handleChange}
              />
              <FormInput
                label="Telefon"
                name="phone"
                type="tel"
                placeholder="+46 ..."
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <FormInput
              label="Tjänst"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              options={[
                { value: "exterior", label: "Exteriör Restaurering" },
                { value: "interior", label: "Interiör Restaurering" },
                { value: "custom", label: "Specialarbeten" },
                { value: "multiple", label: "Flera Tjänster" },
                { value: "other", label: "Annat" },
              ]}
            />

            <FormInput
              label="Meddelande"
              name="details"
              placeholder="Berätta om din båt och vad du vill ha gjort. Vi kontaktar dig för foton vid behov."
              textarea
              rows={4}
              value={form.details}
              onChange={handleChange}
            />

            <p className="text-text-secondary text-sm">
              📸 Vi kontaktar dig för foton av din båt efter att vi mottagit din
              förfrågan.
            </p>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                Något gick fel. Vänligen försök igen.
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Skicka Offertförfrågan
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
