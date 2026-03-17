import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const session = await getSessionFromCookie(cookieHeader);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <>
      <header className="border-b border-border bg-card/50 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-semibold text-foreground">
          BikeLab Адмінка
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted hover:text-accent">
            Сайт
          </Link>
          <span className="text-sm text-muted">{session.username}</span>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-sm text-muted hover:text-accent">
              Вийти
            </button>
          </form>
        </div>
      </header>
      {children}
    </>
  );
}
