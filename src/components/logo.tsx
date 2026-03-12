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
      <span
        className="font-extrabold leading-[0.85] text-foreground select-none uppercase tracking-tighter inline-flex flex-col items-stretch"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <span className="block text-2xl sm:text-3xl text-center tracking-[-0.05em]">
          BIKE
        </span>
        <span className="mt-0.5 flex justify-center text-[0.72em] sm:text-[0.8em] text-accent tracking-[0.22em]">
          <span className="inline-block px-0.5">L.A.B.</span>
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