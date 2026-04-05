import api from "@/shared/apis/api";
import type {
  CriarPropostaDTO,
  PropostaDTO,
} from "../dtos/freelancer/PropostaDTO";

const BASE_PATH = "/api/proposta";

export const createProposal = async (
  proposal: CriarPropostaDTO,
): Promise<PropostaDTO> => {
  const { data } = await api.post<PropostaDTO>(BASE_PATH, proposal);
  return data;
};

export const consultarMinhasPropostas = async () => {
  try{
    const { data } = await api.get<PropostaDTO[]>(`${BASE_PATH}/minhas-propostas`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar as propostas com base no serviço")
  }
}

export const buscarPropostasPorServico = async (
  servicoId: number,
): Promise<PropostaDTO[]> => {
  try{
    const { data } = await api.get<PropostaDTO[]>(`${BASE_PATH}/servico/${servicoId}`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar as propostas com base no serviço")
  }
};

export const buscarPropostaPorId = async (
  id: number,
): Promise<PropostaDTO> => {
  try {
    const { data } = await api.get<PropostaDTO>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar a proposta");
  }
};
