import Link from "next/link";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

export function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className={`inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 group ${className}`}
      aria-label="BIKE L.A.B. — на головну"
    >
      {/* Контейнер для тексту логотипа */}
      <span
        className="font-extrabold leading-[0.85] text-foreground select-none uppercase tracking-tighter inline-flex flex-col"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", minWidth: "fit-content" }}
      >
        {/* Верхнє слово */}
        <span className="block text-2xl sm:text-3xl">
          BIKE
        </span>
        
        {/* Нижнє слово, розтягнуте по всій ширині */}
        <span className="flex justify-between text-[0.8em] text-accent mt-0.5">
          <span>L.</span>
          <span>A.</span>
          <span>B.</span>
        </span>
      </span>

      {!isFooter && (
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70 hidden sm:inline border-l pl-4 border-border">
          Bike Like A Boss · Kyiv
        </span>
      )}
    </Link>
  );
}