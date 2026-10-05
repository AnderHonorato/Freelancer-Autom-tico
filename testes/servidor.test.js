import test from "node:test";
import assert from "node:assert/strict";
import { encontrarPorta } from "../servidor/nucleo/porta.js";

test("seleciona uma porta permitida",async()=>{
  const porta=await encontrarPorta(4310);
  const proibidas=[3000,3001,4200,5000,5173,5500,8000,8080,8888];
  assert.equal(proibidas.includes(porta),false);
});
