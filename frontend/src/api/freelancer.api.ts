import type { Freelancer } from "../domain/models/Freelancer";

const PATH = `${import.meta.env.VITE_API_URL}/api/Freelancer`;

export const consultarFreelancers = async (nome: string) => {
  const resposta = await fetch(`${PATH}?nome=${nome}`);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar freelancers.");
  }

  const freelancers: Freelancer[] = await resposta.json();

  return freelancers;
};

export const consultarFreelancerPorId = async (
  id: number,
): Promise<Freelancer> => {
  const resposta = await fetch(`${PATH}/${id}`);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar freelancer.");
  }

  return await resposta.json();
};
