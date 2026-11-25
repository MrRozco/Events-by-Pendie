"use server";

import { headers } from "next/headers";
import { requestSchema, type RequestResult } from "@/lib/request";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Naive per-instance rate limit. Use Upstash/Redis on multi-instance hosting.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const e = hits.get(key);
  if (!e || e.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  e.count += 1;
  return e.count > limit;
}

const FAIL = "We couldn’t send your request just now. Please call or email us directly.";

export async function submitEventRequest(input: unknown): Promise<RequestResult> {
  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }
  const d = parsed.data;
  if (d.company) return { ok: true }; // honeypot hit: pretend success

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return { ok: false, error: "Too many requests. Please try again in a few minutes." };

  const rows: Array<[string, string]> = [
    ["Event type", d.type],
    ["Date", d.date || "—"],
    ["Location", d.location || "—"],
    ["Guests", String(d.guests)],
    ["Budget", d.budget],
    ["Services", d.services.join(", ")],
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Preferred contact", d.method ?? "—"],
    ["Message", d.message || "—"],
  ];

  const { RESEND_API_KEY, REQUEST_TO_EMAIL, REQUEST_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !REQUEST_TO_EMAIL) {
    console.info("[event-request] New request (email not configured):", Object.fromEntries(rows));
    return { ok: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REQUEST_FROM_EMAIL ?? "Events by Pendie <onboarding@resend.dev>",
        to: [REQUEST_TO_EMAIL],
        reply_to: d.email,
        subject: `New ${d.type.toLowerCase()} request: ${d.name} (${d.guests} guests)`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<h2>New event request</h2><table cellpadding="6">${rows
          .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
          .join("")}</table>`,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[event-request] Resend error", res.status, await res.text());
      return { ok: false, error: FAIL };
    }
    return { ok: true };
  } catch (err) {
    console.error("[event-request] Network error", err);
    return { ok: false, error: FAIL };
  }
}
