import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@/shared/components/ui/Button";
import Title from "@/shared/components/ui/Title";

import { PiEmptyLight } from "react-icons/pi";
import { consultarServicos } from "@/features/services/api/servico.api";
import type { Servico } from "@/features/services/dtos/Servico";

import { useSearchParams } from "react-router-dom";
import type { PagedResult } from "@/shared/types/PagedResult";
import { usePagination } from "@/shared/hooks/usePagination";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import Spinner from "@/shared/components/ui/Spinner";

export function PesquisaServico() {
  const [servicos, setServicos] = useState<PagedResult<Servico>>();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const { pagina: pagina, onPageChange } = usePagination({
    totalPaginas: servicos?.totalPaginas,
  });

  useEffect(() => {
    const nomeUrl = searchParams.get("nome") || "";

    const obterDados = async () => {
      let timer = setTimeout(() => setLoading(true), 200);
      try {
        const dados = await consultarServicos({ nome: nomeUrl }, pagina, 10);
        setServicos(dados);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    };

    obterDados();
  }, [searchParams, pagina]);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center">
      <Title className="pb-8">Minha tabela de serviços</Title>

      {servicos?.itens.length === 0 ? (
        <PiEmptyLight size={30} />
      ) : (
        <table className="w-1/2 text-center shadow-2xl">
          <thead>
            <tr className="bg-white text-black">
              <th className="p-3">Id</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Orcamento</th>
              <th className="p-3">Valor Mínimo</th>
              <th className="p-3">Prazo</th>
              <th className="p-3">Ir para Serviço</th>
            </tr>
          </thead>
          <tbody>
            {servicos?.itens.map((servico, index) => (
              <tr
                key={index}
                className="border border-gray-500 hover:bg-gray-500/5"
              >
                <td className="p-3">{servico.id}</td>
                <td className="p-3">{servico.nome}</td>
                <td className="p-3">{servico.descricao}</td>
                <td className="p-3">
                  {servico?.orcamentoIsAberto ? "Aberto" : "Fechado"}
                </td>
                <td className="p-3">{servico.valorMinimo}</td>
                <td className="p-3">{servico.prazo}</td>
                <td className="p-3">
                  <Link to={`/visualizarServico/${servico.id}`}>
                    <Button>Ver Serviço</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <SeletorPaginas
        pagina={pagina}
        totalPaginas={servicos?.totalPaginas || 1}
        onPaginaChange={onPageChange}
      />
    </div>
  );
}

export default PesquisaServico;
