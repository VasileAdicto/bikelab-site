import Image from "next/image";
import Link from "next/link";
import { TeamCarousel } from "@/components/team-carousel";

const trainers = [
  {
    name: "Alekseev",
    role: "XC / Marathon",
    focus: "Технічні трейли, довгі аплінги, робота з моментом на корені.",
    slug: "alekseev",
    image: "/team/473188228_1128213855609989_6028438532367776445_n.jpg",
  },
  {
    name: "Kukhar",
    role: "Road / Time Trial",
    focus: "Аеродинаміка, стабільний ватаж, контроль пейсингу на довгих рівнинах.",
    slug: "kukhar",
    image: "/team/470597147_1112117800552928_411063209783700537_n.jpg",
  },
  {
    name: "Buzhovych",
    role: "Gravel / All-rounder",
    focus: "Мікс шосе та ґравію, стабільність на поганому асфальті, робота в групі.",
    slug: "buzhovych",
    image: "/team/476858637_1149951423436232_4905419100628643454_n.jpg",
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
        <h1 className="section-title">Команда тренерів BikeLab Kyiv.</h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Ми поєднуємо досвід стартів, волонтерські проєкти та лабораторний
          підхід до даних. Кожен тренер — це окремий експеримент, але всі
          працюють в одній системі.
        </p>
      </header>

      {/* Полоска: Тренера */}
      <div className="border-b border-border pb-2">
        <h2 className="section-label text-foreground/90 text-[10.5px]">
          Тренера
        </h2>
        <div className="mt-1 h-0.5 w-16 bg-accent/80" />
      </div>

      {/* Секція тренерів */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <article
            key={trainer.name}
            className="rounded-2xl border border-border bg-card/80 overflow-hidden text-xs card-hover card-accent-top flex flex-row"
          >
            <div className="relative w-24 sm:w-28 shrink-0 aspect-[3/4]">
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
              <Link
                href={`/team#${trainer.slug}`}
                className="mt-auto pt-3 card-meta text-accent hover:underline inline-flex items-center gap-1"
              >
                Детальніше &rarr;
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Полоска: Команда (під фото тренерів) */}
      <div className="border-b border-border pb-2">
        <h2 className="section-label text-foreground/90 text-[10.5px]">
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

      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-tiny text-muted">
        <div className="section-label text-foreground/80 mb-3">Tour de Drone</div>
        <p className="card-desc">
          Окремий напрямок клубу: частину заїздів ми присвячуємо збору на дрони
          для ЗСУ. Це відео, стріми, івенти з партнерами та регулярна звітність
          по кожній гривні, що перетворилась на байрактач чи FPV.
        </p>
      </section>
    </div>
  );
}

