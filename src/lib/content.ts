import { put, get } from "@vercel/blob";

const BLOB_KEY = "site-content.json";

export type SiteContent = {
  texts?: Record<string, string | { value: string; label: string }[]>;
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

export async function getContent(): Promise<SiteContent> {
  try {
    const { BLOB_READ_WRITE_TOKEN } = process.env;
    if (!BLOB_READ_WRITE_TOKEN) return defaultContent;
    const result = await get(BLOB_KEY, { access: "public" });
    if (!result || result.statusCode !== 200 || !result.stream) return defaultContent;
    const buf = await new Response(result.stream).arrayBuffer();
    const text = new TextDecoder().decode(buf);
    const data = JSON.parse(text) as SiteContent;
    return { ...defaultContent, ...data };
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
