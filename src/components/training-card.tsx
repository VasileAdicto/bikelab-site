"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
            <div className="flex items-center gap-1.5 card-meta text-muted text-[12px]">
              <span className="inline-flex h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
              {level === "All" ? "XC / Road" : level}
            </div>
            <h3 className="card-title text-[17px]">{title}</h3>
          </div>
          {badge && (
            <span className="rounded-full border border-accent/40 bg-black/40 px-2 py-0.5 card-meta text-accent">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-2 card-desc text-muted text-[15px] leading-relaxed">
          {description}
        </p>

        <div className="mt-3 flex items-center justify-between card-price text-muted text-[14px]">
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

        <div className="mt-3 flex items-center justify-between pt-2 card-meta">
          <button className="inline-flex items-center gap-0.5 rounded-full border border-border px-2 py-0.5 text-muted transition-colors group-hover:border-accent/70 group-hover:text-accent">
            Деталі протоколу
            <ArrowRight className="h-2.5 w-2.5" />
          </button>
          {footer}
        </div>
      </div>
    </motion.article>
  );
}
