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

const STRAVA_ROUTE_LINK = "https://www.strava.com/clubs/BLABtraining";

type WeekdayBlock = {
  day: string;
  title: string;
  lines: string[];
  bullets?: string[];
  /** Текст після маркованого списку */
  afterBullets?: string[];
};

const weeklySchedule: WeekdayBlock[] = [
  {
    day: "Вівторок",
    title: "Коротке тренування в лісі",
    lines: [
      "Розвиваючі тренування на рельєфі з варіаціями навантаження.",
      "За потреби ділимося на групи за рівнем — щоб кожному було комфортно і ефективно.",
    ],
  },
  {
    day: "Середа",
    title: "Техніка (основна група)",
    lines: ["Фокус на ключових технічних навичках:"],
    bullets: ["контроль велосипеда", "проходження поворотів", "робота з рельєфом"],
    afterBullets: ["Це одне з найважливіших тренувань для прогресу в МТБ."],
  },
  {
    day: "Четвер",
    title: "Коротке тренування в лісі",
    lines: [
      "Аналог вівторка, але з інтервальними завданнями згідно з планом.",
      "Група також може ділитися за рівнем.",
    ],
  },
  {
    day: "Пʼятниця",
    title: "Техніка (друга група)",
    lines: [
      "Тренування для тих, хто хоче більше попрацювати над базою та впевненістю на велосипеді у комфортнішому темпі.",
      "Якщо учасників багато — підключаємо додаткових тренерів, щоб зберегти якість і увагу до кожного.",
    ],
  },
  {
    day: "Неділя",
    title: "Довге тренування",
    lines: ["Основний виїзд тижня:"],
    bullets: ["розвиток витривалості", "більше часу в сідлі", "спокійний темп і спілкування"],
    afterBullets: ["Часто завершується кавою або спільним відпочинком ☕"],
  },
];

const rides: Ride[] = [
  {
    id: "r1",
    title: "Відкрите тренування",
    date: "2026-05-05",
    startTime: "9:00",
    category: "MTB",
    meetingPoint: "Голосієво",
    distance: "",
    elevation: "",
    powerWkg: "",
    duration: "3+год",
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
        <p className="section-label mb-3">Найближчі події</p>
        <CalendarRidesCarousel>
          {rides.map((ride) => (
            <article
              key={ride.id}
              className="rounded-xl border border-border bg-card/80 overflow-hidden card-hover card-accent-top flex flex-col flex-shrink-0 w-[280px] sm:w-[300px]"
            >
              <div className="relative w-full aspect-video min-h-[120px] bg-steel/50 overflow-hidden">
                <img
                  src="/calendar/open-training.png"
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
                    href="https://kruty.app/events/01KN57KS5NP3XS64NX37DMVAJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-wider text-foreground/80 hover:text-accent hover:underline"
                  >
                    Деталі
                  </a>
                </div>
              </div>
            </article>
          ))}
        </CalendarRidesCarousel>
      </section>

      <section className="space-y-4" aria-labelledby="weekly-schedule-heading">
        <div className="space-y-1">
          <p className="section-label">Типовий тиждень</p>
          <h2 id="weekly-schedule-heading" className="text-sm font-semibold text-foreground md:text-base">
            Постійний розклад тренувань
          </h2>
          <p className="max-w-2xl text-[11px] text-muted leading-relaxed md:text-xs">
            Точний час і місце — у картках найближчих подій вище та в клубному чаті.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {weeklySchedule.map((block) => (
            <article
              key={block.day}
              className="rounded-xl border border-border bg-card/80 p-4 card-hover card-accent-top"
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-[13px] font-semibold leading-snug text-foreground md:text-sm">
                    <span className="text-accent">{block.day}</span>
                    <span className="text-muted"> — </span>
                    {block.title}
                  </h3>
                  <div className="space-y-1.5 text-[11px] leading-relaxed text-foreground/85 md:text-xs">
                    {block.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  {block.bullets && block.bullets.length > 0 && (
                    <ul className="list-disc space-y-0.5 pl-4 text-[11px] text-foreground/80 md:text-xs">
                      {block.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {block.afterBullets && block.afterBullets.length > 0 && (
                    <div className="space-y-1.5 text-[11px] leading-relaxed text-foreground/85 md:text-xs">
                      {block.afterBullets.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
