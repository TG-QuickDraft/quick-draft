import api from "@/shared/apis/api";
import type { FreelancerDTO } from "../dtos/freelancer/FreelancerDTO";
import type { PagedResult } from "@/shared/types/PagedResult";
import type { AtualizarFreelancerDTO } from "../dtos/freelancer/AtualizarFreelancerDTO";

const BASE_PATH = "/api/freelancer";

export const consultarFreelancers = async (
  nome: string,
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<FreelancerDTO>> => {
  try {
    const { data } = await api.get<PagedResult<FreelancerDTO>>(BASE_PATH, {
      params: { nome, pagina, tamanhoPagina },
    });
    return data;
  } catch {
    throw new Error("Erro ao consultar freelancers.");
  }
};

export const consultarFreelancerPorId = async (
  id: number,
): Promise<FreelancerDTO> => {
  try {
    const { data } = await api.get<FreelancerDTO>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar freelancer.");
  }
};

export const atualizarFreelancer = async (request: AtualizarFreelancerDTO) => {
  try {
    const { data } = await api.put(BASE_PATH, request);
    return data;
  } catch {
    throw new Error("Erro ao atualizar freelancer.");
  }
};
