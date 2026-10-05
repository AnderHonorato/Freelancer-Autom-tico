import fs from "node:fs/promises";
import path from "node:path";

const arquivo = path.resolve(".execucao","servidor.pid");
try {
  const pid = Number((await fs.readFile(arquivo,"utf8")).trim());
  process.kill(pid,"SIGTERM");
  console.log(`Servidor encerrado pelo PID ${pid}`);
} catch (erro) {
  console.error("Servidor não estava ativo ou PID inválido:",erro.message);
  process.exitCode=1;
}
