"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Wrench,
  Image as ImageIcon,
  Users,
  MessageSquare,
} from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      aria-label="Mobile navigation"
    >
      <div className="glass-card-strong border-t border-glass-border">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.href !== "/" && pathname.startsWith(tab.href));
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center w-16 py-1"
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -top-2 w-8 h-0.5 rounded-full accent-gradient-bg"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-accent-primary" : "text-text-secondary"
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                </motion.div>
                <span
                  className={`text-[10px] mt-0.5 transition-colors duration-200 ${
                    isActive
                      ? "text-accent-primary font-semibold"
                      : "text-text-secondary"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-accent-primary/5"
                    layoutId="tab-bg"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
