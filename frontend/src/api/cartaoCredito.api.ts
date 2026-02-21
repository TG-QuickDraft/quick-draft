import type { CartaoCreditoDTO } from "@/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/dtos/cartaoCredito/CriarCartaoCreditoDTO";
import { localStorageKeys } from "@/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/cartaoCredito`;

export const consultarCartaoCredito = async () => {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
        },
    }
    
    const resposta = await fetch(PATH, option);

    if (resposta.status !== 200) {
        throw new Error("Erro ao consultar cartão.");
    }

    return await resposta.json();
}

export const consultarBandeiras = async () => {
    const resposta = await fetch(`${PATH}/bandeiras`);

    if (resposta.status !== 200) {
        throw new Error("Erro ao consultar bandeiras de cartão de crédito.");
    }

    return await resposta.json();
}

export const adicionarCartaoCredito = async (cartao: CriarCartaoCreditoDTO) => {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
        },
        body: JSON.stringify(cartao),
    };

    const resposta = await fetch(PATH, option);

    if (resposta.status !== 201) {
        throw new Error("Erro ao adicionar cartão de crédito.");
    }

    return resposta.json();
}

export const atualizarCartaoCredito = async(dto: CartaoCreditoDTO) => {
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
    throw new Error("Erro ao atualizar cartão: ", (await resposta.json()));
  }
  
  return resposta.json();
}