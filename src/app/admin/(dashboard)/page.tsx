"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

type TextKey =
  | "hero.tagline"
  | "hero.title"
  | "hero.description"
  | "hero.cta1"
  | "hero.cta2"
  | "stats.0.value"
  | "stats.0.label"
  | "stats.1.value"
  | "stats.1.label"
  | "stats.2.value"
  | "stats.2.label";

type EditableTextProps = {
  id: TextKey | string;
  initial: string;
  className?: string;
  as?: "p" | "h1" | "span";
  multiline?: boolean;
  save: (id: string, value: string) => Promise<void>;
  valueFromContent?: string | undefined;
  onSelect?: (id: string) => void;
};

function EditableText({
  id,
  initial,
  className,
  as = "p",
  multiline,
  save,
  valueFromContent,
  onSelect,
}: EditableTextProps) {
  const [value, setValue] = useState<string>(valueFromContent ?? initial);

  // Якщо контент змінився ззовні — оновлюємо
  useEffect(() => {
    setValue(valueFromContent ?? initial);
  }, [valueFromContent, initial]);

  async function commit(newValue: string) {
    setValue(newValue);
    if (newValue !== valueFromContent) {
      await save(id, newValue);
    }
  }

  const TextTag = as;

  return (
    <TextTag
      className={className}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => onSelect?.(id)}
      onInput={(e: React.FormEvent<HTMLElement>) =>
        setValue((e.currentTarget.textContent ?? "").trimStart())
      }
      onBlur={(e: React.FocusEvent<HTMLElement>) =>
        commit((e.currentTarget.textContent ?? "").trim())
      }
    >
      {value}
    </TextTag>
  );
}

