import { iniciarIdioma } from "/frontend/compartilhado/idioma.js";

await iniciarIdioma("/frontend/paginas/entrada/entrada");
document.querySelector("#tema").addEventListener("click",()=>{
  const novo=document.documentElement.dataset.tema==="escuro"?"claro":"escuro";
  document.documentElement.dataset.tema=novo;
  localStorage.setItem("tema",novo);
});
try{
  const resposta=await fetch("/api/sistema/status");
  const dados=await resposta.json();
  document.querySelector("#status").textContent=dados.modoTeste?"Núcleo online · modo teste":"Núcleo online";
}catch{
  document.querySelector("#status").textContent="Núcleo indisponível";
}
