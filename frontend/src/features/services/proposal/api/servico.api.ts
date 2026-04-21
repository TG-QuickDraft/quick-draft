import type { CriarServicoDTO } from "@/features/services/proposal/dtos/CriarServicoDTO";
import type { FiltroServicoDTO } from "@/features/services/proposal/dtos/FiltroServicoDTO";
import api from "@/shared/apis/api";
import type { ServicoDTO } from "../../proposal/dtos/ServicoDTO";
import type { PagedResult } from "@/shared/types/PagedResult";

const BASE_PATH = "/api/servico";

export const consultarServicos = async (
  filtro: FiltroServicoDTO,
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<ServicoDTO>> => {
  try {
    const { data } = await api.get<PagedResult<ServicoDTO>>(BASE_PATH, {
      params: {
        ...filtro,
        pagina,
        tamanhoPagina,
      },
    });
    return data;
  } catch {
    throw new Error("Erro ao consultar serviços.");
  }
};

export const consultarServicoPorId = async (
  id: number,
): Promise<ServicoDTO> => {
  try {
    const { data } = await api.get<ServicoDTO>(`${BASE_PATH}/${id}`);
    return data;
  } catch {
    throw new Error("Erro ao consultar serviço.");
  }
};

export const adicionarServico = async (
  servico: CriarServicoDTO,
): Promise<ServicoDTO> => {
  try {
    const { data } = await api.post<ServicoDTO>(BASE_PATH, servico);
    return data;
  } catch {
    throw new Error("Erro ao adicionar serviço.");
  }
};

export const consultarMeusServicos = async (
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<ServicoDTO>> => {
  try {
    const { data } = await api.get<PagedResult<ServicoDTO>>(
      `${BASE_PATH}/meus-servicos`,
      {
        params: {
          pagina,
          tamanhoPagina,
        },
      },
    );
    return data;
  } catch {
    throw new Error("Erro ao consultar seus serviços.");
  }
};

export const consultarServicosPorClienteId = async (
  clienteId: number,
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<ServicoDTO>> => {
  try {
    const { data } = await api.get<PagedResult<ServicoDTO>>(
      `${BASE_PATH}/cliente/${clienteId}`,
      {
        params: {
          pagina,
          tamanhoPagina,
        },
      },
    );

    return data;
  } catch {
    throw new Error("Erro ao consultar serviços do cliente.");
  }
};

export const aceitarProposta = async (
  servicoId: number,
  propostaId: number,
) => {
  try {
    const { data } = await api.post(
      `${BASE_PATH}/${servicoId}/aceitar-proposta/${propostaId}`,
    );
    return data;
  } catch {
    throw new Error("Erro ao aceitar proposta");
  }
};
