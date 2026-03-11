"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

type Post = {
  title: string;
  category: string;
  summary: string;
  image: string;
};

export function BlogCarousel({ posts }: { posts: Post[] }) {
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
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-2">
      {showLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Попередні"
        >
          <span className="text-base font-medium">&lt;</span>
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex-1 min-w-0 overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-4 flex-nowrap pb-2">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl border border-border/20 bg-card/80 overflow-hidden card-hover border-l-4 border-l-accent/60 flex flex-col text-xs"
            >
              <div className="relative w-full aspect-[16/10] shrink-0">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              <div className="p-3 flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="card-meta text-accent/80">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="card-meta text-foreground/70">
                    {post.category}
                  </span>
                </div>
                <h2 className="mt-1.5 card-title line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-1.5 card-desc text-foreground/85 line-clamp-3">
                  {post.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {showRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-border bg-card/80 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent/50 transition-colors"
          aria-label="Наступні"
        >
          <span className="text-base font-medium">&gt;</span>
        </button>
      )}
    </div>
  );
}
