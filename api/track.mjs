/* Registra um evento anônimo: só soma 1 em totais do dia e geral.
   Não usa cookies e não guarda IP, navegador nem o texto do briefing. */
import { EVENTS, TOTAL_KEY, brDate, dayKey, pipeline } from "./_store.mjs";

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|facebookexternalhit|whatsapp|preview/i;
const KEEP_DAYS = 90;

function sameSite(req) {
  try {
    return new URL(req.headers.origin).host === (req.headers["x-forwarded-host"] || req.headers.host);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.statusCode = 405;
    return res.end();
  }
  const event = new URL(req.url, "http://local").searchParams.get("e");
  if (!EVENTS.includes(event) || !sameSite(req)) {
    res.statusCode = 400;
    return res.end();
  }
  /* prévias da Vercel e robôs não entram na conta */
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (preview || BOT.test(req.headers["user-agent"] || "")) {
    res.statusCode = 204;
    return res.end();
  }
  const key = dayKey(brDate());
  try {
    await pipeline([
      ["HINCRBY", TOTAL_KEY, event, 1],
      ["HINCRBY", key, event, 1],
      ["EXPIRE", key, KEEP_DAYS * 86400]
    ]);
    res.statusCode = 204;
  } catch (err) {
    console.error("track:", err.message);
    res.statusCode = 503;
  }
  res.end();
}
