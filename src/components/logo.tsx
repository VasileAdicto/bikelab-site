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
            className="w-full h-full object-contain object-top invert outline-none [outline:none]"
          />
        </span>

        {/* Нижня половина — L.A.B. у кольорі RGB(217, 93, 57) */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <img
            src="/logo.png"
            alt=""
            width={140}
            height={52}
            className="w-full h-full object-contain object-top outline-none [outline:none]"
            style={{
              filter:
                "invert(46%) sepia(78%) saturate(600%) hue-rotate(340deg) brightness(95%) contrast(90%)",
              outline: "none",
            }}
          />
        </span>
      </span>

      {!isFooter && (
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70 hidden sm:inline border-l pl-4 border-border">
          Kyiv Bike Club
        </span>
      )}
    </Link>
  );
}
