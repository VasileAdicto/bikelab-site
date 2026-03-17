"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Помилка входу");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Помилка зʼєднання");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl"
      >
        <h1 className="text-xl font-semibold text-foreground mb-6">Вхід в адмінку</h1>
        {error && (
          <p className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <label className="block mb-2 text-sm text-muted">Логін</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          required
          autoComplete="username"
        />
        <label className="block mb-2 text-sm text-muted">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-accent"
          required
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent py-2.5 font-medium text-white hover:bg-accent-bright disabled:opacity-50"
        >
          {loading ? "Вхід…" : "Увійти"}
        </button>
      </form>
    </div>
  );
}
