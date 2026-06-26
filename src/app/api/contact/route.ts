import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Missing Gmail SMTP configuration.");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

function readField(formData: FormData, key: keyof ContactPayload) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const payload: ContactPayload = {
      firstName: readField(formData, "firstName"),
      lastName: readField(formData, "lastName"),
      email: readField(formData, "email"),
      company: readField(formData, "company"),
      inquiryType: readField(formData, "inquiryType"),
      message: readField(formData, "message"),
    };

    if (Object.values(payload).some((value) => !value)) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const recipient = process.env.MAIL_TO || process.env.GMAIL_USER;

    if (!recipient) {
      throw new Error("Missing recipient address.");
    }

    const mailer = getTransporter();
    const subject = `New inquiry: ${payload.inquiryType}`;

    await mailer.sendMail({
      from: `"Teena Shanell Website" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: payload.email,
      subject,
      text: [
        `Name: ${payload.firstName} ${payload.lastName}`,
        `Email: ${payload.email}`,
        `Company or Agency: ${payload.company}`,
        `Inquiry Type: ${payload.inquiryType}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Company or Agency:</strong> ${escapeHtml(payload.company)}</p>
        <p><strong>Inquiry Type:</strong> ${escapeHtml(payload.inquiryType)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return Response.json({ error: "Unable to send your request right now." }, { status: 500 });
  }
}
