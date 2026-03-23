"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

const STRIPE_COLORS: Record<string, string> = {
  red: "#ef4444",
  white: "#fafafa",
  blue: "#3b82f6",
  yellow: "#eab308",
};

type TrainingCardProps = {
  title: string;
  level: "XC" | "Road" | "All";
  stripeColor?: "red" | "white" | "blue" | "yellow";
  description: string;
  price: string;
  duration: string;
  badge?: string;
  footer?: ReactNode;
};

export function TrainingCard({
  title,
  level,
  stripeColor,
  description,
  price,
  duration,
  badge,
  footer,
}: TrainingCardProps) {
  const stripe = stripeColor ? STRIPE_COLORS[stripeColor] : undefined;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");

  function submitLead() {
    const subject = `Заявка на тренування: ${title}`;
    const body =
      `Тренування: ${title}\n` +
      `Ім'я: ${name || "-"}\n` +
      `Контакт: ${contact || "-"}\n` +
      `Коментар: ${note || "-"}`;
    const mailto = `mailto:lab@bikelab.kyiv?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 p-5 card-hover hover:border-accent/50"
    >
      {stripe && (
        <div
          className="absolute left-0 right-0 top-0 h-1.5 shrink-0"
          style={{ backgroundColor: stripe }}
        />
      )}
      <div className={stripe ? "mt-1" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div
              className="flex items-center gap-1.5 card-meta text-muted text-[14px]"
              style={{ fontFamily: "var(--font-heading), var(--font-sans), sans-serif" }}
            >
              <span className="inline-flex h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              {level === "All" ? "XC / Road" : level}
            </div>
            <h3
              className="card-title text-[22px] leading-tight"
              style={{ fontFamily: "var(--font-heading), var(--font-sans), sans-serif" }}
            >
              {title}
            </h3>
          </div>
          {badge && (
            <span className="rounded-full border border-accent/40 bg-black/40 px-2 py-0.5 card-meta text-accent">
              {badge}
            </span>
          )}
        </div>

        <p
          className="mt-2 card-desc text-muted text-[22px] leading-relaxed"
          style={{ fontFamily: "var(--font-heading), var(--font-sans), sans-serif" }}
        >
          {description}
        </p>

        <div
          className="mt-3 flex items-center justify-between card-price text-muted text-[17px]"
          style={{ fontFamily: "var(--font-heading), var(--font-sans), sans-serif" }}
        >
          <span>{duration || ""}</span>
          {price && (
            <span className="text-foreground">
              {price}
              {!price.toLowerCase().includes("в розробці") && (
                <span className="text-muted"> / блок</span>
              )}
            </span>
          )}
        </div>

        <div className="mt-4 border-t border-border/60 pt-3">
          {!open ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full rounded-xl border border-accent/40 bg-accent-dim px-3 py-2 text-[12px] font-mono uppercase tracking-[0.12em] text-accent hover:border-accent/70"
            >
              Залишити заявку
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
              />
              <input
                type="text"
                placeholder="Телефон або Telegram"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
              />
              <textarea
                placeholder="Коментар (необов'язково)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full resize-none rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={submitLead}
                  className="flex-1 rounded-lg bg-accent px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-white hover:bg-accent-bright"
                >
                  Надіслати
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-muted hover:text-foreground"
                >
                  Скасувати
                </button>
              </div>
            </div>
          )}
          {footer && <div className="mt-2 flex items-center justify-end card-meta">{footer}</div>}
        </div>
      </div>
    </motion.article>
  );
}
