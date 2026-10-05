export function registrarRotas(aplicacao) {
  aplicacao.get("/api/sistema/status", (_req, res) => {
    res.json({
      status: "DISPONIVEL",
      modoTeste: process.env.MODO_TESTE !== "false",
      horario: new Date().toISOString()
    });
  });
}
