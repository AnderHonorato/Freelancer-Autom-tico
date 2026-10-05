import { chromium } from "playwright-core";
import path from "node:path";

const navegador = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true
});

const casos = [
  { nome: "landing-1440-real", url: "http://127.0.0.1:4310/", largura: 1440, altura: 1000 },
  { nome: "painel-390-real", url: "http://127.0.0.1:4310/painel", largura: 390, altura: 844 }
];

for (const caso of casos) {
  const pagina = await navegador.newPage({ viewport: { width: caso.largura, height: caso.altura } });
  await pagina.goto(caso.url, { waitUntil: "networkidle" });
  const larguraDocumento = await pagina.evaluate(() => document.documentElement.scrollWidth);
  if (larguraDocumento > caso.largura) {
    throw new Error(`${caso.nome}: overflow horizontal ${larguraDocumento}px > ${caso.largura}px`);
  }
  await pagina.screenshot({ path: path.resolve(".execucao", `${caso.nome}.png`), fullPage: true });
  await pagina.close();
}
await navegador.close();
console.log("Teste visual concluído: desktop 1440 e mobile 390 sem overflow horizontal.");
