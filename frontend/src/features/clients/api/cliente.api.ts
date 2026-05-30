import api from "@/shared/apis/api";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

export const consultarClientePorId = async (
  id: number,
): Promise<ClienteDTO> => {
  const { data } = await api.get<ClienteDTO>(`/api/cliente/${id}`);
  return data;
};
