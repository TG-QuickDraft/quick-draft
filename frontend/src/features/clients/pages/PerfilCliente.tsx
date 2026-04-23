import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import {
  consultarMeusServicos,
  consultarServicosPorClienteId,
} from "@/features/services/proposal/api/servico.api";

import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

import Spinner from "@/shared/components/ui/Spinner";

import { ClienteProfileHeader } from "@/features/clients/components/ClienteProfileHeader";
import { ClienteServicosSection } from "@/features/clients/components/ClienteServicosSection";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import type { ServicoDTO } from "@/features/services/proposal/dtos/ServicoDTO";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import { useModal } from "@/shared/contexts/modal.context";

export const PerfilCliente = () => {
  const { id } = useParams();
  const clienteId = Number(id);

  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [totalServicos, setTotalServicos] = useState(0);
  const [loading, setLoading] = useState(true);

  const [servicos, setServicos] = useState<ServicoDTO[]>([]);
  const { showError } = useModal();

  useEffect(() => {
    (async () => {
      let timer = setTimeout(() => setLoading(true), LOADING_TIMEOUT);

      try {
        if (clienteId && !Number.isNaN(clienteId)) {
          const [dadosCliente, servicosPaginados] = await Promise.all([
            consultarClientePorId(clienteId),
            consultarServicosPorClienteId(clienteId, 1, 10), // TODO: Colocar paginação na página no futuro
          ]);

          setCliente(dadosCliente);
          setServicos(servicosPaginados.itens);
          setTotalServicos(servicosPaginados.itens.length);
        } else {
          const response = await consultarMeusServicos(1, 30);
          setServicos(response.itens);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          showError({ content: error.message });
        }
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    })();
  }, [clienteId]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-full px-6 md:px-12 py-2">
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton>Voltar</BackButton>
        <ClienteProfileHeader cliente={cliente} totalServicos={totalServicos} />

        <ClienteServicosSection
          servicos={servicos}
          clienteId={clienteId}
          totalServicos={totalServicos}
        />
      </div>
    </div>
  );
};
