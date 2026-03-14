import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SwipeNav } from "@/components/swipe-nav";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BikeLab Kyiv | BIKE L.A.B.",
  description: "Лабораторія твоєї швидкості. XC & Road Club Kyiv.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning className={ptSerif.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <SwipeNav>
            <div className="lab-grid min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-20 pt-24">
                {children}
              </main>
              <Footer />
            </div>
          </SwipeNav>
        </ThemeProvider>
      </body>
    </html>
  );
}