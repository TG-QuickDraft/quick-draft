import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscarPropostaPorId } from "@/features/services/proposal/api/proposta.api";
import { consultarServicoPorId } from "@/features/services/proposal/api/servico.api";

import type { PropostaDTO } from "@/features/services/proposal/dtos/PropostaDTO";
import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";

import Spinner from "@/shared/components/ui/Spinner";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import ProposalStatusBadge from "@/features/services/dashboard/components/ProposalStatusBadge";
import ProposalDetailsCard from "@/features/services/dashboard/components/ProposalDetailsCard";
import ServiceDetailsCard from "@/features/services/dashboard/components/ServiceDetailsCard";
import EntregaServicoModal from "@/features/services/dashboard/components/EntregaServicoModal";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import clsx from "clsx";
import { useModalFactory } from "@/shared/hooks/useModalFactory";
import RatingModal from "@/shared/components/ui/modals/RatingModal";
import { executionPaths } from "@/features/services/execution/routes/executionPaths";
import Button from "@/shared/components/ui/buttons/Button";
import { consultarEntregaPorServicoId } from "../../delivery/api/entrega.api";
import type { EntregaDTO } from "../../delivery/dtos/entrega/EntregaDTO";
import { useCriarAvaliacao } from "../../delivery/hooks/useCriarAvaliacao";

const MinhaProposta = () => {
  const { id } = useParams();
  const propostaId = Number(id);

  const navigate = useNavigate();

  const [proposta, setProposta] = useState<PropostaDTO | null>(null);
  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [entrega, setEntrega] = useState<EntregaDTO | null>(null);

  const [loading, setLoading] = useState(true);

  const [showEntregaModal, setShowEntregaModal] = useState(false);

  const [cliente, setCliente] = useState<ClienteDTO | null>(null);

  const { openModal: openRatingModal, Modal: RatingModalComponent } =
    useModalFactory(RatingModal);

  const { enviarAvaliacao } = useCriarAvaliacao();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propostaData = await buscarPropostaPorId(propostaId);
        const servicoData = await consultarServicoPorId(propostaData.servicoId);
        const clienteData = await consultarClientePorId(servicoData.clienteId);
        const entregaData = await consultarEntregaPorServicoId(propostaData.servicoId);

        setProposta(propostaData);
        setServico(servicoData);
        setCliente(clienteData);
        setEntrega(entregaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propostaId]);

  if (loading) return <Spinner />;

  if (!proposta || !servico) {
    return <div className="p-6">Proposta não encontrada</div>;
  }

  const propostaAceitaId = servico.propostaAceitaId;
  const isAceita = propostaAceitaId === proposta.id;
  const temAceita = !!propostaAceitaId;
  const outraAceita = temAceita && !isAceita;

  const onSubmitAvaliacao = async (rating: number, comentario: string | undefined) => {
    await enviarAvaliacao(proposta.servicoId, rating, comentario);
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <header>
        <BackButton />
      </header>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">Sua proposta para o serviço</p>
        <h1 className="text-3xl font-bold">{servico.nome}</h1>
        <ProposalStatusBadge isAceita={isAceita} outraAceita={outraAceita} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProposalDetailsCard proposta={proposta} />

        <ServiceDetailsCard servico={servico} cliente={cliente} />
      </div>

      {isAceita && (
        <div className="sticky bottom-6 flex justify-end gap-6">
          <button
            className={clsx(
              "cursor-pointer hover:-translate-y-1 transition duration-200",
            )}
            title="Iniciar conversa com o cliente "
            onClick={() =>
              navigate(executionPaths.chatServicoById(proposta.servicoId))
            }
          >
            <IoChatboxEllipsesOutline size={40} />
          </button>

          {entrega === null ? (
            <button
              onClick={() => setShowEntregaModal(true)}
              className="px-6 py-3 rounded-xl bg-black text-white hover:scale-[1.02] transition-all shadow-lg"
            >
              Entregar Serviço
            </button>
          ) : (
            <Button
              className="px-6 py-3 rounded-xl bg-black text-white hover:scale-[1.02] transition-all shadow-lg"
              variant="success"
              disabled
            >
              Serviço entregue
            </Button>
          )}
        </div>
      )}

      <EntregaServicoModal
        servicoId={servico.id}
        show={showEntregaModal}
        onClose={() => setShowEntregaModal(false)}
        openRatingModal={openRatingModal}
      />

      <RatingModalComponent
        title="Avaliar Cliente"
        subtitle="Qual nota deseja dar ao cliente?"
        onSubmit={onSubmitAvaliacao}
      />
    </div>
  );
};

export default MinhaProposta;
