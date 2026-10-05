import { iniciarIdioma } from "/frontend/compartilhado/idioma.js";
await iniciarIdioma("/frontend/paginas/painel/painel");
document.querySelector("#tema").addEventListener("click",()=>{
  const novo=document.documentElement.dataset.tema==="escuro"?"claro":"escuro";
  document.documentElement.dataset.tema=novo;
  localStorage.setItem("tema",novo);
});
