import { NextRequest, NextResponse } from "next/server";
import { createSession, getSessionFromCookie, verifyPassword } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { COOKIE_NAME } from "@/lib/auth";

const DEFAULT_ADMIN_USER = "Hanna";
const DEFAULT_ADMIN_PASS = "123456";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json({ error: "Логін і пароль обовʼязкові" }, { status: 400 });
    }

    const content = await getContent();
    const admins = content.admins ?? [];
    let valid = false;

    if (username === DEFAULT_ADMIN_USER && password === DEFAULT_ADMIN_PASS) {
      valid = true;
    }
    for (const a of admins) {
      if (a.username === username && (await verifyPassword(password, a.passwordHash))) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      return NextResponse.json({ error: "Невірний логін або пароль" }, { status: 401 });
    }

    const token = await createSession(username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getSessionFromCookie(req.headers.get("cookie"));
  if (!session) return NextResponse.json({ authenticated: false });
  return NextResponse.json({ authenticated: true, username: session.username });
}
