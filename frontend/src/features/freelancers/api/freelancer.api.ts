import api from "@/shared/apis/api";
import type { Freelancer } from "../dtos/freelancer/Freelancer";

const BASE_PATH = "/api/freelancer";

export const consultarFreelancers = async (
  nome: string,
): Promise<Freelancer[]> => {
  try {
    const { data } = await api.get<Freelancer[]>(BASE_PATH, {
      params: { nome },
    });
    return data;
  } catch {
    throw new Error("Erro ao consultar freelancers.");
  }
};

export const consultarFreelancerPorId = async (
  id: number,
): Promise<Freelancer> => {
  try {
    const { data } = await api.get<Freelancer>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar freelancer.");
  }
};
