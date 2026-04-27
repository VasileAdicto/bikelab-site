"use client";

import { useState } from "react";
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
  const [openGroupLead, setOpenGroupLead] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupContact, setGroupContact] = useState("");
  const [groupEmail, setGroupEmail] = useState("");
  const [groupNote, setGroupNote] = useState("");
  const [groupSending, setGroupSending] = useState(false);
  const [groupStatus, setGroupStatus] = useState("");

  function submitGroupLead() {
    if (groupSending) return;
    setGroupStatus("");
    setGroupSending(true);

    if (!groupName.trim() || (!groupContact.trim() && !groupEmail.trim())) {
      setGroupStatus("Вкажіть ім'я та хоча б один контакт: телефон/Telegram або email.");
      setGroupSending(false);
      return;
    }

    const targetName = `formsubmit_group_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = targetName;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://formsubmit.co/annavergeles@gmail.com";
    form.target = targetName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      _subject: "Заявка на тренування: Групові МТБ тренування",
      _captcha: "false",
      _template: "table",
      training: "Групові МТБ тренування",
      name: groupName || "-",
      contact: groupContact || "-",
      email: groupEmail || "-",
      note: groupNote || "-",
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove();
    setTimeout(() => iframe.remove(), 10000);

    setGroupStatus("Дякуємо! Заявка надіслана.");
    setGroupName("");
    setGroupContact("");
    setGroupEmail("");
    setGroupNote("");
    setGroupSending(false);
    setOpenGroupLead(false);
  }

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

            <p className="text-[12px] text-muted">Абонемент діє 4 тижні з моменту першого тренування.</p>
            {!openGroupLead ? (
              <button
                type="button"
                onClick={() => setOpenGroupLead(true)}
                className="inline-flex w-full justify-center rounded-xl border border-accent/40 bg-accent-dim px-3 py-2 text-[12px] font-mono uppercase tracking-[0.12em] text-accent hover:border-accent/70"
              >
                Залишити заявку
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
                />
                <input
                  type="text"
                  placeholder="Телефон або Telegram"
                  value={groupContact}
                  onChange={(e) => setGroupContact(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={groupEmail}
                  onChange={(e) => setGroupEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
                />
                <textarea
                  placeholder="Коментар (необов'язково)"
                  value={groupNote}
                  onChange={(e) => setGroupNote(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-border bg-background/70 px-3 py-2 text-[13px] text-foreground outline-none focus:border-accent/60"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitGroupLead}
                    disabled={groupSending}
                    className="flex-1 rounded-lg bg-accent px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-white hover:bg-accent-bright"
                  >
                    {groupSending ? "Надсилаємо..." : "Надіслати"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenGroupLead(false)}
                    className="rounded-lg border border-border px-3 py-2 text-[12px] font-mono uppercase tracking-[0.1em] text-muted hover:text-foreground"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}
            {groupStatus && <p className="text-[11px] text-foreground/80">{groupStatus}</p>}
            <p className="pt-1 text-[11px] leading-relaxed text-muted">
              * У разі виникнення форс-мажорних обставин (погодні умови, стан здоров’я тренера, обмеження
              з боку органів влади тощо) тренування може бути скасоване. У такому випадку на ваш баланс
              нараховується сума, еквівалентна вартості цього тренування в межах абонементу. Ви можете
              використати ці кошти для оплати наступного періоду або запросити повернення.
            </p>
          </div>
        </article>

        <div id="training-right-blocks" className="grid grid-cols-1 gap-5">
          {featuredTrainings.map((t, idx) => (
            <div key={t.title} id={idx === 0 ? "training-request" : undefined} className={idx === 0 ? "scroll-mt-40" : undefined}>
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

