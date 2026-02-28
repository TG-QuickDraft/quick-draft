import type { AuditLogDTO } from "@/dtos/audit/AuditLogDTO";
import { localStorageKeys } from "@/utils/localStorageKeys";

const PATH = `${import.meta.env.VITE_API_URL}/api/audit`;

export const consultarAuditoria = async () => {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar logs de auditoria.");
  }

  const auditoriaLogs: AuditLogDTO[] = await resposta.json();

  return auditoriaLogs;
};