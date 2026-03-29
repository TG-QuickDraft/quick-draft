import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { consultarServicoPorId } from "@/features/services/api/servico.api";
import { buscarPropostasPorServico } from "@/features/freelancers/api/proposal.api";
import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import { useNavigate } from "react-router-dom";

import type { Servico } from "@/features/services/dtos/Servico";
import type { ProposalResponse } from "@/features/freelancers/dtos/freelancer/Proposal";
import type { Freelancer } from "@/features/freelancers/dtos/freelancer/Freelancer";

import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import StarRating from "@/shared/components/ui/StarRating";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import Spinner from "@/shared/components/ui/Spinner";

export const MeuServico = () => {
  const { id } = useParams();
  const servicoId = Number(id);
  const navigate = useNavigate();

  const [servico, setServico] = useState<Servico | null>(null);
  const [propostas, setPropostas] = useState<ProposalResponse[]>([]);
  const [freelancers, setFreelancers] = useState<
    Record<number, Freelancer>
  >({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!servicoId) return;

    const fetchData = async () => {
      try {
        const servicoData = await consultarServicoPorId(servicoId);
        const propostasData =
          await buscarPropostasPorServico(servicoId);

        setServico(servicoData);
        setPropostas(propostasData);

        const freelancersMap: Record<number, Freelancer> = {};

        await Promise.all(
          propostasData.map(async (p) => {
            if (!freelancersMap[p.freelancerId]) {
              const freelancer = await consultarFreelancerPorId(
                p.freelancerId
              );
              freelancersMap[p.freelancerId] = freelancer;
            }
          })
        );

        setFreelancers(freelancersMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [servicoId]);

  if (!servico) {
    return <Spinner />;
  }

const propostasOrdenadas = [...propostas].sort((a, b) => {
  if (!servico.propostaAceitaId) return 0;

  if (a.id === servico.propostaAceitaId) return -1;
  if (b.id === servico.propostaAceitaId) return 1;

  return 0;
});

return (
    <div className="flex h-screen bg-white">
        <div
        className={`transition-all duration-300 ${
            sidebarOpen ? "w-90" : "w-12"
        } bg-white border-r border-gray-200`}
        >
        <div className="flex justify-end p-2">
            <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-black"
            >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
        </div>

        {sidebarOpen && (
            <div className="p-4">
            <h2 className="text-lg font-semibold mb-1">Propostas</h2>
            <p className="text-sm text-gray-500 mb-4">
                {propostas.length} no total
            </p>

            <div className="divide-y divide-gray-200">
                {propostasOrdenadas.map((p) => {
                const freelancer = freelancers[p.freelancerId];
                const isAceita = p.id === servico.propostaAceitaId;
                const temAceita = !!servico.propostaAceitaId;

                return (
                    <div
                      key={p.id}
                      className={`p-3 flex items-center justify-between transition-all
                        ${
                          temAceita && !isAceita
                            ? "opacity-40"
                            : ""
                        }
                        ${
                          isAceita
                            ? "bg-[var(--color-secondary-40)] border border-[var(--color-secondary-100)] rounded-lg"
                            : ""
                        }
                      `}
                    >
                    <div className="flex items-center gap-3">
                        <ProfilePhoto
                        photoPath={freelancer?.fotoPerfilUrl}
                        size="sm"
                        className="!w-auto"
                        />

                        <div>
                        <p className="font-medium">
                            {freelancer?.nome || "Carregando..."}
                        </p>
                        <p className="text-xs text-gray-500">
                            {
                              isAceita
                              ? "Proposta Aceita"
                              : "Prazo: " +
                                new Date(
                                p.prazoEntrega
                                ).toLocaleDateString()
                            }
                        </p>
                        </div>
                    </div>

                    <button 
                        onClick={() =>
                            navigate(freelancerPaths.verPropostaById(p.id))
                        }
                        className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-200 text-gray-600 rounded-lg hover:text-black">
                        <FaEye />
                        Ver proposta
                    </button>
                    </div>
                );
                })}
            </div>
            </div>
        )}
        </div>

      <div className="flex-1 p-8 overflow-auto bg-white">
        <h1 className="text-xl text-gray-600 mb-4">Serviço</h1>

        <h2 className="text-2xl font-semibold mb-2">
          {servico.nome}
        </h2>

        <p className="text-lg mb-6">
          R$ {servico.valorMinimo?.toFixed(2)}
        </p>

        <h3 className="text-lg font-semibold mb-2">Descrição</h3>

        <p className="text-gray-700 whitespace-pre-line max-w-2xl">
          {servico.descricao}
        </p>
      </div>
    </div>
  );
};