"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const ABOUT_PHOTOS = [
  "/team/473188228_1128213855609989_6028438532367776445_n.jpg",
  "/team/470597147_1112117800552928_411063209783700537_n.jpg",
  "/team/476858637_1149951423436232_4905419100628643454_n.jpg",
  "/team/487239556_1385971252821108_4296054187511228807_n.jpg",
  "/team/488209288_1391041532314080_1956860062492896315_n.jpg",
  "/team/476835262_1148912630206778_4894564428553084030_n.jpg",
  "/team/490107972_1402585534493013_2303849373563560771_n.jpg",
  "/team/589139143_18074321729252633_7922891989151677289_n.jpg",
];

export function AboutPhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowUp(scrollTop > 2);
    setShowDown(scrollTop < scrollHeight - clientHeight - 2);
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

  const scroll = (dir: "up" | "down") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientHeight * 0.6;
    el.scrollBy({ top: dir === "up" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {showUp && (
        <button
          type="button"
          onClick={() => scroll("up")}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Вгору"
        >
          <span className="text-base font-medium">↑</span>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-hide w-full max-h-[520px] sm:max-h-[640px]"
      >
        <div className="flex flex-col gap-3">
          {ABOUT_PHOTOS.map((src) => (
            <div
              key={src}
              className="relative w-full aspect-[3/4] shrink-0 rounded-xl overflow-hidden border border-border/60"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 280px"
              />
            </div>
          ))}
        </div>
      </div>
      {showDown && (
        <button
          type="button"
          onClick={() => scroll("down")}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Вниз"
        >
          <span className="text-base font-medium">↓</span>
        </button>
      )}
    </div>
  );
}
