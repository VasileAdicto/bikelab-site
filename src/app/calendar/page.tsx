import { CalendarRidesCarousel } from "@/components/calendar-rides-carousel";

type RideCategory = "XC" | "Road" | "Race" | "MTB";

type Ride = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  category: RideCategory;
  meetingPoint: string;
  distance: string;
  elevation: string;
  powerWkg: string;
  duration: string;
  note?: string;
  difficulty: number; // 1–5, для шкали зелений → червоний
};

const STRAVA_ROUTE_LINK = "https://www.strava.com/routes/12888094";

const rides: Ride[] = [
  {
    id: "r1",
    title: "ознайомче для всіх членів клубу",
    date: "2026-03-29",
    startTime: "8:00",
    category: "MTB",
    meetingPoint: "Голосієво",
    distance: "",
    elevation: "",
    powerWkg: "",
    duration: "~2 год 30 хв",
    note: "Кава на фініші",
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
                  src="/calendar/holosiiv-ride.png"
                  alt="Клубне тренування в Голосієво"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h2 className="card-title text-[12px] leading-tight line-clamp-2">{ride.title}</h2>
                  <span className="shrink-0 rounded-full border border-border bg-steel/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-muted">
                    {ride.category}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted">
                  {new Date(ride.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "short" })}
                  , {ride.startTime} · {ride.meetingPoint}
                </p>
                <dl className="grid gap-y-1 text-[11px] font-mono text-muted">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-muted/80">Час</dt>
                    <dd className="text-foreground/90">{ride.duration}</dd>
                  </div>
                </dl>
                {ride.note && (
                  <p className="text-[11px] font-mono text-foreground/85">{ride.note}</p>
                )}
                <div>
                  <span className="text-[9px] uppercase text-muted/80">Складність</span>
                  <DifficultyBar value={ride.difficulty} />
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-3">
                  <a
                    href={STRAVA_ROUTE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-wider text-accent hover:underline"
                  >
                    Strava →
                  </a>
                  <a
                    href={STRAVA_ROUTE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-wider text-foreground/80 hover:text-accent hover:underline"
                  >
                    ДОКЛАДНІШЕ &gt;&gt;
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
