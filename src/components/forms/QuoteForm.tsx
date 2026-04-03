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
    email: "",
    phone: "",
    boatType: "",
    service: "",
    preferredDate: "",
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
        setForm({
          name: "",
          email: "",
          phone: "",
          boatType: "",
          service: "",
          preferredDate: "",
          details: "",
        });
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
              Quote Request Sent!
            </h3>
            <p className="text-text-secondary">
              We&apos;ll review your request and get back to you within a few
              hours with a detailed quote.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-accent-primary hover:underline text-sm"
            >
              Submit another request
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
                Request a Free Quote
              </h3>
              <p className="text-text-secondary text-sm">
                Fill in the details below and we&apos;ll prepare a personalized
                quote for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Name"
                name="name"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+46 ..."
                required
                value={form.phone}
                onChange={handleChange}
              />
              <FormInput
                label="Boat Type / Size"
                name="boatType"
                placeholder="e.g. 35ft Sailboat"
                value={form.boatType}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Service Required"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                options={[
                  { value: "exterior", label: "Exterior Restoration" },
                  { value: "interior", label: "Interior Restoration" },
                  { value: "custom", label: "Custom Work" },
                  { value: "multiple", label: "Multiple Services" },
                  { value: "other", label: "Other" },
                ]}
              />
              <FormInput
                label="Preferred Start Date"
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={handleChange}
              />
            </div>

            <FormInput
              label="Additional Details"
              name="details"
              placeholder="Tell us about your boat and what you'd like done. We'll contact you for photos if needed."
              textarea
              rows={5}
              value={form.details}
              onChange={handleChange}
            />

            <p className="text-text-secondary text-xs">
              📸 We&apos;ll contact you for photos of your boat after receiving
              your request.
            </p>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                Something went wrong. Please try again.
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
                  Submit Quote Request
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
