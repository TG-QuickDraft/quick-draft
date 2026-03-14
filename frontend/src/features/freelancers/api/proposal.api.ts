import api from "@/shared/apis/api";
import type { ProposalRequest } from "../dtos/freelancer/proposal";

const BASE_PATH = "/api/proposta";

export const createProposal = async (proposal: ProposalRequest) => {
  try {
    const { data } = await api.post(BASE_PATH, proposal);
    return data;
  } catch {
    throw new Error("Erro ao adicionar proposta.");
  }
};
