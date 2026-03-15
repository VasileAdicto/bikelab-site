import Link from "next/link";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
  /** У хедері — обрізати до літер (вужчий вигляд при лівому краї) */
  cropToLetters?: boolean;
};

export function Logo({ variant = "header", className = "", cropToLetters = false }: LogoProps) {
  const isFooter = variant === "footer";
  const isCompact = variant === "header" && cropToLetters;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-0.5 sm:gap-1.5 group ${className}`}
      aria-label="BIKE L.A.B. — на головну"
    >
      <span
        className={`relative inline-block shrink-0 overflow-hidden ${
          isCompact ? "w-[72px] sm:w-[88px] h-[44px] sm:h-[52px]" : "w-[120px] sm:w-[140px] h-[44px] sm:h-[52px]"
        }`}
      >
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
            className={`h-full object-top invert outline-none [outline:none] ${
              isCompact ? "w-auto min-w-full" : "w-full object-contain"
            }`}
            style={isCompact ? { objectPosition: "right center", objectFit: "cover" } : undefined}
          />
        </span>

        {/* Нижня половина — L.A.B. у кольорі акценту RGB(255, 48, 0) */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <img
            src="/logo.png"
            alt=""
            width={140}
            height={52}
            className={`h-full object-top outline-none [outline:none] ${
              isCompact ? "w-auto min-w-full" : "w-full object-contain"
            }`}
            style={{
              filter:
                "invert(46%) sepia(78%) saturate(600%) hue-rotate(340deg) brightness(95%) contrast(90%)",
              outline: "none",
              ...(isCompact ? { objectPosition: "right center", objectFit: "cover" } : {}),
            }}
          />
        </span>
      </span>

      {!isFooter && (
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70 hidden sm:inline border-l pl-2 sm:pl-3 border-border">
          Kyiv Bike Club
        </span>
      )}
    </Link>
  );
}
