import net from "node:net";

const PROIBIDAS = new Set([3000,3001,4200,5000,5173,5500,8000,8080,8888]);

function livre(porta, host) {
  return new Promise((resolve) => {
    const servidor = net.createServer();
    servidor.once("error", () => resolve(false));
    servidor.once("listening", () => servidor.close(() => resolve(true)));
    servidor.listen(porta, host);
  });
}

export async function encontrarPorta(base = 4310) {
  for (let i = 0; i < 20; i += 1) {
    const porta = Number(base) + i;
    if (PROIBIDAS.has(porta)) continue;
    if (await livre(porta, "127.0.0.1") && await livre(porta, "::1")) return porta;
  }
  throw new Error("Nenhuma porta permitida disponível.");
}
