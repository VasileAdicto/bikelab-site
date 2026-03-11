"use client";

import { useEffect, useRef } from "react";

type StravaRouteEmbedProps = {
  routeId: string;
  mapHash?: string;
  className?: string;
};

export function StravaRouteEmbed({
  routeId = "12888094",
  mapHash = "8.46/50.2891/30.5014",
  className = "",
}: StravaRouteEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.querySelector('script[src="https://strava-embeds.com/embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`strava-embed-placeholder ${className}`}
      data-embed-type="route"
      data-embed-id={routeId}
      data-units="metric"
      data-full-width="true"
      data-style="standard"
      data-map-hash={mapHash}
      data-from-embed="true"
      suppressHydrationWarning
    />
  );
}
