import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSessionFromCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSessionFromCookie(req.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const key = (formData.get("key") as string) || "upload";
  if (!file) {
    return NextResponse.json({ error: "Файл не вибрано" }, { status: 400 });
  }
  try {
    const blob = await put(`uploads/${key}-${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return NextResponse.json({ url: blob.url, key });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Помилка завантаження" }, { status: 500 });
  }
}
