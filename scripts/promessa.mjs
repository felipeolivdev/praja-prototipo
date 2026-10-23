#!/usr/bin/env node
/*
 * Promessa em um lugar só.
 *
 *   node scripts/promessa.mjs              propaga promessa.json para index.html, assets/og.html e README.md,
 *                                          recaptura assets/og.png e assets/preview.png e troca o ?v= das imagens
 *   node scripts/promessa.mjs --no-images  só o texto (sem navegador)
 *   node scripts/promessa.mjs --check      não escreve nada: falha (código 1) se algo divergir do promessa.json,
 *                                          se o ?v= não bater com a imagem ou se sobrar texto da promessa antiga
 *   --root <pasta>                         roda em outra cópia do projeto (útil para testes)
 *   BROWSER=<caminho>                      Chrome/Edge/Chromium usado nas capturas
 *
 * Só o que está entre marcadores é reescrito:
 *   HTML/README  <!-- promessa:nome --> ... <!-- /promessa:nome -->
 *   JS           /* promessa:js *\/ ... /* /promessa:js *\/
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const NO_IMAGES = args.includes("--no-images");
const rootArg = args.indexOf("--root");
const ROOT = rootArg >= 0 ? resolve(args[rootArg + 1]) : resolve(dirname(fileURLToPath(import.meta.url)), "..");
const P = JSON.parse(readFileSync(join(ROOT, "promessa.json"), "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");
const slogan = `${P.pergunta} ${P.assinatura}`;
const titulo = `${P.marca} — ${slogan}`;
if (P.tituloLinhas.join(" ") !== P.pergunta) fail(["promessa.json: tituloLinhas, juntas, precisam ser iguais a pergunta."]);

/* ---------- arquivos de texto (preservando CRLF/LF) ---------- */
const files = {};
function load(rel) {
  const raw = readFileSync(join(ROOT, rel), "utf8");
  files[rel] = { crlf: raw.includes("\r\n"), text: raw.replace(/\r\n/g, "\n"), changed: false };
  return files[rel];
}
function save(rel) {
  const f = files[rel];
  if (!f.changed) return;
  writeFileSync(join(ROOT, rel), f.crlf ? f.text.replace(/\n/g, "\r\n") : f.text);
}

/* ---------- imagens: versão curta para furar cache (Vercel e redes sociais) ----------
   A versão junta o promessa.json com a imagem (e, na og, com o og.html). Se a promessa mudar e a imagem
   não for recapturada (--no-images), a versão gravada deixa de bater e o --check acusa. */
const bytes = (rel) => {
  if (!existsSync(join(ROOT, rel))) return Buffer.alloc(0);
  const b = readFileSync(join(ROOT, rel));
  return /\.(json|html|md)$/.test(rel) ? Buffer.from(b.toString("utf8").replace(/\r\n/g, "\n")) : b;   // CRLF/LF não muda a versão
};
const version = (...rels) => { const h = createHash("sha1"); rels.forEach((r) => h.update(bytes(r))); return h.digest("hex").slice(0, 8); };
const ogVersion = () => version("promessa.json", "assets/og.html", "assets/og.png");
const prevVersion = () => version("promessa.json", "assets/preview.png");
function currentVersions() {   // o que já está gravado nos arquivos (usado com --no-images)
  const og = (readFileSync(join(ROOT, "index.html"), "utf8").match(/assets\/og\.png\?v=([0-9a-f]+)/) || [])[1] || "0";
  const pv = (readFileSync(join(ROOT, "README.md"), "utf8").match(/assets\/preview\.png\?v=([0-9a-f]+)/) || [])[1] || "0";
  return [og, pv];
}

function findBrowser() {
  if (process.env.BROWSER) return process.env.BROWSER;
  const list = [
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge"
  ];
  return list.find((p) => existsSync(p));
}
function capture(browser, pageRel, outRel, w, h, extra = []) {
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    `--window-size=${w},${h}`, "--virtual-time-budget=9000", ...extra,
    `--screenshot=${join(ROOT, outRel)}`, pathToFileURL(join(ROOT, pageRel)).href
  ], { stdio: "ignore" });
}

/* ---------- blocos gerados ---------- */
function blocks(ogV, prevV) {
  const [l1, l2] = P.tituloLinhas;
  const apoio = esc(P.apoio).replace("{destaque}", `<span class="hl">${esc(P.destaque)}</span>`);
  return {
    "index.html": {
      head: `
  <title>${esc(titulo)}</title>
  <meta name="description" content="${attr(P.descricao)}" />
  <meta property="og:title" content="${attr(titulo)}" />
  <meta property="og:description" content="${attr(P.ogDescricao)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${attr(P.marca)}" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:url" content="${attr(P.url)}" />
  <meta property="og:image" content="${attr(P.url)}assets/og.png?v=${ogV}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${attr(P.ogAlt)}" />
  `,
      hero: `
          <span class="oneday"><span class="dot"></span> <b>${esc(P.promessa)}.</b> ${esc(P.seloComplemento)}</span>
          <h1>
            <span class="line"><span>${esc(l1)}</span></span>
            <span class="line"><span>${esc(l2)}</span></span>
            <span class="line"><span>
              <span class="underline mark">${esc(P.assinatura)}
              </span>
            </span></span>
          </h1>
          <p class="lead">${apoio}</p>
          `,
      cta: `<h2>${esc(P.ctaPergunta)} <span class="mark">${esc(P.assinatura)}</span></h2>`,
      rodape: `<span>${esc(P.ctaPergunta)} ${esc(P.assinatura)} <svg class="ic" aria-hidden="true"><use href="#i-bolt"/></svg></span>`,
      sticky: `<span><b>${esc(P.promessa)}</b><small>${esc(P.rodapeCurto)}</small></span>`,
      js: ` const PROMESSA = ${JSON.stringify({ waAbertura: P.waAbertura, promessa: P.promessa, prazo: P.prazo })}; `
    },
    "assets/og.html": {
      chip: `<div class="chip"><i></i>${esc(P.promessa)}</div>`,
      titulo: `<h1>${esc(l1)}<br>${esc(l2)}<br><span class="mark">${esc(P.assinatura)}</span></h1>`,
      rodape: `<div class="foot"><b>»</b> ${esc(P.rodapeCurto)} &nbsp; <b>»</b> Protótipo fictício</div>`
    },
    "README.md": {
      topo: `
**${slogan}**

${P.readmeSubtitulo}
Projeto de estudo feito com HTML, CSS e JavaScript puros, em um único arquivo.

[**Ver demo ao vivo →**](${P.url})

![Prévia da página inicial da ${P.marca}](assets/preview.png?v=${prevV})
`
    }
  };
}

