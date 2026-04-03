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

  const html = `
    <h2>Нова заявка на тренування</h2>
    <p><strong>Тренування:</strong> ${escapeHtml(title)}</p>
    <p><strong>Ім'я:</strong> ${escapeHtml(name || "-")}</p>
    <p><strong>Контакт:</strong> ${escapeHtml(contact || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(email || "-")}</p>
    <p><strong>Коментар:</strong><br/>${escapeHtml(note || "-").replace(/\n/g, "<br/>")}</p>
  `;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BikeLab Site <onboarding@resend.dev>",
        to: [DESTINATION_EMAIL],
        subject,
        text,
        html,
      }),
    });

    if (resendResponse.ok) {
      return NextResponse.json({ ok: true, provider: "resend" });
    }
  }

  const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      training: title,
      name,
      contact: contact || "-",
      email: email || "-",
      note: note || "-",
      message: text,
      _captcha: "false",
      _template: "table",
    }),
  });

  if (!fallbackResponse.ok) {
    const details = await fallbackResponse.text();
    return NextResponse.json({ error: "Email send failed.", details }, { status: 502 });
  }

  return NextResponse.json({ ok: true, provider: "formsubmit" });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
