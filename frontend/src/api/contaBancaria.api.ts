import type { ContaBancariaDTO } from "@/dtos/contaBancaria/ContaBancariaDTO";
import type { CriarContaBancariaDTO } from "@/dtos/contaBancaria/CriarContaBancariaDTO";
import { localStorageKeys } from "@/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/contaBancaria`;

export const consultarContaBancaria = async () => {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
        },
    }
    
    const resposta = await fetch(PATH, option);

    if (resposta.status !== 200) {
        throw new Error("Erro ao consultar conta.");
    }

    return await resposta.json();
}

export const consultarTiposConta = async () => {
    const resposta = await fetch(`${PATH}/tipoConta`);

    if (resposta.status !== 200) {
        throw new Error("Erro ao consultar tipos de conta.");
    }

    return await resposta.json();
}

export const adicionarContaBancaria = async (conta: CriarContaBancariaDTO) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
        },
        body: JSON.stringify(conta),
    };

    const resposta = await fetch(PATH, option);

    if (resposta.status !== 201) {
        throw new Error("Erro ao adicionar conta.");
    }

    return resposta.json();
}

export const atualizarContaBancaria = async(dto: ContaBancariaDTO) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: JSON.stringify(dto),
  };

  const resposta = await fetch(PATH, option);
  
  if (resposta.status !== 200) {
    throw new Error("Erro ao dto: ", (await resposta.json()));
  }
  
  return resposta.json();
}