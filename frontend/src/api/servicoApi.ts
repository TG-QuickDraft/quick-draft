import type { Servico } from "../models/Servico";

const PATH = `${import.meta.env.VITE_API_URL}/api/Servico`;

export const consultarServicos = async () => {
  const resposta = await fetch(PATH);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar serviços.");
  }

  const servicos: Servico[] = await resposta.json();

  return servicos;
};

export const consultarServicoPorId = async (id: number) => {
  const resposta = await fetch(`${PATH}/${id}`);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar serviço.");
  }

  return await resposta.json();
};