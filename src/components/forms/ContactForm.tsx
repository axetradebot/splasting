"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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
        "https://formspree.io/f/CONTACT_FORM_ID" /* TODO: Replace with real Formspree ID */,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
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
              Meddelande Skickat!
            </h3>
            <p className="text-text-secondary text-base">
              Vi återkommer inom ett par timmar.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-accent-primary hover:underline text-sm"
            >
              Skicka ett nytt meddelande
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
            <h3 className="font-heading text-xl font-semibold mb-2">
              Skicka ett Meddelande
            </h3>

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
                label="E-post"
                name="email"
                type="email"
                placeholder="din@epost.se"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Telefon"
                name="phone"
                type="tel"
                placeholder="+46 ..."
                value={form.phone}
                onChange={handleChange}
              />
              <FormInput
                label="Tjänst"
                name="service"
                value={form.service}
                onChange={handleChange}
                options={[
                  { value: "exterior", label: "Exteriör Restaurering" },
                  { value: "interior", label: "Interiör Restaurering" },
                  { value: "custom", label: "Specialarbeten" },
                  { value: "other", label: "Annat" },
                ]}
              />
            </div>

            <FormInput
              label="Meddelande"
              name="message"
              placeholder="Berätta om ditt projekt..."
              required
              textarea
              rows={5}
              value={form.message}
              onChange={handleChange}
            />

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
                  Skicka Meddelande
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
