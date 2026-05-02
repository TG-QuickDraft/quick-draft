import api from "@/shared/apis/api";
import type { AvaliacaoDTO } from "../dtos/avaliacao/AvaliacaoDTO";
import type { CriarAvaliacaoDTO } from "../dtos/avaliacao/CriarAvaliacaoDTO";

const BASE_PATH = "/api/avaliacao";

export const criarAvaliacao = async (
  avaliacao: CriarAvaliacaoDTO
): Promise<AvaliacaoDTO> => {
  try {
    const { data } = await api.post<AvaliacaoDTO>(BASE_PATH, avaliacao);
    return data;
  } catch {
    throw new Error("Erro ao adicionar avaliação.");
  }
};
