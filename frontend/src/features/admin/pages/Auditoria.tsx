import { consultarAuditoria } from "@/features/admin/api/audit.api";
import Title from "@/shared/components/ui/Title";
import type { AuditLogDTO } from "@/features/admin/dtos/AuditLogDTO";
import { useEffect, useState } from "react";
import type { PagedResult } from "@/shared/types/PagedResult";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import { usePagination } from "@/shared/hooks/usePagination";

export const Auditoria = () => {
  const [auditoria, setAuditoria] = useState<PagedResult<AuditLogDTO>>();

  const {
    pagina: pagina,
    onPageChange,
  } = usePagination({ totalPaginas: auditoria?.totalPaginas });

  useEffect(() => {
    const obterDados = async () => {
      setAuditoria(await consultarAuditoria(pagina, 30));
    };

    obterDados();
  }, [pagina]);

  return (
    <div className="flex flex-col gap-10 p-8 w-full">
      <Title>Auditoria</Title>

      <table>
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Usuário
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Ação
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Entidade
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Mudanças
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Data e Hora (Horário de Brasília)
            </th>
          </tr>
        </thead>
        <tbody>
          {auditoria?.itens &&
            auditoria.itens.map((auditoria, index) => (
              <tr key={index}>
                <td>{auditoria.user}</td>
                <td>{auditoria.action}</td>
                <td>{auditoria.entityName}</td>
                {auditoria.changes && (
                  <td className="px-3 py-2 align-top">
                    {Object.entries(auditoria.changes ?? {}).map(
                      ([chave, valor]) => (
                        <div
                          key={chave}
                          className="flex justify-between gap-4"
                        >
                          <span className="font-medium">{chave}:</span>
                          <span className="text-right break-words max-w-[60%]">
                            {String(valor)}
                          </span>
                        </div>
                      ),
                    )}
                  </td>
                )}
                <td className="whitespace-nowrap">
                  {new Date(auditoria.dateTime).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    dateStyle: "short",
                    timeStyle: "medium",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <SeletorPaginas
        pagina={pagina}
        totalPaginas={auditoria?.totalPaginas || 1}
        onPaginaChange={onPageChange}
      />
    </div>
  );
};
