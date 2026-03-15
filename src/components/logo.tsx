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
        <img
          src="/logo.png"
          alt="BikeLab Kyiv logo"
          width={140}
          height={52}
          className={`h-full outline-none [outline:none] ${
            isCompact ? "w-auto min-w-full object-left" : "w-full object-contain object-center"
          }`}
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
