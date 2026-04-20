import { TrainingCard } from "@/components/training-card";

const PAYMENT_LINK =
  "https://bank.gov.ua/qr/QkNECjAwMgoyClVDVAoK1M7PINnl8OHg9vzq4CDM4PDo7eAg0eXw47O_4u3gClVBMDYzMDUyOTkwMDAwMDI2MDA0MDQ1MDE3NDY2ClVBSAozMDc2NzA4NzYwCgoK0e_r4PLgIOfgIO_u8evz4-gK";
const PAYMENT_QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(PAYMENT_LINK)}`;

const trainings = [
  {
    title: "Групові МТБ тренування",
    level: "XC" as const,
    stripeColor: "white" as const,
    description:
      "2 рази на тиждень по 1.5 години + 1 технічне тренування + довгий заїзд в вихідні. Повний абонемент",
    price: "5 200 UAH",
    duration: "4 тижні",
    badge: "",
  },
  {
    title: "Місячний план TrainingPeaks — клубна версія",
    level: "All" as const,
    stripeColor: "blue" as const,
    description:
      "Структурований місячний план, регулярний аналіз форми щотижня та гнучке коригування тренувань у процесі.",
    price: "4 000 UAH",
    duration: "4 тижні",
    badge: "online",
  },
  {
    title: "Разові тренування.",
    level: "All" as const,
    stripeColor: "yellow" as const,
    description:
      "Розвиваючі тренування 1.5 год (вівторок, четвер) - 350 грн/1 тренування\nТехнічні тренування 1.5 год (середа або п'ятниця) - 700 грн/1 тренування\nДовге тренування 2-4 год. (неділя) - 500 грн",
    price: "",
    duration: "",
    badge: "",
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

      <section className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        {trainings.map((t) => (
          <TrainingCard key={t.title} {...t} />
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-card/70 p-5 space-y-4">
        <div className="space-y-1">
          <p className="section-label">Оплата</p>
          <h2 className="text-[15px] md:text-[17px] font-semibold text-foreground">
            Варіанти оплати за тренування Bike LAB
          </h2>
        </div>

        <div className="space-y-2 text-[12px] md:text-[13px] text-foreground/90 leading-relaxed">
          <p className="font-semibold text-foreground">Оплата за реквізитами</p>
          <p>
            <span className="text-muted">Найменування отримувача:</span> ФОП Щербацька Марина Сергіївна
          </p>
          <p>
            <span className="text-muted">Код отримувача:</span> 3076708760
          </p>
          <p>
            <span className="text-muted">
              Рахунок отримувача у форматі відповідно до стандарту IBAN:
            </span>{" "}
            UA063052990000026004045017466
          </p>
          <p>
            <span className="text-muted">Назва банку:</span> АТ КБ «ПриватБанк»
          </p>
          <p>
            <span className="text-muted">Призначення платежу:</span> Сплата за послуги ... (додайте ваше
            прізвище)
          </p>
        </div>

        <div className="space-y-2 text-[12px] md:text-[13px] text-foreground/90 leading-relaxed">
          <p>
            Відскануйте QR код мобільним застосунком банку, з якого збираєтесь здійснити оплату.
          </p>
          <div className="pt-1">
            <img
              src={PAYMENT_QR_IMAGE}
              alt="QR код для оплати тренувань Bike LAB"
              className="h-40 w-40 rounded-lg border border-border bg-white p-1 md:h-48 md:w-48"
            />
          </div>
          <p>
            Перевірте призначення платежу. Має бути: “Сплата за послуги ... (додайте ваше прізвище)”.
          </p>
        </div>

        <div className="space-y-2 text-[12px] md:text-[13px] text-foreground/90 leading-relaxed">
          <p>Перейдіть за посиланням зі смартфону (цей спосіб працює не у всіх).</p>
          <p>
            <span className="text-muted">Лінк на оплату:</span>{" "}
            <a
              href={PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-accent hover:underline"
            >
              bank.gov.ua/qr/...
            </a>
          </p>
          <p>
            Перевірте призначення платежу. Має бути: “Сплата за послуги ... (додайте ваше прізвище)”.
          </p>
        </div>
      </section>

      {/* Checkout placeholder temporarily hidden */}
    </div>
  );
}

