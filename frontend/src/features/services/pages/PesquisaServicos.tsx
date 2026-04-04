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

import CardWrapper from "@/shared/components/ui/card/CardWrapper";
import DetailsButton from "@/shared/components/ui/buttons/DetailsButton";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import Card from "@/shared/components/ui/card/Card";

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

      <div className="flex gap-8 p-4 w-full">
        <form onSubmit={enviar} className="flex flex-col gap-4 w-50">
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

        <div className="flex flex-col gap-5 flex-1">
          {servicos && servicos.itens.length === 0 && (
            <p className="text-2xl">Nenhum serviço encontrado</p>
          )}

          {servicos &&
            servicos.itens.length > 0 &&
            servicos.itens.map((servico) => (
              <Card
                key={servico.id}
                title={servico.nome}
                subtitle={servico.prazo}
                description={servico.descricao}
              />
            ))}
        </div>
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
