"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Tjänster" },
  { href: "/gallery", label: "Galleri" },
  { href: "/about", label: "Om Oss" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      setTopBarVisible(current < 50 || current < lastScroll);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top info bar — desktop only */}
      <AnimatePresence>
        {topBarVisible && (
          <motion.div
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            exit={{ y: -40 }}
            className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center gap-6">
                <a
                  href="tel:+46000000000"
                  className="flex items-center gap-2 hover:text-accent-primary transition-colors"
                  aria-label="Ring oss"
                >
                  <Phone size={14} />
                  <span>+46 (0) 00 000 00 00</span>
                </a>
                <a
                  href="mailto:info@specialplastning.se"
                  className="flex items-center gap-2 hover:text-accent-primary transition-colors"
                  aria-label="Maila oss"
                >
                  <Mail size={14} />
                  <span>info@specialplastning.se</span>
                </a>
              </div>
              <span>🇸🇪 Marstrand, Sverige</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main nav — desktop only */}
      <motion.nav
        className={`hidden md:block fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
            : topBarVisible
              ? "top-10 bg-white/70 backdrop-blur-lg"
              : "top-0 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Hem">
            <Image
              src="/images/logo.jpg"
              alt="Special Plastning & Målning"
              width={44}
              height={44}
              className="rounded-lg"
            />
            <span className="font-heading font-bold text-lg text-text-primary">
              Special Plastning
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button href="/quote" size="sm">
            Begär Offert
          </Button>
        </div>
      </motion.nav>
    </>
  );
}
