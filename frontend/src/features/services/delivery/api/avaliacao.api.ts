import api from "@/shared/apis/api";
import type { AvaliacaoDTO } from "../dtos/avaliacao/AvaliacaoDTO";
import type { CriarAvaliacaoDTO } from "../dtos/avaliacao/CriarAvaliacaoDTO";
import type { AvaliacaoPerfilDTO } from "../dtos/avaliacao/AvaliacaoPerfilDTO";

const BASE_PATH = "/api/avaliacao";

export const consultarAvaliacaoPerfil = async (
  usuarioId: number
): Promise<AvaliacaoPerfilDTO> => {
  try {
    const { data } = await api.get<AvaliacaoPerfilDTO>(
      `${BASE_PATH}/usuario/${usuarioId}`
    );
    return data;
  } catch {
    throw new Error("Erro ao consultar avaliação do perfil.");
  }
}

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
