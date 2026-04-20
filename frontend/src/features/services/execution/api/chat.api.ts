import api from "@/shared/apis/api";
import type { CriarMensagemDTO, MensagemDTO } from "@/features/services/execution/dtos/MensagemDTO";

const BASE_PATH = "/api/mensagemservico";

export const consultarMensagens = async (
  id: number,
): Promise<MensagemDTO[]> => {
  const { data } = await api.get<MensagemDTO[]>(`${BASE_PATH}/servico/${id}`);
  return data;
};

export const criarMensagem = async (
  mensagem: CriarMensagemDTO,
): Promise<MensagemDTO> => {
  const { data } = await api.post<MensagemDTO>(BASE_PATH, mensagem);
  return data;
};
