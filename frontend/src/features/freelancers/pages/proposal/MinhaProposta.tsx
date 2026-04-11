import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    buscarPropostaPorId,
} from "@/features/freelancers/api/proposta.api";

import {
    consultarServicoPorId,
} from "@/features/services/api/servico.api";

import type { PropostaDTO } from "@/features/freelancers/dtos/freelancer/PropostaDTO";
import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";

import Spinner from "@/shared/components/ui/Spinner";
import Modal from "@/shared/components/ui/Modal";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

import { numberToCurrency } from "@/shared/utils/number.utils";
import { toLocaleString } from "@/shared/utils/date.utils";
import Button from "@/shared/components/ui/buttons/Button";

import MiniProposalCard from "@/features/freelancers/components/MiniProposalCard"

const MinhaProposta = () => {
    const { id } = useParams();
    const propostaId = Number(id);

    const [proposta, setProposta] = useState<PropostaDTO | null>(null);
    const [servico, setServico] = useState<ServicoDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const [showEntregaModal, setShowEntregaModal] = useState(false);
    const [arquivo, setArquivo] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propostaData = await buscarPropostaPorId(propostaId);
                const servicoData = await consultarServicoPorId(
                    propostaData.servicoId
                );

                setProposta(propostaData);
                setServico(servicoData);
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

    const itens = proposta.itensPropostos
        ?.split(";")
        .map((i) => i.trim())
        .filter(Boolean);

    const statusConfig = isAceita
        ? {
            label: "ACEITA",
            color: "bg-green-100 text-green-700 border-green-300",
        }
        : outraAceita
            ? {
                label: "REJEITADA (outra proposta escolhida)",
                color: "bg-red-100 text-red-600 border-red-300",
            }
            : {
                label: "EM ANÁLISE",
                color: "bg-yellow-100 text-yellow-700 border-yellow-300",
            };

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

                <div
                    className={`w-fit px-4 py-1 rounded-full border text-sm font-semibold ${statusConfig.color}`}
                >
                    {statusConfig.label}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">
                        Sua proposta
                    </h2>

                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <p>
                            {numberToCurrency(proposta.valorPorHora)} / hora
                        </p>
                        <p>
                            Entrega:{" "}
                            {toLocaleString(proposta.prazoEntrega, {
                                somenteData: true,
                            })}
                        </p>
                        <p className="font-semibold text-black mt-1">
                            Total: {numberToCurrency(proposta.valorTotal)}
                        </p>
                    </div>

                    <div className="mt-3">
                        <p className="font-medium mb-1">Mensagem</p>
                        <p className="text-gray-700 whitespace-pre-line">
                            {proposta.mensagem}
                        </p>
                    </div>

                    {itens && itens.length > 0 && (
                        <div className="mt-3">
                            <p className="font-medium mb-1">
                                Itens propostos
                            </p>

                            <ul className="list-disc ml-5 text-gray-700">
                                {itens.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {proposta.projetosDestacados &&
                        proposta.projetosDestacados.length > 0 && (
                            <div className="mt-4">
                                <p className="font-medium mb-2">
                                    Projetos em destaque
                                </p>

                                <div className="flex gap-3 flex-wrap">
                                    {proposta.projetosDestacados.map((proj) => (
                                        <MiniProposalCard
                                            key={proj.id}
                                            img={proj.imagemUrl}
                                            url={proj.link}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">
                        Detalhes do serviço
                    </h2>

                    <p className="text-gray-700 whitespace-pre-line">
                        {servico.descricao}
                    </p>

                    <div className="text-sm text-gray-600 mt-2">
                        <p>
                            Orçamento mínimo:{" "}
                            {numberToCurrency(servico.valorMinimo || 0)}
                        </p>
                    </div>
                </div>
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

            <Modal
                show={showEntregaModal}
                title="Entregar Serviço"
                onClose={() => setShowEntregaModal(false)}
            >
                <div className="flex flex-col gap-5">

                    <label
                        className={`
        w-full h-40 border-2 border-dashed rounded-xl
        flex flex-col items-center justify-center
        text-center cursor-pointer
        transition-all
        ${arquivo ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-black"}
      `}
                    >
                        <input
                            type="file"
                            accept=".zip,.rar,.7z"
                            className="hidden"
                            onChange={(e) =>
                                setArquivo(e.target.files?.[0] || null)
                            }
                        />

                        {!arquivo ? (
                            <>
                                <p className="text-sm text-gray-600">
                                    Clique aqui para anexar seu arquivo
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    (.zip, .rar, .7z)
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-green-700">
                                    Arquivo selecionado
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {arquivo.name}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Clique para trocar
                                </p>
                            </>
                        )}
                    </label>

                    {/* BOTÃO */}
                    <Button
                        disabled={!arquivo}
                        onClick={() => {
                            alert("entregou! confia.");
                            setShowEntregaModal(false);
                        }}
                        className="w-full"
                    >
                        Confirmar Entrega
                    </Button>

                </div>
            </Modal>
        </div>
    );
};

export default MinhaProposta;