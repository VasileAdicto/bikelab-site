import { CalendarRidesCarousel } from "@/components/calendar-rides-carousel";

type RideCategory = "XC" | "Road" | "Race";

type Ride = {
  id: string;
  title: string;
  date: string;
  category: RideCategory;
  meetingPoint: string;
  distance: string;
  elevation: string;
  powerWkg: string;
  duration: string;
  difficulty: number; // 1–5, для шкали зелений → червоний
};

const STRAVA_CLUB_LINK = "https://www.strava.com/clubs/BLABtraining";

const rides: Ride[] = [
  {
    id: "r1",
    title: "Group XC — Holosiiv Roots Lab (ознайомче для всіх)",
    date: "2026-03-29",
    category: "XC",
    meetingPoint: "Голосієво",
    distance: "42 км",
    elevation: "+680 м",
    powerWkg: "2,1 Вт/кг",
    duration: "~2 год 15 хв",
    difficulty: 3,
  },
];

function DifficultyBar({ value }: { value: number }) {
  const steps = 5;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: steps }, (_, i) => {
        const filled = i < value;
        const t = i / (steps - 1);
        const r = Math.round(34 + t * 221);
        const g = Math.round(197 - t * 197);
        const b = Math.round(34);
        const bg = filled ? `rgb(${r},${g},${b})` : "var(--color-border)";
        return (
          <div
            key={i}
            className="h-2 flex-1 rounded-sm transition-colors"
            style={{ backgroundColor: bg }}
          />
        );
      })}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Calendar / Club Rides</p>
        <h1 className="section-title text-accent">Розклад клубних заїздів.</h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Деталі запланованих заїздів.
        </p>
      </header>

      <section className="text-xs">
        <CalendarRidesCarousel>
          {rides.map((ride) => (
            <article
              key={ride.id}
              className="rounded-xl border border-border bg-card/80 overflow-hidden card-hover card-accent-top flex flex-col flex-shrink-0 w-[280px] sm:w-[300px]"
            >
              <div className="relative w-full aspect-video min-h-[120px] bg-steel/50 overflow-hidden">
                <img
                  src="/calendar-map.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h2 className="card-title text-[12px] leading-tight line-clamp-2">{ride.title}</h2>
                  <span className="shrink-0 rounded-full border border-border bg-steel/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-muted">
                    {ride.category === "XC" ? "XC" : ride.category === "Road" ? "Road" : "Race"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted">
                  {new Date(ride.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "short" })}
                  , 08:30 · {ride.meetingPoint}
                </p>
                <div className="grid grid-cols-3 gap-x-3 text-[11px] font-mono">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="text-muted/80">Дистанція</span>
                    <span className="text-foreground/90 whitespace-nowrap">{ride.distance}</span>
                  </div>
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="text-muted/80">Набір</span>
                    <span className="text-foreground/90 whitespace-nowrap">{ride.elevation}</span>
                  </div>
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="text-muted/80">Час</span>
                    <span className="text-foreground/90 whitespace-nowrap">{ride.duration}</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-muted pt-1">
                  <span className="text-muted/80">Вт/кг</span>{" "}
                  <span className="text-foreground/90">{ride.powerWkg}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-muted/80">Складність</span>
                  <DifficultyBar value={ride.difficulty} />
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-3">
                  <a
                    href={STRAVA_CLUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-wider text-accent hover:underline"
                  >
                    Strava Club →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </CalendarRidesCarousel>
      </section>
    </div>
  );
}
