import { BlogCarousel } from "@/components/blog-carousel";

const posts = [
  {
    title: "Lab Report #01 — Holosiiv XC Setup",
    category: "Equipment",
    summary:
      "Тестуємо різні тиски в покришках, саг підвіски та висоту виносу для трейлів Голосієва.",
    image: "/team/473188228_1128213855609989_6028438532367776445_n.jpg",
  },
  {
    title: "Race Report — Kyiv Local Series",
    category: "Race",
    summary:
      "Як змінився пейсинг після оновлення FTP та чому останні кола поїхалися легше, ніж перші.",
    image: "/team/470597147_1112117800552928_411063209783700537_n.jpg",
  },
  {
    title: "Off-season Lab — Зал, ролики, ґрунт",
    category: "Off-season",
    summary:
      "Плануємо міжсезоння: силова, техніка, коригування посадки та робота з мобільністю.",
    image: "/team/476858637_1149951423436232_4905419100628643454_n.jpg",
  },
  {
    title: "Групова поїздка — Бориспільська траса",
    category: "Road",
    summary:
      "Звіт з спільного заїзду: темп, чергування на вітрі, економія енергії на довгій дистанції.",
    image: "/team/487239556_1385971252821108_4296054187511228807_n.jpg",
  },
  {
    title: "Відеоаналіз техніки — дропаути та коріння",
    category: "XC",
    summary:
      "Розбираємо запис з Голосієва: посадка, робота рук, вибір траєкторії на складних ділянках.",
    image: "/team/488209288_1391041532314080_1956860062492896315_n.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Blog / Lab Reports</p>
        <h1 className="section-title">
          Лабораторні звіти, а не просто пости.
        </h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Ми ділимося не лише враженнями, а й цифрами: потужність, ЧСС, каденс,
          градієнт, час відновлення. Формат — як технічний репорт.
        </p>
      </header>

      <section>
        <BlogCarousel posts={posts} />
      </section>
    </div>
  );
}

