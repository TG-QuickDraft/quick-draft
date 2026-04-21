import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { consultarServicoPorId } from "@/features/services/proposal/api/servico.api";
import { buscarPropostasPorServico } from "@/features/services/proposal/api/proposta.api";
import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import { useNavigate } from "react-router-dom";

import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";
import type { PropostaDTO } from "@/features/services/proposal/dtos/PropostaDTO";
import type { FreelancerDTO } from "@/features/freelancers/dtos/freelancer/FreelancerDTO";

import { FaEye, FaChevronLeft } from "react-icons/fa";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import Spinner from "@/shared/components/ui/Spinner";
import Button from "@/shared/components/ui/buttons/Button";
import clsx from "clsx";

import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { FaMoneyCheck } from "react-icons/fa";
import { deliveryPaths } from "@/features/services/delivery/routes/deliveryPaths";
import { executionPaths } from "../../execution/routes/executionPaths";
import { proposalPaths } from "../../proposal/routes/proposalPaths";

export const MeuServico = () => {
  const { id } = useParams();
  const servicoId = Number(id);
  const navigate = useNavigate();

  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [propostas, setPropostas] = useState<PropostaDTO[]>([]);
  const [freelancers, setFreelancers] = useState<Record<number, FreelancerDTO>>(
    {},
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!servicoId) return;

    const fetchData = async () => {
      try {
        const servicoData = await consultarServicoPorId(servicoId);
        const propostasData = await buscarPropostasPorServico(servicoId);

        setServico(servicoData);
        setPropostas(propostasData);

        const freelancersMap: Record<number, FreelancerDTO> = {};

        await Promise.all(
          propostasData.map(async (p) => {
            if (!freelancersMap[p.freelancerId]) {
              const freelancer = await consultarFreelancerPorId(p.freelancerId);
              freelancersMap[p.freelancerId] = freelancer;
            }
          }),
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

  const existeAlgumaPropostaAceita = !!servico.propostaAceitaId;

  const propostasOrdenadas = [...propostas].sort((a, b) => {
    if (!servico.propostaAceitaId) return 0;

    if (a.id === servico.propostaAceitaId) return -1;
    if (b.id === servico.propostaAceitaId) return 1;

    return 0;
  });

  return (
    <>
      <div className="flex flex-1 bg-white">
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-90" : "w-12"
          } bg-white border-r border-gray-200`}
        >
          <div className="flex justify-end p-2 pt-9.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={clsx(
                "text-gray-600 hover:text-black cursor-pointer ",
                "hover:-translate-x-1 transition duration-200",
              )}
            >
              <FaChevronLeft className={!sidebarOpen ? "rotate-180" : ""} />
            </button>
          </div>

          {sidebarOpen && (
            <div className="p-4 overflow-hidden">
              <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                Propostas
              </h2>
              <p className="text-sm text-gray-500 mb-4 line-clamp-1">
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
                      className={`p-3 flex items-center w-81 justify-between transition-all
                          ${temAceita && !isAceita ? "opacity-40" : ""}
                          ${
                            isAceita
                              ? "bg-secondary-40 border border-secondary-100 rounded-lg"
                              : ""
                          }
                        `}
                    >
                      <div className="flex items-center gap-3">
                        <ProfilePhoto
                          photoPath={freelancer?.fotoPerfilUrl}
                          size="sm"
                          className="w-auto!"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">
                            {freelancer?.nome || "Carregando..."}
                          </p>
                          <p className="text-xs text-gray-500">
                            {isAceita
                              ? "Proposta Aceita"
                              : "Prazo: " +
                                new Date(p.prazoEntrega).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          navigate(proposalPaths.verPropostaById(p.id))
                        }
                        className={clsx(
                          "flex items-center gap-2 px-3 py-1 text-sm border ",
                          "border-gray-200 text-gray-600 rounded-lg hover:text-black",
                          "bg-white cursor-pointer",
                        )}
                      >
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

        <div
          className={clsx(
            "flex justify-between items-start flex-1 p-8 overflow-auto",
            "bg-white",
          )}
        >
          <div>
            <BackButton className="text-xl text-gray-600 mb-4">
              Serviço
            </BackButton>
            <h2 className="text-2xl font-semibold mb-2">{servico.nome}</h2>
            <p className="text-lg mb-6">R$ {servico.valorMinimo?.toFixed(2)}</p>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-gray-700 whitespace-pre-line max-w-2xl">
              {servico.descricao}
            </p>
          </div>

          {existeAlgumaPropostaAceita && (
            <button
              className={clsx(
                "cursor-pointer hover:-translate-y-1 transition duration-200",
              )}
              title="Iniciar conversa com o freelancer"
              onClick={() =>
                navigate(
                  executionPaths.chatServicoById(servico.id) +
                    "?propostaId=" +
                    servico.propostaAceitaId,
                )
              }
            >
              <IoChatboxEllipsesOutline size={40} />
            </button>
          )}
        </div>
      </div>
      <div className="sticky bottom-6 flex justify-end gap-6 pr-6">
        <Button
          onClick={() =>
            navigate(deliveryPaths.realizarPagamentoById(servico.id))
          }
          icon={<FaMoneyCheck />}
        >
          Realizar pagamento
        </Button>
      </div>
    </>
  );
};
