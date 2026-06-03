import type { AnaliseDTO } from "@/features/admin/dtos/AnaliseDTO";
import api from "@/shared/apis/api";

export const consultarAnalise = async (
  startDate?: string,
  endDate?: string,
): Promise<AnaliseDTO> => {
  try {
    const { data } = await api.get<AnaliseDTO>("/api/Analise", {
      params: { startDate, endDate },
    });
    return data;
  } catch {
    throw new Error("Erro ao buscar dados de análise.");
  }
};
