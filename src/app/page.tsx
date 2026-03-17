"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InstagramPhotoRotator } from "@/components/instagram-photo-rotator";
import type { SiteContent } from "@/lib/content";

const defaultStats = [
  { label: "років досвіду", value: "10+" },
  { label: "проведених тренувань", value: "500+" },
  { label: "дисципліни", value: "XC & Road" },
];

export default function Home() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => {});
  }, []);

  const texts = content?.texts ?? {};
  const stats =
    typeof texts["stats.0.value"] === "string" &&
    typeof texts["stats.0.label"] === "string"
      ? [
          { value: texts["stats.0.value"], label: texts["stats.0.label"] },
          { value: (texts["stats.1.value"] as string) ?? defaultStats[1].value, label: (texts["stats.1.label"] as string) ?? defaultStats[1].label },
          { value: (texts["stats.2.value"] as string) ?? defaultStats[2].value, label: (texts["stats.2.label"] as string) ?? defaultStats[2].label },
        ]
      : defaultStats;
  const heroPhoto = content?.images?.["hero.photo"] as string | undefined;

  return (
    <div className="relative space-y-16">
      <div className="lab-noise" />

      <section className="grid gap-12 pt-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="space-y-8">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent-dim px-4 py-1.5 card-meta text-accent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
            {(texts["hero.tagline"] as string) ?? "Лабораторія твоєї швидкості"}
          </motion.p>

          <motion.h1
            className="font-bold tracking-tight leading-[1.1] text-[1.11rem] sm:text-[1.33rem] md:text-[1.78rem] lg:text-[2.22rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-accent drop-shadow-[0_0_24px_rgba(255,48,0,0.5)]">
              {(texts["hero.title"] as string) ?? "BIKE LIKE A BOSS"}
            </span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-[11px] text-muted leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {(texts["hero.description"] as string) ??
              "Наш райдер - потужний як шосер, вправний як гравіті-воїн, захищений як мамина черешня 🍒"}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="/training"
              className="group inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-2.5 text-xs font-mono uppercase tracking-[0.25em] font-medium text-white shadow-[0_0_28px_rgba(255,48,0,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,48,0,0.5)] hover:bg-accent-bright"
            >
              {(texts["hero.cta1"] as string) ?? "Записатися на тренування"}
            </a>
            <a
              href="/calendar"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-steel/50 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.25em] text-muted hover:border-accent/60 hover:text-accent transition-all"
            >
              {(texts["hero.cta2"] as string) ?? "Розклад клубних заїздів"}
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2 text-xs font-mono uppercase tracking-[0.2em] w-full max-w-[min(100%,33rem)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card/80 px-4 py-3.5 card-hover card-accent-top"
              >
                <div className="text-accent text-base font-semibold">{s.value}</div>
                <div className="mt-1 card-meta text-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {heroPhoto ? (
          <motion.div
            className="relative flex aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-black shadow-[0_0_60px_-12px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img src={heroPhoto} alt="BikeLab hero" className="h-full w-full object-cover" />
          </motion.div>
        ) : (
          <motion.a
            href="https://www.instagram.com/bike_like_a_boss"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-slate-900/90 via-black to-slate-950/90 shadow-[0_0_60px_-12px_rgba(0,0,0,0.6)] transition-shadow hover:shadow-[0_0_48px_-8px_rgba(255,48,0,0.25)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,48,0,0.15),transparent_50%),radial-gradient(ellipse_60%_40%_at_90%_100%,rgba(77,92,68,0.15),transparent_45%)]" />
            {/* Фото з тонкою обводкою та мінімальним відступом */}
            <div className="relative flex-1 px-1.5 sm:px-2 pt-2 pb-0.5 flex flex-col min-h-0">
              <div className="relative flex-1 min-h-0 overflow-hidden max-w-[95%] mx-auto w-full border border-border/60 rounded-sm">
                <InstagramPhotoRotator />
              </div>
            </div>
            {/* Під фото: @handle і кнопка Підписатися */}
            <div className="relative shrink-0 p-4 pt-2 pb-5 space-y-3">
              <p className="text-base font-semibold text-foreground">@bike_like_a_boss</p>
              <span className="block w-full rounded-full border border-accent bg-accent py-2.5 text-center text-xs font-mono uppercase tracking-[0.25em] font-medium text-white shadow-[0_0_20px_rgba(255,48,0,0.3)] transition-all hover:bg-accent-bright hover:shadow-[0_0_28px_rgba(255,48,0,0.4)]">
                Підписатися
              </span>
            </div>
          </motion.a>
        )}
      </section>

      {/* Відгуки клієнтів */}
      <section className="border-t border-border/60 pt-12">
        <h2 className="section-label text-foreground/90 mb-4">Відгуки</h2>
        <div className="grid gap-5 md:grid-cols-3 text-xs">
          <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-accent/50 flex gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tolia&backgroundColor=4d5c44&radius=50"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-accent/30 object-cover bg-steel self-start"
            />
            <div className="min-w-0 flex flex-col flex-1">
              <p className="text-foreground/90 leading-relaxed flex-1">
                Я був здивований наскільки просто пояснюють складні речі, завдяки чому все виходило в 100 разів швидше ніж коли сам вчився.
              </p>
              <cite className="mt-3 text-[11px] font-mono text-accent not-italic">
                Толя
              </cite>
            </div>
          </blockquote>
          <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-olive-light/50 flex gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Serhii&backgroundColor=4d5c44&radius=50"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-accent/30 object-cover bg-steel self-start"
            />
            <div className="min-w-0 flex flex-col flex-1">
              <p className="text-foreground/90 leading-relaxed flex-1">
                Я прийшов повним профаном, тепер катаю заднім колесом по 10 метрів, а всього рік тому сів на велосипед.
              </p>
              <cite className="mt-3 text-[11px] font-mono text-accent not-italic">
                Сергій
              </cite>
            </div>
          </blockquote>
          <blockquote className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-accent/50 flex gap-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tania&backgroundColor=4d5c44&radius=50"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-accent/30 object-cover bg-steel self-start"
            />
            <div className="min-w-0 flex flex-col flex-1">
              <p className="text-foreground/90 leading-relaxed flex-1">
                Була приємно здивована що стільки дівчат на тренуваннях, що можна не тільки покатати, а поспілкуватися на дівчачі теми.
              </p>
              <cite className="mt-3 text-[11px] font-mono text-accent not-italic">
                Таня
              </cite>
            </div>
          </blockquote>
        </div>
      </section>

      <section className="grid gap-6 border-t border-border/60 pt-12 text-xs text-muted md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-olive-light/50">
          <div className="section-label text-foreground/80 text-[11px]">XC / Trail</div>
          <p className="mt-2 leading-relaxed text-foreground/85">
            Технічні тренування в Голосієві: коріння, каміння, вузькі стежки. Ми
            знімаємо відео, аналізуємо позицію, кут атаки та роботу підвіски.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-accent/50">
          <div className="section-label text-foreground/80 text-[11px]">Road / Race</div>
          <p className="mt-2 leading-relaxed text-foreground/85">
            Інтервальні блоки на Бориспільській трасі, робота в групі, енергетика
            на довгих заїздах, підготовка до гранфондо та стартів.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 card-hover border-l-2 border-l-olive-light/50">
          <div className="section-label text-foreground/80 text-[11px]">Tour de Drone</div>
          <p className="mt-2 leading-relaxed text-foreground/85">
            Волонтерський напрямок клубу: тренуємось, знімаємо контент та
            перетворюємо кілометри на підтримку виробництва дронів для ЗСУ.
          </p>
        </div>
      </section>
    </div>
  );
}
