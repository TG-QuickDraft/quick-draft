import api from "@/shared/apis/api";
import type { CriarPropostaDTO, PropostaDTO } from "../dtos/PropostaDTO";
import type { AtualizarPropostaDTO } from "../dtos/AtualizarPropostaDTO";

const BASE_PATH = "/api/proposta";

export const criarProposta = async (
  proposal: CriarPropostaDTO,
): Promise<PropostaDTO> => {
  const { data } = await api.post<PropostaDTO>(BASE_PATH, proposal);
  return data;
};

export const atualizarProposta = async ({
  proposalBody,
  proposalId,
}: {
  proposalBody: AtualizarPropostaDTO;
  proposalId: number;
}): Promise<AtualizarPropostaDTO> => {
  const { data } = await api.put<AtualizarPropostaDTO>(
    `${BASE_PATH}/${proposalId}`,
    proposalBody,
  );
  return data;
};

export const consultarMinhasPropostas = async () => {
  try {
    const { data } = await api.get<PropostaDTO[]>(
      `${BASE_PATH}/minhas-propostas`,
    );
    return data;
  } catch {
    throw new Error("Não foi possível buscar suas propostas");
  }
};

export const buscarPropostasPorServico = async (
  servicoId: number,
): Promise<PropostaDTO[]> => {
  try {
    const { data } = await api.get<PropostaDTO[]>(
      `${BASE_PATH}/servico/${servicoId}`,
    );
    return data;
  } catch {
    throw new Error("Não foi possível buscar as propostas com base no serviço");
  }
};

export const buscarPropostaPorId = async (id: number): Promise<PropostaDTO> => {
  try {
    const { data } = await api.get<PropostaDTO>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar a proposta");
  }
};
