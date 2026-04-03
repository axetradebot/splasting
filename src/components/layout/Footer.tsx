"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/services", label: "Tjänster" },
  { href: "/gallery", label: "Galleri" },
  { href: "/about", label: "Om Oss" },
  { href: "/contact", label: "Kontakt" },
  { href: "/quote", label: "Begär Offert" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Special Plastning & Målning"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-heading font-bold text-lg">
                Special Plastning
              </span>
            </Link>
            <p className="text-text-secondary text-base leading-relaxed">
              Premium båtrestaurering och underhåll längs Sveriges Västkust.
              Hantverk du kan lita på.
            </p>
            <p className="text-text-secondary text-sm">
              🇸🇪 Stolt verksamma i Marstrand & Svenska Västkusten
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Snabblänkar
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-200 text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Kontakta Oss
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+46000000000"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-base"
                >
                  <Phone size={18} />
                  +46 (0) 00 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@specialplastning.se"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-base"
                >
                  <Mail size={18} />
                  info@specialplastning.se
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary text-base">
                <MapPin size={18} />
                Marstrand, Sverige
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-glass-border text-center text-text-secondary text-sm">
          <p>
            &copy; {new Date().getFullYear()} Special Plastning & Målning
            Västkusten. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
