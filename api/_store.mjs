/* Acesso ao Upstash Redis pela API REST (sem dependências).
   Aceita as variáveis criadas pela integração da Vercel (KV_*) ou pelo Upstash direto. */
const url = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const EVENTS = ["visit", "click", "brief"];
export const TOTAL_KEY = "praja:total";
export const dayKey = (date) => `praja:day:${date}`;

/* AAAA-MM-DD no horário de Brasília, o mesmo fuso usado no resto da página */
export function brDate(at = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(at);
}

export async function pipeline(commands) {
  if (!url() || !token()) throw new Error("Banco não configurado");
  const res = await fetch(`${url()}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands)
  });
  if (!res.ok) throw new Error(`Redis respondeu ${res.status}`);
  const replies = await res.json();
  const failed = replies.find((r) => r.error);
  if (failed) throw new Error(failed.error);
  return replies.map((r) => r.result);
}
