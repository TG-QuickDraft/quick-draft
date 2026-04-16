import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/Spinner";
import { FiEye } from "react-icons/fi";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { toLocaleString } from "@/shared/utils/date.utils";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import type { PropostaDTO } from "@/features/freelancers/dtos/freelancer/PropostaDTO";
import { consultarMinhasPropostas } from "@/features/freelancers/api/proposta.api";

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
        <div
          key={proposta.id}
          className="border border-gray-400 rounded-2xl p-6 flex justify-between items-center"
        >
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

          <button
            onClick={() =>
              navigate(freelancerPaths.verMinhaPropostaById(proposta.id))
            }
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
          >
            <FiEye size={18} />
            Ver Detalhes
          </button>
        </div>
      ))}
    </div>
  );
};
