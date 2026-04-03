import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@/shared/components/ui/buttons/Button";

import { consultarServicos } from "@/features/services/api/servico.api";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import { PiEmptyLight } from "react-icons/pi";

import Input from "@/shared/components/ui/Inputs/Input";

import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import Spinner from "@/shared/components/ui/Spinner";
import { usePagination } from "@/shared/hooks/usePagination";
import type { PagedResult } from "@/shared/types/PagedResult";
import { useSearchParams } from "react-router-dom";
import { servicoPaths } from "@/features/services/routes/servicoPaths";

export function PesquisaServico() {
  const [servicos, setServicos] = useState<PagedResult<ServicoDTO>>();

  const [nome, setNome] = useState("");
  const [orcamentoIsAberto, setOrcamentoIsAberto] = useState("");
  const [prazoMaximo, setPrazoMaximo] = useState("");
  const [valorMinimo, setValorMinimo] = useState("");
  const [isEntregue, setIsEntregue] = useState("");

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

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();

    setServicos(
      await consultarServicos(
        {
          nome: nome || undefined,
          orcamentoIsAberto:
            orcamentoIsAberto === "" ? undefined : orcamentoIsAberto === "true",
          prazoMaximo: prazoMaximo ? new Date(prazoMaximo) : undefined,
          valorMinimo: valorMinimo ? Number(valorMinimo) : undefined,
          isEntregue: isEntregue === "" ? undefined : isEntregue === "true",
        },
        pagina,
        10,
      ),
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center">
      <div>
        <p>{servicos?.total} serviços encontrados</p>
      </div>

      <div className="columns-2 flex gap-8 p-4">
        <form onSubmit={enviar} className="flex flex-col gap-4 w-1/2">
          <p>Nome</p>
          <Input
            placeholder="Logo, site, etc..."
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <p>Prazo máximo</p>
          <Input
            type="date"
            value={prazoMaximo}
            onChange={(e) => setPrazoMaximo(e.target.value)}
          />

          <p>Valor mínimo</p>
          <Input
            type="number"
            value={valorMinimo}
            onChange={(e) => setValorMinimo(e.target.value)}
          />

          <p>Orcamento Aberto</p>
          <select
            value={orcamentoIsAberto}
            onChange={(e) => setOrcamentoIsAberto(e.target.value)}
            className="bg-sky-400"
          >
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <p>Entregue</p>
          <select
            value={isEntregue}
            onChange={(e) => setIsEntregue(e.target.value)}
            className="bg-sky-400"
          >
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

          <Button type="submit">Pesquisar</Button>
        </form>

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
                <th className="p-3">Entregue</th>
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
                  <td className="p-3">
                    {servico?.isEntregue ? "Já entregue" : "Não entregue"}
                  </td>
                  <td className="p-3">{servico.valorMinimo}</td>
                  <td className="p-3">{servico.prazo}</td>
                  <td className="p-3">
                    <Link to={servicoPaths.visualizarServicoById(servico.id)}>
                      <Button>Ver Serviço</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SeletorPaginas
        pagina={pagina}
        totalPaginas={servicos?.totalPaginas || 1}
        onPaginaChange={onPageChange}
      />
    </div>
  );
}

export default PesquisaServico;
