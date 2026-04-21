import type { ContaBancariaDTO } from "@/features/freelancers/dtos/contaBancaria/ContaBancariaDTO";
import type { CriarContaBancariaDTO } from "@/features/freelancers/dtos/contaBancaria/CriarContaBancariaDTO";
import api from "@/shared/apis/api";

const BASE_PATH = "/api/contaBancaria";

export const consultarContaBancaria = async () => {
  try {
    const { data } = await api.get(BASE_PATH);
    return data;
  } catch {
    throw new Error("Erro ao consultar conta.");
  }
};

export const consultarTiposConta = async () => {
  try {
    const { data } = await api.get(`${BASE_PATH}/tipoConta`);
    return data;
  } catch {
    throw new Error("Erro ao consultar tipos de conta.");
  }
};

export const adicionarContaBancaria = async (conta: CriarContaBancariaDTO) => {
  try {
    const { data } = await api.post(BASE_PATH, conta);
    return data;
  } catch {
    throw new Error("Erro ao adicionar conta.");
  }
};

export const atualizarContaBancaria = async (dto: ContaBancariaDTO) => {
  try {
    const { data } = await api.put(BASE_PATH, dto);
    return data;
  } catch (error: any) {
    const mensagem =
      error?.response?.data?.message ?? "Erro ao atualizar conta bancária.";
    throw new Error(mensagem);
  }
};
