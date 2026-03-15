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
        className={`relative inline-block shrink-0 overflow-hidden aspect-square ${
          isCompact ? "w-10 h-10 sm:w-11 sm:h-11" : "w-11 h-11 sm:w-12 sm:h-12"
        }`}
      >
        <img
          src="/logo.png"
          alt="BikeLab Kyiv logo"
          width={956}
          height={956}
          className="size-full object-contain outline-none [outline:none]"
        />
      </span>

      {!isFooter && (
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/70 hidden sm:inline border-l pl-2 sm:pl-3 border-border">
          Kyiv Bike Club
        </span>
      )}
    </Link>
  );
}
