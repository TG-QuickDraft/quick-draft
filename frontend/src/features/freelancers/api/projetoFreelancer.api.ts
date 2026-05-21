import api from "@/shared/apis/api";
import type { ProjetoFreelancerDTO } from "../dtos/projetoFreelancer/ProjetoFreelancerDTO";
import type { SalvarProjetoFreelancerDTO } from "../dtos/projetoFreelancer/SalvarProjetoFreelancerDTO";

const BASE_PATH = "/api/projetoFreelancer";

export const consultarProjetosFreelancerPorIdFreelancer = async (
  freelancerId: number,
): Promise<ProjetoFreelancerDTO[]> => {
  try {
    const { data } = await api.get<ProjetoFreelancerDTO[]>(
      `${BASE_PATH}/freelancer/${freelancerId}`,
    );
    return data;
  } catch {
    throw new Error("Erro ao consultar projetos do Freelancer.");
  }
};

export const consultarProjetoPorId = async (projetoId: number) => {
  try {
    const { data } = await api.get<ProjetoFreelancerDTO>(
      `${BASE_PATH}/${projetoId}`,
    );
    return data;
  } catch {
    throw new Error("Erro ao consultar projeto.");
  }
};

export const adicionarProjetoFreelancer = async (
  projeto: SalvarProjetoFreelancerDTO,
) => {
  try {
    const { data } = await api.post(BASE_PATH, projeto);
    return data;
  } catch {
    throw new Error("Erro ao adicionar projeto.");
  }
};

export const atualizarProjetoFreelancer = async (
  projeto: SalvarProjetoFreelancerDTO,
  projetoId: number,
) => {
  try {
    const { data } = await api.put(`${BASE_PATH}/${projetoId}`, projeto);
    return data;
  } catch {
    throw new Error("Erro ao atualizar projeto.");
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
