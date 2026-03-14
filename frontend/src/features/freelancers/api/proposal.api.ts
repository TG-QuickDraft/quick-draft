import api from "@/shared/apis/api";
import type {
  ProposalRequest,
  ProposalResponse,
} from "../dtos/freelancer/proposal-temp";

const BASE_PATH = "/api/proposta";

export const createProposal = async (
  proposal: ProposalRequest,
): Promise<ProposalResponse> => {
  const { data } = await api.post<ProposalResponse>(BASE_PATH, proposal);
  return data;
};
