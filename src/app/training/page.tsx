import { TrainingCard } from "@/components/training-card";

const trainings = [
  {
    title: "XC Technical Course — Holosiiv Lab",
    level: "XC" as const,
    stripeColor: "red" as const,
    description:
      "Лінії, дропаут, коріння, стрімкі спуски. Покроковий розбір технічних елементів Голосіївського трейл-парку з відеоаналізом.",
    price: "2 500 UAH",
    duration: "3 години / 1 сесія",
    badge: "tech focus",
  },
  {
    title: "Individual Road Training — FTP Protocol",
    level: "Road" as const,
    stripeColor: "white" as const,
    description:
      "Персональний план на TrainingPeaks з урахуванням FTP, HRV, календаря стартів та доступності тренувальних слотів.",
    price: "3 200 UAH",
    duration: "4 тижні",
    badge: "1:1",
  },
  {
    title: "Monthly TrainingPeaks Plan — Club Edition",
    level: "All" as const,
    stripeColor: "blue" as const,
    description:
      "Структурований місячний план для клубу: інтеграція з гаджетами, контроль навантаження, теги під різний рельєф та погоду.",
    price: "1 800 UAH",
    duration: "4 тижні",
    badge: "online",
  },
  {
    title: "Gift Voucher — Ride Faster Lab",
    level: "All" as const,
    stripeColor: "yellow" as const,
    description:
      "Подарунковий сертифікат на індивідуальне тренування або технічний курс. Персональний лендинг і QR для активації.",
    price: "від 1 500 UAH",
    duration: "гнучкий",
    badge: "voucher",
  },
];

export default function TrainingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="section-label">Training / Shop</p>
        <h1 className="section-title">
          Тренування, які збираються як лабораторний протокол.
        </h1>
        <p className="max-w-2xl text-xs text-muted leading-relaxed">
          Обирай формат: технічні сесії XC, персональні протоколи для шосе чи
          онлайн-плани в TrainingPeaks. Оплата — через Stripe / Monobank
          (плейсхолдер інтерфейсу).
        </p>
      </header>

      <section className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        {trainings.map((t) => (
          <TrainingCard key={t.title} {...t} />
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-tiny text-muted">
        <div className="section-label text-foreground/80 mb-3">
          Checkout / Integration Placeholder
        </div>
        <p>
          Тут з&apos;явиться інтеграція зі Stripe / Monobank: вибір продукту,
          валюта, конфірмація платежу та автоматична видача доступу до плану
          через TrainingPeaks / email.
        </p>
      </section>
    </div>
  );
}

