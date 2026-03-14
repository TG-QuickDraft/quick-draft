import { consultarAuditoria } from "@/features/admin/api/audit.api";
import Title from "@/shared/components/ui/Title";
import type { AuditLogDTO } from "@/features/admin/dtos/AuditLogDTO";
import { useEffect, useState } from "react";
import type { PagedResult } from "@/shared/types/PagedResult";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import { usePagination } from "@/shared/hooks/usePagination";

import ValorMudanca from "../components/ValorMudanca";

export const Auditoria = () => {
  const [auditoria, setAuditoria] = useState<PagedResult<AuditLogDTO>>();

  const { pagina: pagina, onPageChange } = usePagination({
    totalPaginas: auditoria?.totalPaginas,
  });

  useEffect(() => {
    const obterDados = async () => {
      setAuditoria(await consultarAuditoria(pagina, 30));
    };

    obterDados();
  }, [pagina]);

  return (
    <div className="flex flex-col gap-10 p-8 w-full">
      <Title>Auditoria</Title>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="border-t border-gray-100">
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
            auditoria.itens.map((item: AuditLogDTO, index: number) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-4 py-3">{item.user}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      item.action === "Added"
                        ? "bg-green-100 text-green-700"
                        : item.action === "Modified"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.action}
                  </span>
                </td>
                <td className="px-4 py-3">{item.entityName}</td>

                <td className="px-3 py-2 align-top">
                  {item.changes && (
                    <div className="flex flex-col gap-1">
                      {Object.entries(item.changes).map(([chave, valor]) => (
                        <div
                          key={chave}
                          className="flex justify-between items-center gap-4 text-sm"
                        >
                          <span className="font-semibold text-gray-700 min-w-25">
                            {chave}:
                          </span>
                          <div className="text-right wrap-break-word max-w-[70%]">
                            <ValorMudanca valor={valor} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.dateTime).toLocaleString("pt-BR", {
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