export default function AdminDashboardPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Unauthorized"))))
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  async function savePartial(partial: Partial<SiteContent>) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(partial),
      });
      if (res.ok) {
        const data = (await res.json()) as SiteContent;
        setContent(data);
      }
    } finally {
      setSaving(false);
    }
  }

  async function saveText(id: string, value: string) {
    await savePartial({ texts: { [id]: value } });
  }

  if (loading || !content) {
    return (
      <div className="p-8 text-center text-muted">
        {loading ? "Завантаження…" : "Немає доступу. Увійдіть в систему."}
      </div>
    );
  }

  const texts = content.texts ?? {};
  const images = content.images ?? {};
  const sizes = content.sizes ?? {};
  const fontSizes = content.fontSizes ?? {};
  const customCode = content.customCode ?? {};

  const get = (id: TextKey, fallback: string) =>
    typeof texts[id] === "string" ? (texts[id] as string) : fallback;

  return (
    <div className="relative space-y-16 max-w-6xl mx-auto px-4 sm:px-6 pb-20 pt-10">
      <div className="mb-4 text-xs text-muted">
        Режим редагування: <span className="text-accent">двічі клікни по тексту, щоб змінити його</span>.
      </div>

      {/* Герой як на головній, але редагований */}
      <section className="grid gap-12 pt-2 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start border border-dashed border-border rounded-2xl p-4 sm:p-6 bg-card/40">
        <div className="space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent-dim px-4 py-1.5 card-meta text-accent cursor-pointer">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
            <EditableText
              id="hero.tagline"
              initial="Лабораторія твоєї швидкості"
              valueFromContent={get("hero.tagline", "Лабораторія твоєї швидкості")}
              className="inline"
              save={saveText}
              onSelect={setSelected}
            />
          </p>

          <EditableText
            id="hero.title"
            initial="BIKE LIKE A BOSS"
            valueFromContent={get("hero.title", "BIKE LIKE A BOSS")}
            as="h1"
            className="font-bold tracking-tight leading-[1.1] text-[1.11rem] sm:text-[1.33rem] md:text-[1.78rem] lg:text-[2.22rem] text-accent drop-shadow-[0_0_24px_rgba(255,48,0,0.5)] cursor-pointer"
            save={saveText}
            onSelect={setSelected}
          />

          <EditableText
            id="hero.description"
            initial="Наш райдер - потужний як шосер, вправний як гравіті-воїн, захищений як мамина черешня 🍒"
            valueFromContent={get(
              "hero.description",
              "Наш райдер - потужний як шосер, вправний як гравіті-воїн, захищений як мамина черешня 🍒"
            )}
            className="max-w-xl text-[11px] text-muted leading-relaxed cursor-pointer"
            multiline
            save={saveText}
            onSelect={setSelected}
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="group inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-6 py-2.5 font-mono uppercase tracking-[0.25em] font-medium text-white shadow-[0_0_28px_rgba(255,48,0,0.4)] cursor-pointer"
              style={{
                width: sizes["hero.cta1.width"],
                fontSize: fontSizes["hero.cta1"],
                color: customCode["hero.cta1.color"],
              }}
              onClick={() => setSelected("hero.cta1")}
            >
              <EditableText
                id="hero.cta1"
                initial="Записатися на тренування"
                valueFromContent={get("hero.cta1", "Записатися на тренування")}
                as="span"
                className="cursor-pointer"
                save={saveText}
                onSelect={setSelected}
              />
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-border bg-steel/50 px-5 py-2.5 font-mono uppercase tracking-[0.25em] text-muted cursor-pointer"
              style={{
                width: sizes["hero.cta2.width"],
                fontSize: fontSizes["hero.cta2"],
                color: customCode["hero.cta2.color"],
              }}
              onClick={() => setSelected("hero.cta2")}
            >
              <EditableText
                id="hero.cta2"
                initial="Розклад клубних заїздів"
                valueFromContent={get("hero.cta2", "Розклад клубних заїздів")}
                as="span"
                className="cursor-pointer"
                save={saveText}
                onSelect={setSelected}
              />
            </button>
          </div>

          {/* Статистика 10+ / 500+ / XC & Road */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2 text-xs font-mono uppercase tracking-[0.2em] w-full max-w-[min(100%,33rem)]">
            {[
              { idValue: "stats.0.value", idLabel: "stats.0.label", defV: "10+", defL: "років досвіду" },
              { idValue: "stats.1.value", idLabel: "stats.1.label", defV: "500+", defL: "проведених тренувань" },
              { idValue: "stats.2.value", idLabel: "stats.2.label", defV: "XC & Road", defL: "дисципліни" },
            ].map((s) => (
              <div
                key={s.idLabel}
                className="rounded-xl border border-border bg-card/80 px-4 py-3.5 card-hover card-accent-top cursor-pointer"
                onClick={() => setSelected(s.idLabel)}
              >
                <EditableText
                  id={s.idValue}
                  initial={s.defV}
                  valueFromContent={get(s.idValue as TextKey, s.defV)}
                  as="p"
                  className="text-accent text-base font-semibold"
                  save={saveText}
                  onSelect={setSelected}
                />
                <EditableText
                  id={s.idLabel}
                  initial={s.defL}
                  valueFromContent={get(s.idLabel as TextKey, s.defL)}
                  as="p"
                  className="mt-1 card-meta text-muted"
                  save={saveText}
                  onSelect={setSelected}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Правий блок — прев'ю та заміна фото героя */}
        <div className="hidden md:block rounded-3xl border border-dashed border-border bg-card/40 p-4 text-xs text-muted">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card/80">
            {images["hero.photo"] ? (
              <img
                src={images["hero.photo"]}
                alt="Hero photo"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-muted">
                Поки що використовується стандартний Instagram‑блок на головній. Тут можна завантажити власне фото героя.
              </div>
            )}
            <label className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 border border-border text-[11px] text-foreground cursor-pointer hover:border-accent hover:text-accent">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const form = new FormData();
                  form.set("file", file);
                  form.set("key", "hero.photo");
                  const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    credentials: "include",
                    body: form,
                  });
                  const data = await res.json();
                  if (data?.url) {
                    await savePartial({ images: { "hero.photo": data.url } });
                  }
                  e.target.value = "";
                }}
              />
              Змінити фото
            </label>
          </div>
        </div>
      </section>

      {/* Панель налаштувань вибраного елемента (як тулбар зверху) */}
      <section className="fixed left-1/2 top-16 z-[60] -translate-x-1/2 rounded-full border border-border bg-card/90 backdrop-blur px-4 py-2 text-xs text-muted flex items-center gap-4 shadow-lg">
        {!selected && <p>Клікни по кнопці або картці статистики, щоб налаштувати її.</p>}
        {selected && (
          <>
            <p className="text-foreground font-semibold">Налаштування: {selected}</p>
            {(selected === "hero.cta1" || selected === "hero.cta2") && (
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block mb-1">Ширина (px або rem)</label>
                  <input
                    type="text"
                    defaultValue={sizes[`${selected}.width`] ?? ""}
                    placeholder="наприклад 220px або 14rem"
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-foreground"
                    onBlur={(e) =>
                      savePartial({
                        sizes: { ...sizes, [`${selected}.width`]: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Розмір шрифту (px/rem)</label>
                  <input
                    type="text"
                    defaultValue={fontSizes[selected] ?? ""}
                    placeholder="12px, 0.8rem…"
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-foreground"
                    onBlur={(e) =>
                      savePartial({
                        fontSizes: { ...fontSizes, [selected]: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Колір тексту</label>
                  <input
                    type="text"
                    defaultValue={(customCode[`${selected}.color`] as string) ?? ""}
                    placeholder="#ffffff або rgb(...)"
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-foreground"
                    onBlur={(e) =>
                      savePartial({
                        customCode: { ...customCode, [`${selected}.color`]: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}
            {selected?.startsWith("stats.") && (
              <p>Для карток статистики поки що можна міняти лише текст по дабл‑кліку.</p>
            )}
          </>
        )}
      </section>

      {saving && (
        <p className="fixed bottom-4 right-4 text-sm text-muted bg-card border border-border px-3 py-2 rounded-xl">
          Збереження…
        </p>
      )}
    </div>
  );
}