function markerRe(name, js) {
  return js
    ? new RegExp(`(/\\* promessa:${name} \\*/)([\\s\\S]*?)(/\\* /promessa:${name} \\*/)`)
    : new RegExp(`(<!-- promessa:${name} -->)([\\s\\S]*?)(<!-- /promessa:${name} -->)`);
}

/* ---------- execução ---------- */
const problems = [];
let browser = null;
if (!CHECK && !NO_IMAGES) {
  browser = findBrowser();
  if (!browser) problems.push("Nenhum Chrome/Edge encontrado para recapturar as imagens (use BROWSER=... ou --no-images).");
}
if (!CHECK && !browser) {
  /* sem navegador o og.html ainda recebe o texto novo; a imagem fica para depois (o --check vai lembrar) */
  const f = load("assets/og.html");
  for (const [name, body] of Object.entries(blocks("", "")["assets/og.html"])) {
    const re = markerRe(name, false);
    if (re.test(f.text)) { const next = f.text.replace(re, (_, a, __, c) => a + body + c); if (next !== f.text) { f.text = next; f.changed = true; } }
  }
}
if (!CHECK && browser) {
  /* og.html precisa do texto novo antes da captura */
  const f = load("assets/og.html");
  for (const [name, body] of Object.entries(blocks("", "")["assets/og.html"])) {
    const re = markerRe(name, false);
    if (!re.test(f.text)) { problems.push(`assets/og.html: marcador promessa:${name} não encontrado.`); continue; }
    const next = f.text.replace(re, (_, a, __, c) => a + body + c);
    if (next !== f.text) { f.text = next; f.changed = true; }
  }
  save("assets/og.html");
  delete files["assets/og.html"];
  capture(browser, "assets/og.html", "assets/og.png", 1200, 630);
}

/* preview.png sai da página já com a promessa nova: escreve o index primeiro, captura e depois acerta o ?v= */
function applyAll(ogV, prevV) {
  const all = blocks(ogV, prevV);
  for (const [rel, map] of Object.entries(all)) {
    const f = files[rel] || load(rel);
    for (const [name, body] of Object.entries(map)) {
      const re = markerRe(name, name === "js");
      const m = f.text.match(re);
      if (!m) { problems.push(`${rel}: marcador promessa:${name} não encontrado.`); continue; }
      if (m[2] !== body) {
        if (CHECK) problems.push(`${rel}: o trecho promessa:${name} não bate com o promessa.json (rode node scripts/promessa.mjs).`);
        else { f.text = f.text.replace(re, (_, a, __, c) => a + body + c); f.changed = true; }
      }
    }
  }
}

if (CHECK) {
  const [ogNow, pvNow] = currentVersions();
  if (ogNow !== ogVersion()) problems.push("assets/og.png está desatualizada em relação ao promessa.json/og.html (rode node scripts/promessa.mjs, sem --no-images).");
  if (pvNow !== prevVersion()) problems.push("assets/preview.png está desatualizada em relação ao promessa.json (rode node scripts/promessa.mjs, sem --no-images).");
  applyAll(ogNow, pvNow);
} else if (!browser) {
  applyAll(...currentVersions());   // sem navegador: o texto muda, a versão das imagens fica como está
  Object.keys(files).forEach(save);
} else {
  applyAll(...currentVersions());
  Object.keys(files).forEach(save);
  capture(browser, "index.html", "assets/preview.png", 1440, 860, ["--force-prefers-reduced-motion"]);
  for (const k of Object.keys(files)) delete files[k];
  applyAll(ogVersion(), prevVersion());
  Object.keys(files).forEach(save);
}

/* texto da promessa antiga em qualquer lugar visível */
for (const rel of ["index.html", "assets/og.html", "README.md"]) {
  const text = readFileSync(join(ROOT, rel), "utf8");
  for (const pat of P.proibidos) {
    const re = new RegExp(pat, "g");
    let m;
    while ((m = re.exec(text))) {
      const line = text.slice(0, m.index).split("\n").length;
      problems.push(`${rel}:${line}: texto da promessa antiga ("${m[0]}").`);
    }
  }
}

if (problems.length) fail(problems);
console.log(CHECK ? "promessa: tudo de acordo com o promessa.json." : "promessa: arquivos atualizados." + (browser ? " Imagens recapturadas." : ""));

function fail(list) {
  console.error("promessa: " + list.length + " problema(s):\n  - " + list.join("\n  - "));
  process.exit(1);
}
