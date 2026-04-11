import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { buscarPropostaPorId } from "@/features/freelancers/api/proposta.api";
import { consultarServicoPorId } from "@/features/services/api/servico.api";

import type { PropostaDTO } from "@/features/freelancers/dtos/freelancer/PropostaDTO";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";

import Spinner from "@/shared/components/ui/Spinner";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import ProposalStatusBadge from "@/features/freelancers/components/ProposalStatusBadge";
import ProposalDetailsCard from "@/features/freelancers/components/ProposalDetailsCard";
import ServiceDetailsCard from "@/features/freelancers/components/ServiceDetailsCard";
import EntregaServicoModal from "@/features/freelancers/components/EntregaServicoModal";

const MinhaProposta = () => {
    const { id } = useParams();
    const propostaId = Number(id);

    const [proposta, setProposta] = useState<PropostaDTO | null>(null);
    const [servico, setServico] = useState<ServicoDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const [showEntregaModal, setShowEntregaModal] = useState(false);

    const [cliente, setCliente] = useState<ClienteDTO | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propostaData = await buscarPropostaPorId(propostaId);
                const servicoData = await consultarServicoPorId(
                    propostaData.servicoId
                );
                const clienteData = await consultarClientePorId(
                    servicoData.clienteId
                );

                setProposta(propostaData);
                setServico(servicoData);
                setCliente(clienteData);
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

    return (
        <div className="p-6 flex flex-col gap-6">
            <header>
                <BackButton />
            </header>

            <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">
                    Sua proposta para o serviço
                </p>

                <h1 className="text-3xl font-bold">
                    {servico.nome}
                </h1>

                <ProposalStatusBadge
                    isAceita={isAceita}
                    outraAceita={outraAceita}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProposalDetailsCard proposta={proposta} />

                <ServiceDetailsCard
                    servico={servico}
                    cliente={cliente}
                />
            </div>

            {isAceita && (
                <div className="sticky bottom-6 flex justify-end">
                    <button
                        onClick={() => setShowEntregaModal(true)}
                        className="px-6 py-3 rounded-xl bg-black text-white hover:scale-[1.02] transition-all shadow-lg"
                    >
                        Entregar Serviço
                    </button>
                </div>
            )}

           <EntregaServicoModal
                show={showEntregaModal}
                onClose={() => setShowEntregaModal(false)}
            />
        </div>
    );
};

export default MinhaProposta;