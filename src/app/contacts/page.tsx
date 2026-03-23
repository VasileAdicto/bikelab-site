import { AboutPhotoCarousel } from "@/components/about-photo-carousel";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Про нас</p>
        <h1 className="section-title text-accent">
          BikeLab Kyiv — лабораторія швидкості
        </h1>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1fr_280px] text-xs">
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            BikeLab — це не просто велоклуб. Це ком&apos;юніті людей, які хочуть їздити
            краще: технічніше, впевненіше і з розумінням процесу.
          </p>
          <p>
            Ми поєднуємо задоволення від катання з системним підходом: дані, методика і стабільний прогрес.
          </p>

          <div>
            <h2 className="about-subtitle mb-2">
              Наш підхід
            </h2>
            <p>
              Кожне тренування — як лабораторний протокол: чітка логіка, контроль навантаження і розвиток навичок.
              Ми працюємо над технікою, керуванням велосипеда і ефективністю руху — бо контроль вирішує.
            </p>
          </div>

          <div>
            <h2 className="about-subtitle mb-2">
              Що тут відбувається
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>технічні сесії і робота над навичками. від початківця до ПРО.</li>
              <li>групові виїзди та структуровані тренування</li>
              <li>підготовка до стартів і впевненість на дистанції</li>
            </ul>
          </div>

          <div>
            <h2 className="about-subtitle mb-2">
              Хто ми
            </h2>
            <p>
              Команда людей, які тренуються усвідомлено і підтримують одне одного.
              Тут є і тренери, і середовище, в якому хочеться рости.
            </p>
          </div>

          <p className="text-foreground/90 font-medium">
            Приєднуйся. Відчуй контроль. І кайфуй від процесу. 🚀
          </p>

          {/* Контактна інформація */}
          <div className="grid gap-4 pt-4 border-t border-border/60 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/80 p-4 card-hover">
              <div className="section-label text-white text-[17.5px]">Direct</div>
              <p className="mt-2 text-muted">
                <span className="text-foreground/90">Email:</span>{" "}
                <a
                  href="mailto:annavergeles@gmail.com"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  annavergeles@gmail.com
                </a>
              </p>
              <p className="text-muted">
                <span className="text-foreground/90">Telegram:</span>{" "}
                <a
                  href="https://t.me/+Qpv1jxyUFuGXz3jS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  Bike L.A.B. Chat
                </a>
              </p>
              <p className="text-muted">
                <span className="text-foreground/90">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/34688732996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  +34688732996
                </a>
              </p>
              <p className="text-muted">
                <span className="text-foreground/90">Location:</span>{" "}
                <span className="text-foreground">Kyiv, UA</span>
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-4 card-hover">
              <div className="section-label text-white text-[17.5px]">Social / Messengers</div>
              <ul className="mt-2 space-y-1 text-muted">
                <li>
                  <a
                    href="https://www.strava.com/clubs/BLABtraining"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Strava Club — BIKE L.A.B.
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bike_like_a_boss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Instagram — @bike_like_a_boss
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/+Qpv1jxyUFuGXz3jS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Клубний чат для учасників (Telegram)
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
