import { useEffect, useState } from "react";
import { consultarMeusServicos } from "@/features/services/api/servico.api";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/Spinner";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { numberToCurrency } from "@/shared/utils/number.utils";
import CardWrapper from "@/shared/components/ui/card/CardWrapper";
import DetailsButton from "@/shared/components/ui/buttons/DetailsButton";

export const MeusServicosList = () => {
  const [servicos, setServicos] = useState<ServicoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await consultarMeusServicos(1, 30);
        setServicos(response.itens);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (servicos.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {servicos.map((servico) => (
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
          <DetailsButton
            onClick={() =>
              navigate(servicoPaths.visualizarMeuServicoById(servico.id))
            }
          >
            Ver Detalhes
          </DetailsButton>
        </CardWrapper>
      ))}
    </div>
  );
};
