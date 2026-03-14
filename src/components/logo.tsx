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
      className={`inline-flex items-center gap-1 sm:gap-4 group ${className}`}
      aria-label="BIKE L.A.B. — на головну"
    >
      {/* Біло-помаранчеве лого: верх (BIKE) — білий, низ (L.A.B.) — помаранчевий */}
      <span className="relative inline-block w-[120px] sm:w-[140px] h-[44px] sm:h-[52px] shrink-0">
        {/* Верхня половина — біла */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          <img
            src="/logo.png"
            alt=""
            width={140}
            height={52}
            className="w-full h-full object-contain object-top invert"
          />
        </span>
        {/* Нижня половина — помаранчева (accent #d95d39) */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <img
            src="/logo.png"
            alt=""
            width={140}
            height={52}
            className="w-full h-full object-contain object-top"
            style={{
              filter:
                "invert(1) sepia(0.55) saturate(4.5) hue-rotate(15deg) brightness(0.9)",
            }}
          />
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