import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/Spinner";
import { FiEye } from "react-icons/fi";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { toLocaleString } from "@/shared/utils/date.utils";
import type { PropostaDTO } from "@/features/services/proposal/dtos/PropostaDTO";
import { consultarMinhasPropostas } from "@/features/services/proposal/api/proposta.api";
import { dashboardServicoPaths } from "@/features/services/dashboard/routes/dashboardPaths";
import Button from "@/shared/components/ui/buttons/Button";
import clsx from "clsx";
import { LuPencil } from "react-icons/lu";
import CardWrapper from "@/shared/components/ui/card/CardWrapper";
import { proposalPaths } from "@/features/services/proposal/routes/proposalPaths";

export const MinhasPropostasList = () => {
  const [propostas, setPropostas] = useState<PropostaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropostas = async () => {
      try {
        const response = await consultarMinhasPropostas();
        setPropostas(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropostas();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (propostas.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {propostas.map((proposta) => (
        <CardWrapper key={proposta.id}>
          <div>
            <h3 className="text-lg font-bold mb-2">{proposta.nomeServico}</h3>

            <p className="text-3xl font-semibold text-black-600 my-1">
              {numberToCurrency(proposta.valorTotal)}
            </p>

            <p className="text-sm text-gray-800 mt-3">
              Prazo:{" "}
              {toLocaleString(proposta.prazoEntrega, { somenteData: true })}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Button
              className={clsx(
                "rounded-lg text-lg border border-transparent shadow",
                "scale-100 not-disabled:hover:bg-white!",
                "not-disabled:hover:text-black",
                "not-disabled:hover:border-neutral-40",
              )}
              icon={<LuPencil />}
              disabled={proposta.isPropostaAceita}
              title={
                proposta.isPropostaAceita
                  ? "Não é possível editar uma proposta já aceita"
                  : "Editar proposta"
              }
              onClick={() =>
                navigate(
                  proposalPaths.atualizarPropostaById({
                    servicoId: proposta.servicoId,
                    propostaId: proposta.id,
                  }),
                )
              }
            >
              Editar
            </Button>
            <button
              onClick={() =>
                navigate(
                  dashboardServicoPaths.verMinhaPropostaById(proposta.id),
                )
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <FiEye size={18} />
              Ver Detalhes
            </button>
          </div>
        </CardWrapper>
      ))}
    </div>
  );
};
