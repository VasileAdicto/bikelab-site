import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const res = NextResponse.redirect(`${origin}/admin/login`);
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
