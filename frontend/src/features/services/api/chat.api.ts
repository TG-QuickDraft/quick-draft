import api from "@/shared/apis/api";
import type { CriarMensagemDTO, MensagemDTO } from "../dtos/MensagemDTO";

const BASE_PATH = "/api/mensagemservico";

export const consultarMensagens = async (
  id: number,
): Promise<MensagemDTO[]> => {
  try {
    const { data } = await api.get<MensagemDTO[]>(`${BASE_PATH}/servico/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar mensagens.");
  }
};

export const criarMensagem = async (
  mensagem: CriarMensagemDTO,
): Promise<MensagemDTO> => {
  try {
    const { data } = await api.post<MensagemDTO>(BASE_PATH, mensagem);
    return data;
  } catch {
    throw new Error("Erro ao criar mensagem.");
  }
};
