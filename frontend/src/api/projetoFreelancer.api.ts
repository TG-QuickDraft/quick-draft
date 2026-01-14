import type { ProjetoFreelancer } from "@/domain/models/ProjetoFreelancer";
import type { CriarProjetoFreelancerDTO } from "@/dtos/projetoFreelancer/CriarProjetoFreelancerDTO";
import { localStorageKeys } from "@/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/projetoFreelancer`;

export const consultarProjetosFreelancerPorIdFreelancer =
    async (freelancerId: number): Promise<ProjetoFreelancer[]> => {
        const resposta = await fetch(`${PATH}/freelancer/${freelancerId}`);

        if (resposta.status !== 200) {
            throw new Error("Erro ao consultar projetos do Freelancer.");
        }

        return await resposta.json();
    }

export const adicionarProjetoFreelancer = async (projeto: CriarProjetoFreelancerDTO) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: JSON.stringify(projeto),
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 201) {
    throw new Error("Erro ao adicionar serviço.");
  }

  return resposta.json();
}

export const enviarImagemProjeto = async (formData: FormData, projetoId: number) => {
  const option = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: formData,
  };

  const resposta = await fetch(`${PATH}/upload-foto/${projetoId}`, option);

  if (resposta.status !== 200) {
    throw new Error("Erro ao adicionar imagem do projeto.");
  }

  return resposta.json();
};