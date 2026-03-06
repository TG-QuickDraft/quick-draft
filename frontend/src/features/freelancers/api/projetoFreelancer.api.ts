import api from "@/shared/apis/api";
import type { ProjetoFreelancer } from "../dtos/projetoFreelancer/ProjetoFreelancer";
import type { CriarProjetoFreelancerDTO } from "../dtos/projetoFreelancer/CriarProjetoFreelancerDTO";

const BASE_PATH = "/api/projetoFreelancer";

export const consultarProjetosFreelancerPorIdFreelancer = async (
  freelancerId: number,
): Promise<ProjetoFreelancer[]> => {
  try {
    const { data } = await api.get<ProjetoFreelancer[]>(
      `${BASE_PATH}/freelancer/${freelancerId}`,
    );
    return data;
  } catch {
    throw new Error("Erro ao consultar projetos do Freelancer.");
  }
};

export const adicionarProjetoFreelancer = async (
  projeto: CriarProjetoFreelancerDTO,
) => {
  try {
    const { data } = await api.post(BASE_PATH, projeto);
    return data;
  } catch {
    throw new Error("Erro ao adicionar serviço.");
  }
};

export const enviarImagemProjeto = async (
  formData: FormData,
  projetoId: number,
) => {
  try {
    const { data } = await api.post(
      `${BASE_PATH}/upload-foto/${projetoId}`,
      formData,
    );
    return data;
  } catch {
    throw new Error("Erro ao adicionar imagem do projeto.");
  }
};