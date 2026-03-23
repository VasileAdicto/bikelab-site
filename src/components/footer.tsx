import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/team", label: "Команда" },
  { href: "/training", label: "Тренування" },
  { href: "/calendar", label: "Календар" },
  { href: "/contacts", label: "Про нас" },
];

const social = [
  { label: "Strava", href: "https://www.strava.com/clubs/BLABtraining" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[9px]">
          <div className="flex items-center gap-3 min-w-0">
            <Logo variant="footer" className="text-[10px]" />
            <span className="text-muted shrink-0 hidden sm:inline">Kyiv Bike Club</span>
            <span className="text-muted shrink-0">Kyiv, UA</span>
          </div>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-x-3 gap-y-0">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors inline-flex items-center gap-0.5"
              >
                <Send className="h-2 w-2" />
                {s.label}
              </a>
            ))}
            <a
              href="mailto:lab@bikelab.kyiv"
              className="text-muted hover:text-accent transition-colors inline-flex items-center gap-0.5"
            >
              <Mail className="h-2 w-2 shrink-0" />
              lab@bikelab.kyiv
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <span>© {new Date().getFullYear()} BikeLab Kyiv</span>
            <span className="font-mono uppercase tracking-wider text-foreground/60">
              Lab v1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
