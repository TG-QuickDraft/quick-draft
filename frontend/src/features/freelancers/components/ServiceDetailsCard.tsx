import { Link } from "react-router-dom";

import type { ServicoDTO } from "@/features/services/dtos/ServicoDTO";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

import { numberToCurrency } from "@/shared/utils/number.utils";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";

import { clientePaths } from "@/features/clients/routes/clientePaths";

type Props = {
    servico: ServicoDTO;
    cliente: ClienteDTO | null;
};

const ServiceDetailsCard = ({
    servico,
    cliente,
}: Props) => {
    return (
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

            {cliente && (
                <Link
                    to={clientePaths.perfilClienteById(cliente.id)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white transition"
                >
                    <ProfilePhoto
                        photoPath={cliente.fotoPerfilUrl}
                        className="w-fit!"
                        imgClassName="w-12! h-12! object-cover"
                    />

                    <div className="flex flex-col">
                        <p className="text-sm text-gray-500">
                            Cliente
                        </p>

                        <p className="font-medium">
                            {cliente.nome}
                        </p>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ServiceDetailsCard;