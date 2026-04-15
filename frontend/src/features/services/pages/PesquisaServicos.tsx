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
import Select from "@/shared/components/ui/Select";
import { FaFilter } from "react-icons/fa";
import Title from "@/shared/components/ui/titles/Title";
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
      let timer = setTimeout(() => setLoading(true), 1000);
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
    <div className="flex flex-col items-center p-4 max-w-300 mx-auto w-full">
      <form
        onSubmit={enviar}
        className="flex justify-between gap-4 items-center w-full"
      >
        <div className="flex gap-4 w-full items-center">
          <InputGroup>
            <Label>Nome</Label>
            <Input
              className="w-40!"
              placeholder="Logo, site, etc..."
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Prazo máximo</Label>
            <DateInput
              className="w-40!"
              selectedDate={prazoMaximo}
              onChange={(value) => setPrazoMaximo(value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Valor mínimo</Label>
            <Input
              className="w-40!"
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
            <Select
              onChange={(value) => setOrcamentoIsAberto(value)}
              options={[
                { label: "Sim", value: "true" },
                { label: "Não", value: "false" },
              ]}
            />
          </InputGroup>
          <InputGroup>
            <Label>Entregue</Label>

            <Select
              onChange={(value) => setIsEntregue(value)}
              options={[
                { label: "Sim", value: "true" },
                { label: "Não", value: "false" },
              ]}
            />
          </InputGroup>
        </div>

        <Button className="w-50! mt-4" type="submit" icon={<FaFilter />}>
          Filtrar
        </Button>
      </form>

      <div className="flex flex-col w-full gap-1">
        <Title>Serviços</Title>

        {servicos && servicos.total > 0 && (
          <span className="text-neutral-80">
            Resultados encontrados: {servicos.total}
          </span>
        )}

        <div className="flex flex-col gap-5 flex-1 mt-3">
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
                subtitle={[
                  numberToCurrency(servico.valorMinimo),
                  format(servico.prazo, "dd/MM/yyyy"),
                  servico.isEntregue ? "Entregue" : "Não Entregue",
                  servico.orcamentoIsAberto ? "Aberto" : "Fechado",
                ].join(" - ")}
                description={servico.descricao}
                onClick={() =>
                  navigate(servicoPaths.visualizarServicoById(servico.id))
                }
              />
            ))}
        </div>
      </div>

      {servicos && servicos.total > 0 && servicos.totalPaginas > 1 && (
        <SeletorPaginas
          pagina={pagina}
          totalPaginas={servicos.totalPaginas}
          onPaginaChange={onPageChange}
        />
      )}
    </div>
  );
}

export default PesquisaServico;
