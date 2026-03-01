import type { AuditLogDTO } from "@/features/admin/dtos/AuditLogDTO";
import type { PagedResult } from "@/shared/types/PagedResult";
import { localStorageKeys } from "@/shared/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/audit`;

export const consultarAuditoria = async (
  pagina: number,
  tamanhoPagina: number
): Promise<PagedResult<AuditLogDTO>> => {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
  };

  const resposta = await fetch(
    `${PATH}?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}`,
    option
  );

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar logs de auditoria.");
  }

  return await resposta.json();
};