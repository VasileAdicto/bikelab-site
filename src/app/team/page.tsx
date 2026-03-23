import Image from "next/image";
import { TeamCarousel } from "@/components/team-carousel";

const trainers = [
  {
    name: "Микола",
    role: "XC / Marathon",
    focus: "Технічні та групові тренування.",
    slug: "alekseev",
    image: "/team/473188228_1128213855609989_6028438532367776445_n.jpg",
  },
  {
    name: "Андрій",
    role: "XC/ Enduro",
    focus: "Головний тренер з техніки, інженер-конструктор трас",
    slug: "kukhar",
    image: "/team/andrii-kukhar.png",
  },
  {
    name: "Олена",
    role: "XC / Road",
    focus: "Тренерка новачків, координатор. Допомогає адаптуватися тим, хто тільки починає, дбає про кожного.",
    slug: "buzhovych",
    image: "/team/olena-buzhovych.png",
  },
  {
    name: "Анна",
    role: "XC / Road / Run",
    focus: "Тренерка з фізичної підготовки, онлайн планування та аналіз тренувань, підбір харчування, організація роботи клубу.",
    slug: "anna",
    image: "/team/anna-coach.png",
  },
  {
    name: "Марина",
    role: "Ride Guide",
    focus: "Гід і координаторка групових виїздів. Створює маршрути та стежить, щоб усі доїхали з посмішкою.",
    slug: "maryna",
    image: "/team/maryna-guide.png",
  },
];

const teamMembers = [
  { name: "Остап", role: "XC", slug: "member-1", image: "/team/189133724_295658525532197_1980416985193719294_n.jpg", ftp: 278, vo2max: 48 },
  { name: "Марія", role: "Road", slug: "member-2", image: "/team/194137366_300555228375860_7168418297767520888_n.jpg", ftp: 265, vo2max: 52 },
  { name: "Тарас", role: "Gravel", slug: "member-3", image: "/team/470668848_1111509297280445_7610964990174402747_n.jpg", ftp: 292, vo2max: 55 },
  { name: "Оксана", role: "Marathon", slug: "member-4", image: "/team/476835262_1148912630206778_4894564428553084030_n.jpg", ftp: 248, vo2max: 51 },
  { name: "Андрій", role: "XC", slug: "member-5", image: "/team/488572730_1391041512314082_6968043216555659026_n.jpg", ftp: 285, vo2max: 53 },
  { name: "Христина", role: "Road", slug: "member-6", image: "/team/490107972_1402585534493013_2303849373563560771_n.jpg", ftp: 256, vo2max: 49 },
  { name: "Богдан", role: "Gravel", slug: "member-7", image: "/team/490351244_1402593151158918_4836592385950887100_n.jpg", ftp: 302, vo2max: 56 },
  { name: "Софія", role: "Marathon", slug: "member-8", image: "/team/589139143_18074321729252633_7922891989151677289_n.jpg", ftp: 242, vo2max: 47 },
];

export default function TeamPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Team / Club</p>
        <h1 className="section-title text-accent">Команда тренерів BikeLab Kyiv.</h1>
        <p className="max-w-2xl text-sm text-muted leading-relaxed">
          Ми різні за характером, але єдині в підході: чітка методика і прогнозований прогрес.
        </p>
      </header>

      {/* Полоска: Тренера */}
      <div className="border-b border-border pb-2">
        <h2 className="section-label text-foreground/90 text-[13.5px]">
          Тренера
        </h2>
        <div className="mt-1 h-0.5 w-16 bg-accent/80" />
      </div>

      {/* Секція тренерів */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <article
            key={trainer.name}
            className="trainer-card rounded-2xl border border-border bg-card/80 overflow-hidden text-xs card-hover card-accent-top flex flex-row"
          >
            <div className="relative w-24 sm:w-28 shrink-0 aspect-[3/4] min-h-[120px]">
              <Image
                src={trainer.image}
                alt={`Тренер ${trainer.name}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>
            <div className="p-4 flex flex-col flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h3 className="card-title">
                  {trainer.name}
                </h3>
                <span className="shrink-0 rounded-full border border-accent/40 bg-accent-dim px-2.5 py-0.5 card-meta text-accent">
                  {trainer.role}
                </span>
              </div>
              <p className="mt-2 card-desc text-foreground/85 line-clamp-4">
                {trainer.focus}
              </p>
              <div className="mt-auto pt-3" />
            </div>
          </article>
        ))}
      </section>

      {/* Полоска: Команда (під фото тренерів) */}
      <div className="border-b border-border pb-2">
        <h2 className="section-label text-foreground/90 text-[13.5px]">
          Команда
        </h2>
        <div className="mt-1 h-0.5 w-16 bg-accent/80" />
      </div>

      {/* Секція команди: 8 карток, стрілки < > без скролбару */}
      <section>
        <TeamCarousel>
          {teamMembers.map((member) => (
            <article
              key={member.slug}
              className="rounded-xl border border-border bg-card/80 overflow-hidden text-xs card-hover card-accent-top flex-shrink-0 w-[126px] sm:w-[140px] flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="140px"
                />
              </div>
              <div className="p-2 flex flex-col flex-1 min-w-0">
                <h3 className="card-title text-[11px]">
                  {member.name}
                </h3>
                <p className="mt-0.5 card-meta text-accent text-[8px]">
                  {member.role}
                </p>
                <p className="mt-1 text-[8px] font-mono text-muted">
                  FTP <span className="text-foreground/90">{member.ftp} W</span>
                  <br />
                  VO2max <span className="text-foreground/90">{member.vo2max} ml/kg</span>
                </p>
              </div>
            </article>
          ))}
        </TeamCarousel>
      </section>
    </div>
  );
}

