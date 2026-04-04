import { useEffect, useState } from "react";
import { consultarMeusServicos } from "@/features/services/api/servico.api";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/Spinner";
import { FiEye } from "react-icons/fi";
import { servicoPaths } from "@/features/services/routes/servicoPaths"

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
        <div
          key={servico.id}
          className="border border-gray-400 rounded-2xl p-6 flex justify-between items-center"
        >
        <div>
        <h3 className="text-lg font-bold mb-2">{servico.nome}</h3>

        <p className="text-3xl font-semibold text-black-600 my-1">
            R$ {servico.valorMinimo}
        </p>

        <p className="text-sm text-gray-800 mt-3">
            Prazo: {new Date(servico.prazo).toLocaleDateString()}
        </p>
        </div>

            <button
            onClick={() =>
                navigate(servicoPaths.visualizarMeuServicoById(servico.id))
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