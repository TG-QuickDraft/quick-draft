import api from "@/shared/apis/api";

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

export const consultarTaxa = async (): Promise<number> => {
  const { data } = await api.get<{ taxa: number }>("/api/taxa");
  return data.taxa;
};