import type { CartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/features/finance/dtos/cartaoCredito/CriarCartaoCreditoDTO";
import api from "@/shared/api/api";

const BASE_PATH = "/api/cartaoCredito";

export const consultarCartaoCredito = async () => {
  try {
    const { data } = await api.get(BASE_PATH);
    return data;
  } catch {
    throw new Error("Erro ao consultar cartão.");
  }
};

export const consultarBandeiras = async () => {
  try {
    const { data } = await api.get(`${BASE_PATH}/bandeiras`);
    return data;
  } catch {
    throw new Error("Erro ao consultar bandeiras de cartão de crédito.");
  }
};

export const adicionarCartaoCredito = async (cartao: CriarCartaoCreditoDTO) => {
  try {
    const { data } = await api.post(BASE_PATH, cartao);
    return data;
  } catch {
    throw new Error("Erro ao adicionar cartão de crédito.");
  }
};

export const atualizarCartaoCredito = async (dto: CartaoCreditoDTO) => {
  try {
    const { data } = await api.put(BASE_PATH, dto);
    return data;
  } catch (error: any) {
    const mensagem =
      error?.response?.data?.message ?? "Erro ao atualizar cartão.";
    throw new Error(mensagem);
  }
};
