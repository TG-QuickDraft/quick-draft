import api from "@/shared/apis/api";
import type { TaxaDTO } from "../dtos/entrega/TaxaDTO";

const BASE_PATH = "/api/pagamento";

export interface CriarPagamentoDTO {
  servicoId: number;
}

export const realizarPagamento = async (
  dto: CriarPagamentoDTO,
): Promise<string> => {
  const { data } = await api.post<string>(BASE_PATH, dto);
  return data;
};

export const consultarTaxa = async (): Promise<TaxaDTO> => {
  const { data } = await api.get<TaxaDTO>("/api/pagamento");
  return data;
};