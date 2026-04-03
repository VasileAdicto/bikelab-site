import { NextResponse } from "next/server";

type TrainingLeadPayload = {
  title?: string;
  name?: string;
  contact?: string;
  email?: string;
  note?: string;
};

const DESTINATION_EMAIL = "annavergeles@gmail.com";

export async function POST(req: Request) {
  let payload: TrainingLeadPayload;
  try {
    payload = (await req.json()) as TrainingLeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const title = (payload.title || "").trim();
  const name = (payload.name || "").trim();
  const contact = (payload.contact || "").trim();
  const email = (payload.email || "").trim();
  const note = (payload.note || "").trim();

  if (!title || !name || (!contact && !email)) {
    return NextResponse.json(
      { error: "Missing required fields: title, name and contact or email." },
      { status: 400 },
    );
  }

  const subject = `Заявка на тренування: ${title}`;
  const text = [
    `Тренування: ${title}`,
    `Ім'я: ${name || "-"}`,
    `Контакт: ${contact || "-"}`,
    `Email: ${email || "-"}`,
    `Коментар: ${note || "-"}`,
  ].join("\n");

  const emailPayload = {
    _subject: subject,
    training: title,
    name,
    contact: contact || "-",
    email: email || "-",
    note: note || "-",
    message: text,
    _captcha: "false",
    _template: "table",
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ error: "Email send failed.", details }, { status: 502 });
    }

    return NextResponse.json({ ok: true, provider: "formsubmit-ajax" });
  } catch (err) {
    console.error("[training-lead] send error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }
}