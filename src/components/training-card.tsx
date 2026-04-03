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
  ctaText?: string;
  ctaDisabled?: boolean;
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
  ctaText = "Залишити заявку",
  ctaDisabled = false,
}: TrainingCardProps) {
  const stripe = stripeColor ? STRIPE_COLORS[stripeColor] : undefined;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string>("");

  async function submitLead() {
    if (sending) return;
    setStatus("");
    setSending(true);

    const subject = `Заявка на тренування: ${title}`;
    const body =
      `Тренування: ${title}\n` +
      `Ім'я: ${name || "-"}\n` +
      `Контакт: ${contact || "-"}\n` +
      `Email: ${email || "-"}\n` +
      `Коментар: ${note || "-"}`;
    const to = "annavergeles@gmail.com";
    try {
      const res = await fetch("/api/training-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          name,
          contact,
          email,
          note,
        }),
      });

      if (res.ok) {
        setStatus("Дякуємо! Заявка надіслана.");
        setName("");
        setContact("");
        setEmail("");
        setNote("");
        return;
      }
    } catch {
      // If API is unavailable, fallback to local mail client.
    } finally {
      setSending(false);
    }

    const encSubject = encodeURIComponent(subject);
    const encBody = encodeURIComponent(body);
    const mailto = `mailto:${to}?subject=${encSubject}&body=${encBody}`;
    window.location.href = mailto;
    setStatus("Відкрито поштовий клієнт для надсилання заявки.");
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
              className="flex items-center gap-1.5 text-muted text-[12px] font-medium tracking-normal"
              style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
            >
              <span className="inline-flex h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              {level === "All" ? "XC / Road" : level}
            </div>
            <h3
              className="text-foreground text-[15px] md:text-[16px] font-semibold leading-tight tracking-normal"
              style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
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
          className="mt-2 text-foreground/85 text-[13px] md:text-[14px] leading-[1.5] tracking-normal"
          style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          {description}
        </p>

        <div
          className="mt-3 flex items-center justify-between text-muted text-[13px] md:text-[14px] font-medium"
          style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}
        >
          <span>{duration || ""}</span>
          {price && (
            <span className="text-foreground">
              {price}
            </span>
          )}
        </div>

        <div className="mt-4 border-t border-border/60 pt-3">
          {!open ? (
            <button
              type="button"
              onClick={() => {
                if (!ctaDisabled) setOpen(true);
              }}
              disabled={ctaDisabled}
              className={`w-full rounded-xl border px-3 py-2 text-[12px] font-mono uppercase tracking-[0.12em] ${
                ctaDisabled
                  ? "border-border bg-card/60 text-muted cursor-not-allowed"
                  : "border-accent/40 bg-accent-dim text-accent hover:border-accent/70"
              }`}
            >
              {ctaText}
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
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  disabled={sending}
                  className="flex-1 rounded-lg bg-accent px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-white hover:bg-accent-bright"
                >
                  {sending ? "Надсилаємо..." : "Надіслати"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-muted hover:text-foreground"
                >
                  Скасувати
                </button>
              </div>
              <p className="text-[11px] text-muted">
                Заявка надсилається автоматично. Якщо сервіс пошти тимчасово недоступний, відкриється
                поштовий клієнт.
              </p>
              {status && <p className="text-[11px] text-foreground/80">{status}</p>}
            </div>
          )}
          {footer && <div className="mt-2 flex items-center justify-end card-meta">{footer}</div>}
        </div>
      </div>
    </motion.article>
  );
}
