import type { AuditLogDTO } from "@/features/admin/dtos/AuditLogDTO";
import type { PagedResult } from "@/shared/types/PagedResult";
import api from "@/shared/api/api";

export const consultarAuditoria = async (
  pagina: number,
  tamanhoPagina: number,
): Promise<PagedResult<AuditLogDTO>> => {
  try {
    const { data } = await api.get<PagedResult<AuditLogDTO>>("/api/audit", {
      params: { pagina, tamanhoPagina },
    });
    return data;
  } catch {
    throw new Error("Erro ao consultar logs de auditoria.");
  }
};
