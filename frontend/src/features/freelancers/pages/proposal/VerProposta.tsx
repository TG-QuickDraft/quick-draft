import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StarRating from "@/shared/components/ui/StarRating";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";

import { buscarPropostasPorServico } from "@/features/freelancers/api/proposal.api";
import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import {
  consultarServicoPorId,
  aceitarProposta,
} from "@/features/services/api/servico.api";
import { buscarPropostaPorId } from "@/features/freelancers/api/proposal.api";

import type { ProposalResponse } from "@/features/freelancers/dtos/freelancer/Proposal";
import type { Freelancer } from "@/features/freelancers/dtos/freelancer/Freelancer";
import type { Servico } from "@/features/services/dtos/Servico";

import { useAuth } from "@/features/auth/hooks/useAuth";
import ProposalCards from "../../components/ProposalCards";

const VerProposta = () => {
  const { id } = useParams();
  const propostaId = Number(id);

  const [proposta, setProposta] = useState<ProposalResponse | null>(null);
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [servico, setServico] = useState<Servico | null>(null);
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

  const handleAceitar = async () => {
    if (!proposta || !servico) return;

    try {
      await aceitarProposta(servico.id, proposta.id);
      alert("Proposta aceita com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao aceitar proposta");
    }
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (!proposta) {
    return <div className="p-4">Proposta não encontrada</div>;
  }

  const itens = proposta.itensPropostos
    ?.split(";")
    .map((i) => i.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-5 max-w-310 mx-auto w-full">
      <p className="text-gray-500 text-sm">
        Serviço: {servico?.nome}
      </p>

      <div className="flex gap-5 items-center flex-wrap">
        <div className="h-50 w-50 rounded-full">
          <ProfilePhoto
            photoPath={freelancer?.fotoPerfilUrl}
            size="lg"
            className="!w-full !h-full"
            imgClassName="!w-full !h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {freelancer?.nome || "Carregando..."}
          </h1>

          <p className="text-[20px]">
            Design Gráfico / Editor de Vídeo
          </p>
        </div>

        <StarRating rating={4.2} />
      </div>

      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-2 w-50">
          <p className="text-[20px] font-semibold">Proposta</p>

          <div className="flex flex-col gap-1">
            <p>R$ {proposta.valorPorHora} / Hora</p>
            <p>
              {new Date(
                proposta.prazoEntrega
              ).toLocaleDateString()}
            </p>

            <div className="ml-5 text-[13px]">
              <p>R$ {proposta.valorTotal} total</p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 min-w-50">
          <p className="text-[20px] font-semibold">
            {proposta.mensagem}
          </p>

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
            onClick={handleAceitar}
            className="pointer-events-auto px-5 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]"
            >
            Aceitar proposta
            </button>
        </div>
    )}

      <p className="text-xl mt-3">
        Projetos Selecionados em Destaque:
      </p>

      <div className="flex gap-5 flex-wrap justify-center">
        {proposta.projetosDestacados?.map((proj) => (
          <ProposalCards 
            key={proj.id} 
            img={proj.imagemUrl} 
            url={proj.link}
          />
        ))}
      </div>
    </div>
  );
};

export default VerProposta;