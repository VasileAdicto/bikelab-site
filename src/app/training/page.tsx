import { TrainingCard } from "@/components/training-card";

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

      {/* Checkout placeholder temporarily hidden */}
    </div>
  );
}

