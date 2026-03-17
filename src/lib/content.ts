import { put, get } from "@vercel/blob";

const BLOB_KEY = "site-content.json";

export type SiteContent = {
  texts?: Record<string, string>;
  links?: Record<string, string>;
  sizes?: Record<string, string>;
  fontSizes?: Record<string, string>;
  images?: Record<string, string>;
  sections?: { id: string; title: string; content: string; order: number }[];
  customCode?: Record<string, string>;
  admins?: { username: string; passwordHash: string }[];
};

const defaultContent: SiteContent = {
  texts: {
    "hero.tagline": "Лабораторія твоєї швидкості",
    "hero.title": "BIKE LIKE A BOSS",
    "hero.description":
      "Ми комбінуємо біомеханику, дані з датчиків та реальні київські рельєфи, щоб оптимізувати кожен ват та кожну секунду на колі.",
    "hero.cta1": "Записатися на тренування",
    "hero.cta2": "Розклад клубних заїздів",
    "stats.0.value": "10+",
    "stats.0.label": "років досвіду",
    "stats.1.value": "500+",
    "stats.1.label": "проведених тренувань",
    "stats.2.value": "XC & Road",
    "stats.2.label": "дисципліни",
    "logo.suffix": "Kyiv Bike Club",
  },
  links: {
    "hero.cta1.href": "/training",
    "hero.cta2.href": "/calendar",
    instagram: "https://www.instagram.com/bike_like_a_boss",
  },
  sizes: {
    "button.height": "2.5rem",
    "button.fontSize": "12px",
    "icon.size": "18",
  },
  fontSizes: {
    body: "14px",
    heading: "1.25rem",
  },
  images: {},
  sections: [],
  customCode: {},
  admins: [],
};

/** Normalize legacy texts.stats array into flat stats.0.value / stats.0.label keys */
function normalizeTexts(texts: Record<string, unknown> | undefined): Record<string, string> {
  if (!texts || typeof texts !== "object") return defaultContent.texts ?? {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(texts)) {
    if (k === "stats" && Array.isArray(v) && v.length >= 3) {
      for (let i = 0; i < 3; i++) {
        const item = v[i];
        if (item && typeof item === "object" && "value" in item && "label" in item) {
          out[`stats.${i}.value`] = String(item.value);
          out[`stats.${i}.label`] = String(item.label);
        }
      }
    } else if (typeof v === "string") {
      out[k] = v;
    }
  }
  return out;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const { BLOB_READ_WRITE_TOKEN } = process.env;
    if (!BLOB_READ_WRITE_TOKEN) return defaultContent;
    const result = await get(BLOB_KEY, { access: "public" });
    if (!result || result.statusCode !== 200 || !result.stream) return defaultContent;
    const buf = await new Response(result.stream).arrayBuffer();
    const text = new TextDecoder().decode(buf);
    const data = JSON.parse(text) as { texts?: Record<string, unknown>; [k: string]: unknown };
    const normalized = {
      ...defaultContent,
      ...data,
      texts: normalizeTexts({ ...defaultContent.texts, ...data.texts }),
    };
    return normalized as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function setContent(content: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getContent();
  const merged: SiteContent = {
    ...current,
    ...content,
    texts: { ...current.texts, ...content.texts },
    links: { ...current.links, ...content.links },
    sizes: { ...current.sizes, ...content.sizes },
    fontSizes: { ...current.fontSizes, ...content.fontSizes },
    images: { ...current.images, ...content.images },
    sections: content.sections ?? current.sections,
    customCode: { ...current.customCode, ...content.customCode },
    admins: content.admins ?? current.admins,
  };
  try {
    const { BLOB_READ_WRITE_TOKEN } = process.env;
    if (!BLOB_READ_WRITE_TOKEN) return merged;
    await put(BLOB_KEY, JSON.stringify(merged, null, 2), {
      access: "public",
    });
  } catch (e) {
    console.error("Failed to save content:", e);
  }
  return merged;
}

export { defaultContent };
