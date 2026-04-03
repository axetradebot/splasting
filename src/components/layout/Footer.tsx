"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a Quote" },
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
            <p className="text-text-secondary text-sm leading-relaxed">
              Premium boat interior and exterior restoration across the Swedish
              West Coast. Craftsmanship you can trust.
            </p>
            <p className="text-text-secondary text-sm">
              🇸🇪 Proudly serving Marstrand & the Swedish West Coast
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-200 text-sm"
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
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+46000000000"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-sm"
                >
                  <Phone size={16} />
                  +46 (0) 00 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@specialplastning.se"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors text-sm"
                >
                  <Mail size={16} />
                  info@specialplastning.se
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={16} />
                Marstrand, Sweden
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-glass-border text-center text-text-secondary text-sm">
          <p>
            &copy; {new Date().getFullYear()} Special Plastning & Målning
            Västkusten. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
