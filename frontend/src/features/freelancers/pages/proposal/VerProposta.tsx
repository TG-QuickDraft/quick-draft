import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StarRating from "@/shared/components/ui/StarRating";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";

import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import {
  consultarServicoPorId,
  aceitarProposta,
} from "@/features/services/api/servico.api";
import { buscarPropostaPorId } from "@/features/freelancers/api/proposta.api";

import type { PropostaDTO } from "@/features/freelancers/dtos/freelancer/PropostaDTO";
import type { FreelancerDTO } from "@/features/freelancers/dtos/freelancer/FreelancerDTO";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";

import { useAuth } from "@/features/auth/hooks/useAuth";
import ProposalCards from "../../components/ProposalCards";
import Spinner from "@/shared/components/ui/Spinner";
import { toLocaleString } from "@/shared/utils/date.utils";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import Button from "@/shared/components/ui/buttons/Button";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { useModal } from "@/shared/contexts/modal.context";

const VerProposta = () => {
  const { showSuccess, showError, showDanger } = useModal();

  const { id } = useParams();
  const propostaId = Number(id);
  const navigate = useNavigate();

  const [proposta, setProposta] = useState<PropostaDTO | null>(null);
  const [freelancer, setFreelancer] = useState<FreelancerDTO | null>(null);
  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const { roles } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propostaData = await buscarPropostaPorId(propostaId);
        setProposta(propostaData);

        const [freelancerData, servicoData] = await Promise.all([
          consultarFreelancerPorId(propostaData.freelancerId),
          consultarServicoPorId(propostaData.servicoId),
        ]);

        setFreelancer(freelancerData);
        setServico(servicoData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propostaId]);

  const handleAceitarProposta = () => {
    showDanger({
      content:
        "Tem certeza que deseja aceitar essa proposta? Essa ação não pode ser desfeita",
      onConfirm: handleConfirmarAceite,
    });
  };

  const handleConfirmarAceite = async () => {
    if (!proposta || !servico) return;

    try {
      await aceitarProposta(servico.id, proposta.id);
      showSuccess({
        content: "Proposta aceita com sucesso!",
      });
    } catch (error) {
      showError({
        content: "Erro ao aceitar proposta",
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!proposta) {
    return <div className="p-4">Proposta não encontrada</div>;
  }

  const propostaAceitaId = servico?.propostaAceitaId;
  const temPropostaAceita = !!propostaAceitaId;
  const outraPropostaAceita = temPropostaAceita && !temPropostaAceita;

  const itens = proposta.itensPropostos
    ?.split(";")
    .map((i) => i.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-5 max-w-310 mx-auto w-full">
      <header>
        <BackButton />
      </header>

      <p className="text-gray-500 text-sm">Serviço: {servico?.nome}</p>

      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center flex-wrap">
          <div className="h-50 w-50 rounded-full">
            <ProfilePhoto
              photoPath={freelancer?.fotoPerfilUrl}
              size="lg"
              className="w-full! h-full!"
              imgClassName="!w-full !h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {freelancer?.nome || <Spinner />}
            </h1>
            <p className="text-[20px]">Design Gráfico / Editor de Vídeo</p>
          </div>
          <StarRating rating={4.2} />
        </div>

        {roles.includes("Freelancer") && temPropostaAceita && (
          <Button
            onClick={() =>
              navigate(servicoPaths.chatServicoById(proposta.servicoId))
            }
            icon={<IoChatboxEllipsesOutline size={20} />}
          >
            Iniciar chat
          </Button>
        )}
      </div>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-2 w-50">
          <p className="text-[20px] font-semibold">Proposta</p>

          <div className="flex flex-col gap-1">
            <p>{numberToCurrency(proposta.valorPorHora)} / Hora</p>
            <p>
              {toLocaleString(proposta.prazoEntrega, { somenteData: true })}
            </p>

            <div className="ml-5 text-[13px]">
              <p>{numberToCurrency(proposta.valorTotal)}</p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 min-w-50">
          <p className="text-[20px] font-semibold">{proposta.mensagem}</p>

          <h2>Items propostos: </h2>

          <ul className="font-semibold">
            {itens?.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {roles.includes("Cliente") && (
        <div className="sticky bottom-6 flex justify-end pointer-events-none">
          <button
            onClick={handleAceitarProposta}
            disabled={temPropostaAceita}
            className={`pointer-events-auto px-5 py-3 rounded-xl shadow-lg transition-all duration-300
              ${
                temPropostaAceita
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
              }
            `}
          >
            {temPropostaAceita
              ? "Proposta já foi aceita!"
              : outraPropostaAceita
                ? "Este serviço já aceitou outra proposta"
                : "Aceitar proposta"}
          </button>
        </div>
      )}

      <p className="text-xl mt-3">Projetos Selecionados em Destaque:</p>

      <div className="flex gap-5 flex-wrap justify-center mb-8">
        {proposta.projetosDestacados?.map((proj) => (
          <ProposalCards key={proj.id} img={proj.imagemUrl} url={proj.link} />
        ))}
      </div>
    </div>
  );
};

export default VerProposta;
