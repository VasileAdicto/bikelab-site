import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { getContent, setContent, type SiteContent } from "@/lib/content";

export async function GET(req: NextRequest) {
  const session = await getSessionFromCookie(req.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromCookie(req.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<SiteContent>;
  const content = await setContent(body);
  return NextResponse.json(content);
}
