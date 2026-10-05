import fs from "node:fs/promises";
import path from "node:path";

const pares=[
["frontend/paginas/entrada/entrada-idioma-pt-br.json","frontend/paginas/entrada/entrada-idioma-en.json"],
["frontend/paginas/painel/painel-idioma-pt-br.json","frontend/paginas/painel/painel-idioma-en.json"]
];

for(const [pt,en] of pares){
  const [a,b]=await Promise.all([fs.readFile(path.resolve(pt),"utf8"),fs.readFile(path.resolve(en),"utf8")]);
  const ka=Object.keys(JSON.parse(a)).sort();
  const kb=Object.keys(JSON.parse(b)).sort();
  if(JSON.stringify(ka)!==JSON.stringify(kb)) throw new Error(`Paridade de idioma falhou: ${pt}`);
}
console.log("Verificação concluída: idiomas em paridade.");
