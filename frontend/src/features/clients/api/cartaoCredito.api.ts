import type { CartaoCreditoDTO } from "@/features/clients/dtos/cartaoCredito/CartaoCreditoDTO";
import type { CriarCartaoCreditoDTO } from "@/features/clients/dtos/cartaoCredito/CriarCartaoCreditoDTO";
import api from "@/shared/apis/api";

const BASE_PATH = "/api/cartaoCredito";

export const consultarCartaoCredito = async (): Promise<CartaoCreditoDTO | null> => {
  const { data, status } = await api.get(BASE_PATH);

  if (status === 204) {
    return null;
  }

  return data;
};

export const consultarBandeiras = async () => {
  const { data } = await api.get(`${BASE_PATH}/bandeiras`);
  return data;
};

export const adicionarCartaoCredito = async (cartao: CriarCartaoCreditoDTO) => {
  const { data } = await api.post(BASE_PATH, cartao);
  return data;
};

export const atualizarCartaoCredito = async (dto: CartaoCreditoDTO) => {
  const { data } = await api.put(BASE_PATH, dto);
  return data;
};
