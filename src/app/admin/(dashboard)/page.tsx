"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

type TabId = "texts" | "images" | "sizes" | "fonts" | "sections" | "code" | "links" | "admins";

export default function AdminDashboardPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabId>("texts");

  useEffect(() => {
    fetch("/api/admin/content", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Unauthorized"))))
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  async function save(partial: Partial<SiteContent>) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(partial),
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !content) {
    return (
      <div className="p-8 text-center text-muted">
        {loading ? "Завантаження…" : "Немає доступу. Увійдіть в систему."}
      </div>
    );
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "texts", label: "Тексти" },
    { id: "links", label: "Посилання" },
    { id: "sizes", label: "Розміри кнопок/іконок" },
    { id: "fonts", label: "Розмір шрифту" },
    { id: "images", label: "Фото" },
    { id: "sections", label: "Розділи" },
    { id: "code", label: "Код / опис" },
    { id: "admins", label: "Адміни" },
  ];

  const texts = content.texts ?? {};
  const links = content.links ?? {};
  const sizes = content.sizes ?? {};
  const fontSizes = content.fontSizes ?? {};
  const images = content.images ?? {};
  const sections = content.sections ?? [];
  const customCode = content.customCode ?? {};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-2 border-b border-border pb-4 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap ${
              tab === t.id
                ? "bg-accent text-white"
                : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "texts" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Редагування текстів</h2>
          {Object.entries(texts).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm text-muted mb-1">{key}</label>
              <input
                type="text"
                defaultValue={typeof val === "string" ? val : JSON.stringify(val)}
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground"
                onBlur={(e) => {
                  const v = e.target.value;
                  try {
                    const parsed = JSON.parse(v);
                    save({ texts: { ...texts, [key]: parsed } });
                  } catch {
                    save({ texts: { ...texts, [key]: v } });
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "links" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Посилання</h2>
          {Object.entries(links).map(([key, url]) => (
            <div key={key}>
              <label className="block text-sm text-muted mb-1">{key}</label>
              <input
                type="url"
                defaultValue={url}
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground"
                onBlur={(e) => save({ links: { ...links, [key]: e.target.value } })}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-muted mb-1">Новий ключ посилання</label>
            <input
              type="text"
              placeholder="наприклад newLink"
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground mb-2"
              id="new-link-key"
            />
            <input
              type="url"
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground"
              id="new-link-url"
              onBlur={(e) => {
                const k = (document.getElementById("new-link-key") as HTMLInputElement)?.value;
                const v = e.target.value;
                if (k && v) save({ links: { ...links, [k]: v } });
              }}
            />
          </div>
        </div>
      )}

      {tab === "sizes" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Розміри кнопок та іконок</h2>
          {Object.entries(sizes).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm text-muted mb-1">{key}</label>
              <input
                type="text"
                defaultValue={val}
                placeholder="наприклад 2.5rem або 18"
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground"
                onBlur={(e) => save({ sizes: { ...sizes, [key]: e.target.value } })}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "fonts" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Розмір шрифту</h2>
          {Object.entries(fontSizes).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm text-muted mb-1">{key}</label>
              <input
                type="text"
                defaultValue={val}
                placeholder="наприклад 14px або 1.25rem"
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground"
                onBlur={(e) => save({ fontSizes: { ...fontSizes, [key]: e.target.value } })}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "images" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Завантаження фото</h2>
          <ImageUpload onUpload={(key, url) => save({ images: { ...images, [key]: url } })} />
          <div className="pt-4">
            <p className="text-sm text-muted mb-2">Збережені зображення (ключ → URL):</p>
            {Object.entries(images).map(([k, url]) => (
              <div key={k} className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-foreground">{k}</span>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent text-sm truncate max-w-[200px]">
                  {url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "sections" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Додати розділ</h2>
          <p className="text-sm text-muted">
            Розділи зберігаються як масив: id, title, content, order.
          </p>
          {sections.map((sec, i) => (
            <div key={sec.id} className="rounded-xl border border-border p-4 bg-card space-y-2">
              <input
                defaultValue={sec.title}
                className="w-full rounded border border-border px-3 py-1.5 text-foreground text-sm"
                placeholder="Заголовок"
                onBlur={(e) => {
                  const next = [...sections];
                  next[i] = { ...next[i], title: e.target.value };
                  save({ sections: next });
                }}
              />
              <textarea
                defaultValue={sec.content}
                className="w-full rounded border border-border px-3 py-1.5 text-foreground text-sm min-h-[80px]"
                placeholder="Контент"
                onBlur={(e) => {
                  const next = [...sections];
                  next[i] = { ...next[i], content: e.target.value };
                  save({ sections: next });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              save({
                sections: [
                  ...sections,
                  { id: `sec-${Date.now()}`, title: "Новий розділ", content: "", order: sections.length },
                ],
              })
            }
            className="rounded-xl border border-accent text-accent px-4 py-2 text-sm hover:bg-accent/10"
          >
            + Додати розділ
          </button>
        </div>
      )}

      {tab === "code" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Опис / код (ключ → текст або HTML)</h2>
          {Object.entries(customCode).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm text-muted mb-1">{key}</label>
              <textarea
                defaultValue={val}
                className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground font-mono text-sm min-h-[100px]"
                onBlur={(e) => save({ customCode: { ...customCode, [key]: e.target.value } })}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-muted mb-1">Новий ключ коду</label>
            <input
              type="text"
              placeholder="наприклад hero.extra"
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground mb-2"
              id="new-code-key"
            />
            <textarea
              placeholder="Текст або HTML..."
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-foreground font-mono text-sm min-h-[80px]"
              id="new-code-val"
              onBlur={(e) => {
                const k = (document.getElementById("new-code-key") as HTMLInputElement)?.value;
                const v = e.target.value;
                if (k) save({ customCode: { ...customCode, [k]: v } });
              }}
            />
          </div>
        </div>
      )}

      {tab === "admins" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Адміни</h2>
          <p className="text-sm text-muted">
            За замовчуванням: Hanna / 123456. Додаткові адміни зберігаються нижче (пароль у вигляді хешу).
          </p>
          <AddAdminForm
            onAdd={async (username, password) => {
              const { hashPassword } = await import("@/lib/auth");
              const passwordHash = await hashPassword(password);
              const admins = [...(content.admins ?? []), { username, passwordHash }];
              await save({ admins });
            }}
          />
          <ul className="text-sm text-muted">
            <li>Hanna (за замовчуванням)</li>
            {(content.admins ?? []).map((a) => (
              <li key={a.username}>{a.username}</li>
            ))}
          </ul>
        </div>
      )}

      {saving && (
        <p className="fixed bottom-4 right-4 text-sm text-muted bg-card border border-border px-3 py-2 rounded-xl">
          Збережено
        </p>
      )}
    </div>
  );
}

function ImageUpload({ onUpload }: { onUpload: (key: string, url: string) => void }) {
  const [key, setKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file || !key) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("key", key);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.key || key, data.url);
        setKey("");
        setFile(null);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Ключ (наприклад hero.image)"
        className="rounded-xl border border-border bg-card px-4 py-2 text-foreground w-48"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm text-foreground"
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!key || !file || uploading}
        className="rounded-xl bg-accent text-white px-4 py-2 text-sm disabled:opacity-50"
      >
        {uploading ? "Завантаження…" : "Завантажити"}
      </button>
    </div>
  );
}

function AddAdminForm({ onAdd }: { onAdd: (username: string, password: string) => Promise<void> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    try {
      await onAdd(username, password);
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Логін"
        className="rounded-xl border border-border bg-card px-4 py-2 text-foreground"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        className="rounded-xl border border-border bg-card px-4 py-2 text-foreground"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent text-white px-4 py-2 text-sm disabled:opacity-50"
      >
        Додати адміна
      </button>
    </form>
  );
}
