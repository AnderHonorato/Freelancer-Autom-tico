import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { fileURLToPath } from "node:url";
import { encontrarPorta } from "./nucleo/porta.js";
import { registrarRotas } from "./rotas/sistema/sistema-rotas.js";

const atual = fileURLToPath(import.meta.url);
const raiz = path.resolve(path.dirname(atual), "..");
const frontend = path.join(raiz, "frontend");
const execucao = path.join(raiz, ".execucao");
const app = express();

app.disable("x-powered-by");
app.use(helmet({contentSecurityPolicy:false}));
app.use(compression());
app.use(express.json({limit:"100kb"}));
app.use("/frontend", express.static(frontend));

app.get("/", (_req,res) => res.sendFile(path.join(frontend,"paginas","entrada","entrada.html")));
app.get("/painel", (_req,res) => res.sendFile(path.join(frontend,"paginas","painel","painel.html")));
registrarRotas(app);

const porta = await encontrarPorta(process.env.PORTA || 4310);
await fs.mkdir(execucao,{recursive:true});
await fs.writeFile(path.join(execucao,"servidor.pid"),String(process.pid));
await fs.writeFile(path.join(execucao,"servidor.porta"),String(porta));

const servidor = app.listen(porta,"0.0.0.0",() => {
  console.log(`Freelancer Automático: http://127.0.0.1:${porta}`);
  console.log(`MODO_TESTE=${process.env.MODO_TESTE !== "false"}`);
});

servidor.headersTimeout=15000;
servidor.requestTimeout=30000;

function encerrar() {
  servidor.close(async() => {
    await fs.rm(path.join(execucao,"servidor.pid"),{force:true});
    process.exit(0);
  });
}
process.on("SIGINT",encerrar);
process.on("SIGTERM",encerrar);
