import api from "@/shared/apis/api";
import type { RealizarEntregaDTO } from "../dtos/entrega/RealizarEntregaDTO";
import type { EntregaDTO } from "../dtos/entrega/EntregaDTO";

const BASE_PATH = "/api/entrega";

export const consultarEntregaPorServicoId = async (
  servicoId: number,
): Promise<EntregaDTO | null> => {
  const { data, status } = await api.get<EntregaDTO>(
    `${BASE_PATH}/servico/${servicoId}`,
  );

  if (status === 204) {
    return null;
  }

  return data;
};

export const realizarEntregaServico = async (
  entrega: RealizarEntregaDTO,
): Promise<EntregaDTO> => {
  const formData = new FormData();

  formData.append("servicoId", entrega.servicoId.toString());

  if (entrega.arquivo) {
    formData.append("arquivo", entrega.arquivo);
  }

  const { data } = await api.post<EntregaDTO>(BASE_PATH, formData);
  return data;
};
