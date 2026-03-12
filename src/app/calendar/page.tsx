import { CalendarRidesCarousel } from "@/components/calendar-rides-carousel";
import { StravaRouteEmbed } from "@/components/strava-route-embed";

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

const STRAVA_ROUTE_LINK = "https://www.strava.com/routes/12888094";

const rides: Ride[] = [
  {
    id: "r1",
    title: "Group XC — Holosiiv Roots Lab",
    date: "2026-03-14",
    category: "XC",
    meetingPoint: "Виставковий центр",
    distance: "42 км",
    elevation: "+680 м",
    powerWkg: "2,1 Вт/кг",
    duration: "~2 год 15 хв",
    difficulty: 3,
  },
  {
    id: "r2",
    title: "Road Ride — Boryspil Highway Intervals",
    date: "2026-03-16",
    category: "Road",
    meetingPoint: "Дорогожичі",
    distance: "78 км",
    elevation: "+320 м",
    powerWkg: "2,0 Вт/кг",
    duration: "~3 год",
    difficulty: 2,
  },
  {
    id: "r3",
    title: "Race Simulation — Kyiv Ring",
    date: "2026-03-21",
    category: "Race",
    meetingPoint: "Виставковий центр",
    distance: "55 км",
    elevation: "+450 м",
    powerWkg: "2,2 Вт/кг",
    duration: "~2 год 30 хв",
    difficulty: 4,
  },
  {
    id: "r4",
    title: "Gravel Loop — Труханів острів",
    date: "2026-03-23",
    category: "Road",
    meetingPoint: "Парк Наталка",
    distance: "35 км",
    elevation: "+180 м",
    powerWkg: "1,9 Вт/кг",
    duration: "~1 год 45 хв",
    difficulty: 1,
  },
  {
    id: "r5",
    title: "Marathon Prep — довга дистанція",
    date: "2026-03-28",
    category: "XC",
    meetingPoint: "Голосіївський ліс",
    distance: "68 км",
    elevation: "+920 м",
    powerWkg: "2,0 Вт/кг",
    duration: "~4 год 20 хв",
    difficulty: 5,
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
        <h1 className="section-title">Розклад клубних заїздів.</h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Маршрути та параметри запланованих заїздів. Карта — Strava Route;
          дистанція, набір висоти, орієнтовний час і складність.
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
                <div className="absolute left-0 right-0 w-full h-[calc(100%+100px)] -top-[100px] [&_iframe]:!h-full [&_iframe]:!w-full [&_iframe]:!block">
                  <StravaRouteEmbed
                    routeId="12888094"
                    mapHash="8.46/50.2891/30.5014"
                    className="w-full h-full min-h-full block"
                  />
                </div>
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
                <dl className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] font-mono text-muted">
                  <div><dt className="text-muted/80">Дист.</dt><dd className="text-foreground/90">{ride.distance}</dd></div>
                  <div><dt className="text-muted/80">Набір</dt><dd className="text-foreground/90">{ride.elevation}</dd></div>
                  <div><dt className="text-muted/80">Вт/кг</dt><dd className="text-foreground/90">{ride.powerWkg}</dd></div>
                  <div><dt className="text-muted/80">Час</dt><dd className="text-foreground/90">{ride.duration}</dd></div>
                </dl>
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
