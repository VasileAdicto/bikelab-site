import { AboutPhotoCarousel } from "@/components/about-photo-carousel";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Про нас</p>
        <h1 className="section-title">
          BikeLab Kyiv — лабораторія швидкості
        </h1>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1fr_280px] text-xs">
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            BikeLab (BIKE L.A.B.) — це не просто велосипедний клуб, це київська
            спільнота однодумців, де пристрасть до швидкості поєднується з
            науковим підходом до тренувань. Ми базуємося в Києві та
            спеціалізуємося на підготовці атлетів у дисциплінах крос-кантрі
            (XC), маунтінбайку (MTB) та шосейному велоспорті.
          </p>

          <div>
            <h2 className="about-subtitle mb-2">
              Наша філософія: «Лабораторія швидкості»
            </h2>
            <p>
              Назва нашого клубу відображає наш підхід: ми розглядаємо кожне
              тренування як процес вдосконалення техніки та фізичних показників.
              Наша мета — виховати найтехнічніших гонщиків, тому кожне заняття
              включає вправи на володіння велосипедом, біомеханіку рухів та
              тактику проходження дистанції. Ми віримо, що секунди на трасі
              виграються не лише силою ніг, а й точністю керування.
            </p>
          </div>

          <div>
            <h2 className="about-subtitle mb-2">
              Чим ми займаємося
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-foreground/90">Групові та індивідуальні тренування:</strong>{" "}
                Проводимо регулярні виїзди в ключових локаціях Києва —
                Голосіївському лісі (МТБ), на Трухановому острові та Дорогожичах.
              </li>
              <li>
                <strong className="text-foreground/90">Технічні курси:</strong>{" "}
                Навчаємо впевненому подоланню складних трас, контрнахилів та
                технічних секцій.
              </li>
              <li>
                <strong className="text-foreground/90">Шосейна підготовка:</strong>{" "}
                Виїзди на шосе в околицях Києва для розвитку витривалості та
                швидкості.
              </li>
              <li>
                <strong className="text-foreground/90">Змагальний досвід:</strong>{" "}
                Наша команда є регулярним учасником та призером найбільших
                українських гонок — від «Львівської Сотки» до «Kyiv Fall» та
                чемпіонатів ЛКУ.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="about-subtitle mb-2">
              Ми — це люди
            </h2>
            <p>
              Як ми самі про себе кажемо: «Ми — команда дорослих дядь і тьоть,
              які люблять ганяти на великах як діти малі». Ми кличемо всіх у наш
              дивний, веселий світ і обіцяємо навчити вас всього, що вміємо самі.
              В BikeLab ви знайдете не лише тренерів, а й друзів, які підтримають
              на кожному кілометрі дистанції.
            </p>
          </div>

          <div>
            <h2 className="about-subtitle mb-2">
              Більше ніж спорт: Tour de Drone
            </h2>
            <p>
              Ми усвідомлюємо свою відповідальність перед країною, тому BikeLab
              є активним учасником проєкту Tour de Drone. Це волонтерська
              ініціатива велоспільноти, спрямована на закупівлю та виробництво
              FPV-дронів для Збройних Сил України. Частина наших зусиль та зборів
              під час гонок конвертується в реальну допомогу фронту, адже наша
              перемога — це головний фініш, до якого ми прагнемо разом.
            </p>
          </div>

          <p className="text-foreground/90 font-medium">
            Приєднуйся до BikeLab — ставай частиною найдинамічнішої команди столиці!
          </p>

          {/* Контактна інформація */}
          <div className="grid gap-4 pt-4 border-t border-border/60 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/80 p-4 card-hover">
              <div className="section-label text-white text-[17.5px]">Direct</div>
              <p className="mt-2 text-muted">
                Email: <span className="text-foreground">lab@bikelab.kyiv</span>
              </p>
              <p className="text-muted">
                Telegram:{" "}
                <span className="text-foreground">@bikelab_kyiv</span>
              </p>
              <p className="text-muted">
                Location: <span className="text-foreground">Kyiv, UA</span>
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 card-hover">
              <div className="section-label text-white text-[17.5px]">Social / Messengers</div>
              <ul className="mt-2 space-y-1 text-muted">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Strava Club — BikeLab Kyiv
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Instagram — @bikelab_kyiv
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Telegram — BikeLab LabNotes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Клубний чат для учасників
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="section-label text-white mb-3 text-[17.5px]">Фото</div>
          <AboutPhotoCarousel />
        </aside>
      </section>
    </div>
  );
}
