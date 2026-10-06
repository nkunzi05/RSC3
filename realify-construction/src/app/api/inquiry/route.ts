import { NextResponse } from "next/server";
import { Resend } from "resend";

type Inquiry = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot
  attachment?: { url: string; name: string; size: number } | null;
};

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let data: Inquiry;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (data.company) return NextResponse.json({ ok: true }); // bot
  if (!data.name || !data.email || !data.projectType || !data.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO_EMAIL;
  if (!to || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }
  const from = process.env.INQUIRY_FROM_EMAIL || "Realify Website <onboarding@resend.dev>";

  // Only accept attachment links that point at our own Blob store.
  const att = data.attachment && /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(data.attachment.url)
    ? data.attachment
    : null;

  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Project type", data.projectType],
    ["Budget", data.budget],
  ];

  const html = `
    <h2 style="font-family:Georgia,serif">New quote request</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td>${esc(v || "—")}</td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>
    ${att ? `<p style="font-family:Arial,sans-serif;font-size:14px">Attachment: <a href="${att.url}">${esc(att.name)}</a> (${(att.size / 1024 / 1024).toFixed(1)} MB)</p>` : ""}
  `;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Quote request: ${data.projectType} from ${data.name}`,
    html,
    attachments: att ? [{ path: att.url, filename: att.name }] : undefined,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}
