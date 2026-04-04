import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/ui/buttons/Button";
import { consultarServicos } from "@/features/services/api/servico.api";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import Spinner from "@/shared/components/ui/Spinner";
import { usePagination } from "@/shared/hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import Card from "@/shared/components/ui/card/Card";
import { numberToCurrency } from "@/shared/utils/number.utils";

import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import type { PagedResult } from "@/shared/types/PagedResult";

import InputGroup from "@/shared/components/ui/Inputs/InputGroup";
import Label from "@/shared/components/ui/Label";
import Input from "@/shared/components/ui/Inputs/Input";
import clsx from "clsx";

import DateInput from "@/shared/components/ui/Inputs/DateInput";
import { format } from "date-fns";

export function PesquisaServico() {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState<PagedResult<ServicoDTO>>();

  const [nome, setNome] = useState("");
  const [orcamentoIsAberto, setOrcamentoIsAberto] = useState("");
  const [prazoMaximo, setPrazoMaximo] = useState<Date | null>(null);
  const [valorMinimo, setValorMinimo] = useState<number | null>(null);
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
          prazoMaximo: prazoMaximo ? prazoMaximo.toISOString() : undefined,
          valorMinimo: valorMinimo ? valorMinimo : undefined,
          isEntregue: isEntregue === "" ? undefined : isEntregue === "true",
        },
        pagina,
        10,
      ),
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center p-4">
      <form
        onSubmit={enviar}
        className="flex justify-between items-center w-full"
      >
        <div className="flex gap-4 w-full items-center">
          <InputGroup>
            <Label>Nome</Label>
            <Input
              placeholder="Logo, site, etc..."
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Prazo máximo</Label>
            <DateInput
              selectedDate={prazoMaximo}
              onChange={(value) => setPrazoMaximo(value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Valor mínimo</Label>
            <Input
              type="number"
              mask="currency"
              placeholder="R$ 0,00"
              value={valorMinimo || ""}
              onCurrencyChange={(val) => {
                setValorMinimo(val ? Number(val) : null);
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Orcamento Aberto</Label>
            <select
              value={orcamentoIsAberto}
              onChange={(e) => setOrcamentoIsAberto(e.target.value)}
              className="bg-sky-400"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </InputGroup>
          <InputGroup>
            <Label>Entregue</Label>
            <select
              value={isEntregue}
              onChange={(e) => setIsEntregue(e.target.value)}
              className="bg-sky-400"
            >
              <option value="">Todos</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </InputGroup>
        </div>

        <Button className="w-50!" type="submit">
          Filtrar
        </Button>
      </form>

      <div className="flex flex-col w-full gap-3">
        {servicos && servicos.total > 0 && (
          <span className="text-neutral-80">
            Serviços encontrados: {servicos.total}
          </span>
        )}

        <div className="flex flex-col gap-5 flex-1">
          {servicos && servicos.itens.length === 0 && (
            <p
              className={clsx(
                "flex flex-col justify-center items-center py-25 text-2xl ",
                "text-neutral-80",
              )}
            >
              Nenhum serviço encontrado
            </p>
          )}
          {servicos &&
            servicos.itens.length > 0 &&
            servicos.itens.map((servico) => (
              <Card
                key={servico.id}
                title={servico.nome}
                subtitle={`Valor mínimo: ${numberToCurrency(servico.valorMinimo)}`}
                description={servico.descricao}
                onClick={() =>
                  navigate(servicoPaths.visualizarServicoById(servico.id))
                }
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
