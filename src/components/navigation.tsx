"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/", label: "Головна" },
  { href: "/team", label: "Команда" },
  { href: "/training", label: "Тренування" },
  { href: "/blog", label: "Блог" },
  { href: "/calendar", label: "Календар" },
  { href: "/contacts", label: "Про нас" },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <Logo variant="header" />

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-mono uppercase tracking-[0.2em] transition-colors ${
                  active ? "text-accent" : "text-foreground/70 hover:text-accent"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent shadow-[0_0_8px_var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.strava.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#FC4C02]/50 hover:border-[#FC4C02] transition-all hover:bg-[#FC4C02]/10"
            aria-label="Strava"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#FC4C02"
              aria-hidden
            >
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169" />
            </svg>
          </a>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-accent/50 text-muted hover:text-accent transition-all hover:bg-accent/5"
            aria-label="Перемкнути тему"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}