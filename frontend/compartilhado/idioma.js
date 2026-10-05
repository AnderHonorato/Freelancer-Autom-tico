export async function iniciarIdioma(base){
  const salvo=localStorage.getItem("idioma")||"pt-br";
  await aplicarIdioma(salvo,base);
  document.querySelectorAll("[data-idioma]").forEach((botao)=>botao.addEventListener("click",()=>aplicarIdioma(botao.dataset.idioma,base)));
}
export async function aplicarIdioma(idioma,base){
  const resposta=await fetch(`${base}-idioma-${idioma}.json`);
  const textos=await resposta.json();
  document.querySelectorAll("[data-texto]").forEach((el)=>{const chave=el.dataset.texto;if(chave in textos)el.textContent=textos[chave]});
  localStorage.setItem("idioma",idioma);
  document.documentElement.lang=idioma==="en"?"en":"pt-BR";
}
