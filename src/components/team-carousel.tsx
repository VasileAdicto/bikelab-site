"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";

export function TeamCarousel({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeft(scrollLeft > 2);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      {showLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Попередні"
        >
          <span className="text-sm font-medium">&lt;</span>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex-1 min-w-0 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
      >
        <div className="flex gap-4 flex-nowrap min-w-0">{children}</div>
      </div>
      {showRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Наступні"
        >
          <span className="text-sm font-medium">&gt;</span>
        </button>
      )}
    </div>
  );
}
