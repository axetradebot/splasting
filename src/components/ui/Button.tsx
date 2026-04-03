"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "warm";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  breathe?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
  breathe = false,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-300 cursor-pointer select-none";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const variantStyles = {
    primary:
      "accent-gradient-bg text-white shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40",
    ghost:
      "border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    warm: "bg-accent-warm text-bg-primary shadow-lg shadow-accent-warm/20 hover:shadow-accent-warm/40",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${breathe ? "animate-breathe" : ""} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
