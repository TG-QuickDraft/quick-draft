import type { CriarServicoDTO } from "@/dtos/CriarServicoDTO";
import type { Servico } from "../domain/models/Servico";
import { localStorageKeys } from "@/utils/localStorageKeys";

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

export const adicionarServico = async (servico: CriarServicoDTO) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: JSON.stringify(servico),
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 201) {
    throw new Error("Erro ao adicionar serviço.");
  }

  return resposta.json();
}