import type { PropostaDTO } from "@/features/freelancers/dtos/freelancer/PropostaDTO";
import MiniProposalCard from "@/features/freelancers/components/MiniProposalCard";
import { numberToCurrency } from "@/shared/utils/number.utils";
import { toLocaleString } from "@/shared/utils/date.utils";

type Props = {
    proposta: PropostaDTO;
};

const ProposalDetailsCard = ({ proposta }: Props) => {
    const itens = proposta.itensPropostos
        ?.split(";")
        .map((i) => i.trim())
        .filter(Boolean);

    return (
        <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Sua proposta</h2>

            <div className="flex flex-col gap-1 text-sm text-gray-600">
                <p>{numberToCurrency(proposta.valorPorHora)} / hora</p>

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
                    <p className="font-medium mb-1">Itens propostos</p>

                    <ul className="list-disc ml-5 text-gray-700">
                        {itens.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {proposta.projetosDestacados?.length > 0 && (
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
    );
};

export default ProposalDetailsCard;