import api from "@/shared/apis/api";
import type { Cliente } from "../models/Cliente";

export const consultarClientePorId = async (id: number): Promise<Cliente> => {
  try {
    const { data } = await api.get<Cliente>(`/api/cliente/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar cliente.");
  }
};
