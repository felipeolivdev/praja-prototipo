/* Devolve os totais e os últimos 7 dias. A CDN guarda a resposta por 1 minuto
   para o painel não consultar o banco a cada visita. */
import { EVENTS, TOTAL_KEY, brDate, dayKey, pipeline } from "./_store.mjs";

function toCounts(flat) {
  const found = {};
  for (let i = 0; i + 1 < (flat || []).length; i += 2) found[flat[i]] = Number(flat[i + 1]) || 0;
  return Object.fromEntries(EVENTS.map((e) => [e, found[e] || 0]));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.statusCode = 405;
    return res.end();
  }
  const now = Date.now();
  const dates = [...Array(7)].map((_, i) => brDate(new Date(now - (6 - i) * 86400000)));
  try {
    const [total, ...days] = await pipeline([
      ["HGETALL", TOTAL_KEY],
      ...dates.map((d) => ["HGETALL", dayKey(d)])
    ]);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");   // o navegador sempre pergunta
    res.setHeader("Vercel-CDN-Cache-Control", "max-age=60, stale-while-revalidate=300");
    res.end(JSON.stringify({ total: toCounts(total), days: dates.map((date, i) => ({ date, ...toCounts(days[i]) })) }));
  } catch (err) {
    console.error("stats:", err.message);
    res.statusCode = 503;
    res.setHeader("Cache-Control", "no-store");
    res.end();
  }
}
