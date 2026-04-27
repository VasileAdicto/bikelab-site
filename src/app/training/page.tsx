import { TrainingCard } from "@/components/training-card";

const PAYMENT_LINK =
  "https://bank.gov.ua/qr/QkNECjAwMgoyClVDVAoK1M7PINnl8OHg9vzq4CDM4PDo7eAg0eXw47O_4u3gClVBMDYzMDUyOTkwMDAwMDI2MDA0MDQ1MDE3NDY2ClVBSAozMDc2NzA4NzYwCgoK0e_r4PLgIOfgIO_u8evz4-gK";
const PAYMENT_QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(PAYMENT_LINK)}`;

const featuredTrainings = [
  {
    title: "Місячний план TrainingPeaks — клубна версія",
    level: "All" as const,
    stripeColor: "blue" as const,
    description:
      "Структурований місячний план, регулярний аналіз форми щотижня та гнучке коригування тренувань у процесі.",
    price: "4200 грн",
    duration: "",
    badge: "online",
  },
  {
    title: "Технічний курс XC",
    level: "XC" as const,
    stripeColor: "red" as const,
    description:
      "Лінії, дропаут, коріння, стрімкі спуски. Покроковий розбір технічних елементів.",
    price: "",
    duration: "",
    badge: "",
    ctaText: "В розробці...",
    ctaDisabled: true,
  },
];

export default function TrainingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Training / Shop</p>
        <h1 className="section-title text-accent">
          Тренування, які збираються як лабораторний протокол.
        </h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Обирай формат: технічні сесії XC, довгі групові виїзди продуманими
          маршрутами та персональні онлайн-плани в TrainingPeaks, інтервальні
          роботи під конкретні цілі, аналіз даних і підготовка до стартів.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-stretch">
        <article className="rounded-2xl border border-border bg-card/80 p-5 card-hover card-accent-top">
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <p className="text-[12px] text-muted">XC</p>
              <h2 className="text-[18px] font-semibold text-foreground leading-tight">
                Групові МТБ тренування
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px] text-left text-[12px] md:text-[13px]">
                <thead>
                  <tr className="border-b border-border/70 text-muted">
                    <th className="py-2 pr-3 font-medium">Тип тренування</th>
                    <th className="py-2 pr-3 font-medium">Разове</th>
                    <th className="py-2 font-medium">Абонемент</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-3">Техніка (1 заняття на тиждень)</td>
                    <td className="py-2 pr-3">700 грн</td>
                    <td className="py-2">2500 грн</td>
                  </tr>
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-3">Довге (1 на тижні)</td>
                    <td className="py-2 pr-3">500 грн</td>
                    <td className="py-2">1800 грн</td>
                  </tr>
                  <tr className="border-b border-border/40">
                    <td className="py-2 pr-3">Розвиваюче (2 рази на тиждень)</td>
                    <td className="py-2 pr-3">400 грн</td>
                    <td className="py-2">3000 грн</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">Безлімітний абонемент на всі тренування (1 місяць)</td>
                    <td className="py-2 pr-3">—</td>
                    <td className="py-2 text-accent font-semibold">5800 грн</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[12px] text-muted">Абонемент діє 30 днів з моменту першого тренування.</p>
              <a
                href="#training-request"
                className="inline-flex w-full justify-center rounded-xl border border-accent/40 bg-accent-dim px-3 py-2 text-[12px] font-mono uppercase tracking-[0.12em] text-accent hover:border-accent/70"
              >
                Залишити заявку
              </a>
            </div>
          </div>
        </article>

        <div id="training-right-blocks" className="grid grid-cols-1 gap-5">
          {featuredTrainings.map((t, idx) => (
            <div key={t.title} id={idx === 0 ? "training-request" : undefined} className={idx === 0 ? "scroll-mt-28" : undefined}>
              <TrainingCard {...t} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card/70 p-5 md:p-6 space-y-5 card-accent-top">
        <div className="space-y-1">
          <p className="section-label">Оплата</p>
          <h2 className="text-[16px] md:text-[18px] font-semibold text-foreground">
            Варіанти оплати за тренування Bike LAB
          </h2>
          <p className="text-[12px] md:text-[13px] text-muted">
            Зручний спосіб: реквізити, QR-оплата або перехід за посиланням зі смартфона.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-xl border border-border/80 bg-background/30 p-4 space-y-3">
            <p className="text-[13px] md:text-[14px] font-semibold text-foreground">Оплата за реквізитами</p>
            <dl className="grid gap-2 text-[12px] md:text-[13px] leading-relaxed">
              <div className="grid gap-0.5">
                <dt className="text-muted">Найменування отримувача</dt>
                <dd className="text-foreground">ФОП Щербацька Марина Сергіївна</dd>
              </div>
              <div className="grid gap-0.5">
                <dt className="text-muted">Код отримувача</dt>
                <dd className="text-foreground">3076708760</dd>
              </div>
              <div className="grid gap-0.5">
                <dt className="text-muted">IBAN</dt>
                <dd className="text-foreground break-all">UA063052990000026004045017466</dd>
              </div>
              <div className="grid gap-0.5">
                <dt className="text-muted">Назва банку</dt>
                <dd className="text-foreground">АТ КБ «ПриватБанк»</dd>
              </div>
              <div className="grid gap-0.5">
                <dt className="text-muted">Призначення платежу</dt>
                <dd className="text-foreground">Сплата за послуги ... (додайте ваше прізвище)</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/30 p-4 space-y-3">
            <p className="text-[13px] md:text-[14px] font-semibold text-foreground">Оплата через QR</p>
            <p className="text-[12px] md:text-[13px] text-foreground/85">
              Відскануйте QR код мобільним застосунком банку, з якого плануєте оплату.
            </p>
            <img
              src={PAYMENT_QR_IMAGE}
              alt="QR код для оплати тренувань Bike LAB"
              className="mx-auto h-44 w-44 rounded-lg border border-border bg-white p-1 md:h-48 md:w-48"
            />
            <p className="text-[12px] md:text-[13px] text-foreground/85">
              Перевірте призначення платежу: “Сплата за послуги ... (додайте ваше прізвище)”.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-accent/30 bg-accent-dim/40 p-4 space-y-2 text-[12px] md:text-[13px] text-foreground/90">
          <p className="font-semibold text-foreground">Альтернатива: перехід за посиланням зі смартфона</p>
          <p className="text-foreground/85">Цей спосіб працює не у всіх банківських застосунках.</p>
          <a
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-accent/40 bg-accent-dim px-3 py-1.5 text-accent hover:border-accent/70 hover:underline"
          >
            Оплатити через QR-посилання
          </a>
          <p className="text-foreground/85">
            Після переходу також перевірте призначення платежу: “Сплата за послуги ... (додайте ваше
            прізвище)”.
          </p>
        </div>
      </section>

      {/* Checkout placeholder temporarily hidden */}
    </div>
  );
}

