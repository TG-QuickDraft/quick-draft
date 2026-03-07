import type { CriarServicoDTO } from "@/features/services/dtos/CriarServicoDTO";
import type { FiltroServicoDTO } from "@/features/services/dtos/FiltroServicoDTO";
import api from "@/shared/apis/api";
import type { Servico } from "../dtos/Servico";
import type { PagedResult } from "@/shared/types/PagedResult";

const BASE_PATH = "/api/servico";

export const consultarServicos = async (
  filtro: FiltroServicoDTO,
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<Servico>> => {
  try {
    const { data } = await api.get<PagedResult<Servico>>(BASE_PATH, {
      params: {
        nome: filtro?.nome ?? "",
        pagina,
        tamanhoPagina,
      },
    });
    return data;
} catch {
    throw new Error("Erro ao consultar serviços.");
  }
};

export const consultarServicoPorId = async (id: number): Promise<Servico> => {
  try {
    const { data } = await api.get<Servico>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar serviço.");
  }
};

export const adicionarServico = async (
  servico: CriarServicoDTO,
): Promise<Servico> => {
  try {
    const { data } = await api.post<Servico>(BASE_PATH, servico);
    return data;
  } catch {
    throw new Error("Erro ao adicionar serviço.");
  }
};
