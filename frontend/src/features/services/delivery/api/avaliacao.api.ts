import api from "@/shared/apis/api";
import type { AvaliacaoDTO } from "../dtos/avaliacao/AvaliacaoDTO";
import type { CriarAvaliacaoDTO } from "../dtos/avaliacao/CriarAvaliacaoDTO";
import type { AvaliacaoPerfilDTO } from "../dtos/avaliacao/AvaliacaoPerfilDTO";

const BASE_PATH = "/api/avaliacao";

export const consultarAvaliacaoPerfil = async (
  usuarioId: number
): Promise<AvaliacaoPerfilDTO> => {
  const { data } = await api.get<AvaliacaoPerfilDTO>(
    `${BASE_PATH}/usuario/${usuarioId}`
  );
  return data;
}

export const criarAvaliacao = async (
  avaliacao: CriarAvaliacaoDTO
): Promise<AvaliacaoDTO> => {
  const { data } = await api.post<AvaliacaoDTO>(BASE_PATH, avaliacao);
  return data;
};
