"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useEffect, type ReactNode } from "react";

const sections = ["/", "/team", "/training", "/calendar", "/contacts"];

const MIN_SWIPE_PX = 80;
const MIN_WHEEL_SUM = 100;
const WHEEL_RESET_MS = 400;
const NAV_COOLDOWN_MS = 700;

export function SwipeNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wheelSum = useRef(0);
  const cooldownUntil = useRef(0);

  const goTo = useCallback(
    (direction: "next" | "prev") => {
      if (Date.now() < cooldownUntil.current) return;
      const i = sections.indexOf(pathname);
      if (direction === "next" && i < sections.length - 1) {
        cooldownUntil.current = Date.now() + NAV_COOLDOWN_MS;
        router.push(sections[i + 1]);
      } else if (direction === "prev" && i > 0) {
        cooldownUntil.current = Date.now() + NAV_COOLDOWN_MS;
        router.push(sections[i - 1]);
      }
    },
    [pathname, router]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      if (Date.now() < cooldownUntil.current) {
        touchStart.current = null;
        return;
      }
      const x = e.changedTouches[0].clientX - touchStart.current.x;
      const y = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(x) < MIN_SWIPE_PX) return;
      if (Math.abs(x) < Math.abs(y)) return;
      if (x > 0) goTo("prev");
      else goTo("next");
    },
    [goTo]
  );

  useEffect(() => {
    let resetId: ReturnType<typeof setTimeout>;
    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaX;
      const dy = e.deltaY;
      if (Math.abs(dy) > Math.abs(dx) * 1.2) return;
      if (Math.abs(dx) < 5) return;
      clearTimeout(resetId);
      wheelSum.current += dx;
      if (Math.abs(wheelSum.current) >= MIN_WHEEL_SUM) {
        if (wheelSum.current > 0) goTo("next");
        else goTo("prev");
        wheelSum.current = 0;
      }
      resetId = setTimeout(() => {
        wheelSum.current = 0;
      }, WHEEL_RESET_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(resetId);
    };
  }, [goTo]);

  useEffect(() => {
    wheelSum.current = 0;
  }, [pathname]);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="min-h-full"
    >
      {children}
    </div>
  );
}
