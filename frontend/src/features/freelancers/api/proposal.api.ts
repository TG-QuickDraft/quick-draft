import api from "@/shared/apis/api";
import type {
  ProposalRequest,
  ProposalResponse,
} from "../dtos/freelancer/Proposal";

const BASE_PATH = "/api/proposta";

export const createProposal = async (
  proposal: ProposalRequest,
): Promise<ProposalResponse> => {
  const { data } = await api.post<ProposalResponse>(BASE_PATH, proposal);
  return data;
};

export const buscarPropostasPorServico = async (
  servicoId: number,
): Promise<ProposalResponse[]> => {
  try{
    const { data } = await api.get<ProposalResponse[]>(`${BASE_PATH}/servico/${servicoId}`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar as propostas com base no serviço")
  }
}

export const buscarPropostaPorId = async (
  id: number,
): Promise<ProposalResponse> => {
  try {
    const { data } = await api.get<ProposalResponse>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Não foi possível buscar a proposta");
  }
};