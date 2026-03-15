import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

/** Публічний API: контент сайту (без авторизації) для відображення на головній та інших сторінках */
export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}
