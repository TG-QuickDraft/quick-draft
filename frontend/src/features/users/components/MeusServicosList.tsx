import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";

import { useNavigate } from "react-router-dom";

import Spinner from "@/shared/components/ui/Spinner";
import { dashboardServicoPaths } from "@/features/services/dashboard/routes/dashboardPaths";
import { numberToCurrency } from "@/shared/utils/number.utils";

import CardWrapper from "@/shared/components/ui/card/CardWrapper";
import DetailsButton from "@/shared/components/ui/buttons/DetailsButton";
import { proposalPaths } from "@/features/services/proposal/routes/proposalPaths";
import clsx from "clsx";
import type { Tab } from "@/shared/components/ui/Tabs";

type Props = {
  clienteId?: number;
  publicView?: boolean;
  tab?: Tab;
  servicos?: ServicoDTO[];
  loading?: boolean;
};

export const MeusServicosList = ({
  tab = "todos",
  publicView = false,
  servicos = [],
  loading = false,
}: Props) => {
  const navigate = useNavigate();

  const emptyMessageMap: Partial<Record<Tab, string>> = {
    emAndamento: "Nenhum serviço em andamento.",
    semAtribuicao: "Nenhum serviço sem atribuição.",
  };

  const handleNavigate = (servicoId: number) => {
    const rota = publicView
      ? proposalPaths.visualizarServicoById(servicoId)
      : dashboardServicoPaths.visualizarMeuServicoById(servicoId);

    navigate(rota);
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 flex-1">
      {servicos.length === 0 && emptyMessageMap[tab] && (
        <p
          className={clsx(
            "flex items-center justify-center text-center",
            "text-neutral-80 flex-1",
          )}
        >
          {emptyMessageMap[tab]}
        </p>
      )}

      {servicos.map((servico) => {
        return (
          <CardWrapper key={servico.id}>
            <div>
              <h3 className="text-lg font-bold mb-2">{servico.nome}</h3>

              <p className="text-3xl font-semibold text-black-600 my-1">
                {numberToCurrency(servico.valorMinimo)}
              </p>

              <p className="text-sm text-gray-800 mt-3">
                Prazo: {new Date(servico.prazo).toLocaleDateString()}
              </p>
            </div>

            <DetailsButton onClick={() => handleNavigate(servico.id)}>
              Ver Detalhes
            </DetailsButton>
          </CardWrapper>
        );
      })}
    </div>
  );
};
