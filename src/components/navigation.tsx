"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Головна" },
  { href: "/team", label: "Команда" },
  { href: "/training", label: "Тренування" },
  { href: "/calendar", label: "Розклад" },
  { href: "/contacts", label: "Про нас" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      {/* Той самий контейнер що й main — логотипи по краях контенту, не сторінки */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-3.5 flex items-center">
        {/* Лого по лівому краю контенту (збігається з початком тексту нижче) */}
        <div className="w-[100px] sm:w-[120px] shrink-0 flex justify-start">
          <Logo variant="header" cropToLetters className="max-w-full" />
        </div>

        {/* Навігація по центру між лого та Strava */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 min-w-0">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-mono uppercase tracking-[0.2em] transition-colors shrink-0 ${
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

        {/* Strava по правому краю контенту (збігається з кінцем тексту нижче) */}
        <div className="w-[100px] sm:w-[120px] shrink-0 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-accent/50 text-muted hover:text-accent transition-all hover:bg-accent/5"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <a
            href="https://www.strava.com/clubs/BLABtraining"
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
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 top-16 bg-black/55 backdrop-blur-[2px]"
            aria-label="Закрити меню"
          />
          <div className="md:hidden fixed inset-x-0 top-16 z-50 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <div className="grid gap-2">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl border px-4 py-3 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${
                        active
                          ? "border-accent/60 bg-accent/10 text-accent"
                          : "border-border bg-card/50 text-foreground/80 hover:border-accent/50 hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}