import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const subject = `Заявка на тренування: ${title}`;

  const html = `
    <h2 style="color:#1a1a1a;">Нова заявка на тренування</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Тренування</td><td style="padding:6px 12px;">${escapeHtml(title)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Ім'я</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Контакт</td><td style="padding:6px 12px;">${escapeHtml(contact || "-")}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Email</td><td style="padding:6px 12px;">${escapeHtml(email || "-")}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;color:#555;vertical-align:top;">Коментар</td><td style="padding:6px 12px;">${escapeHtml(note || "-").replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"BikeLab" <${gmailUser}>`,
      to: DESTINATION_EMAIL,
      replyTo: email || undefined,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[training-lead] Gmail error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
