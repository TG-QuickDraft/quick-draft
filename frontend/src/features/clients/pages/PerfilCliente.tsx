import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarServicosPorClienteId } from "@/features/services/api/servico.api";

import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

import Spinner from "@/shared/components/ui/Spinner";

import { ClienteProfileHeader } from "@/shared/components/ui/ClienteProfileHeader";
import { ClienteServicosSection } from "@/features/clients/components/ClienteServicosSection";
import { BackButton } from "@/shared/components/ui/buttons/BackButton";

export const PerfilCliente = () => {
  const { id } = useParams();
  const clienteId = Number(id);

  const [cliente, setCliente] = useState<ClienteDTO | null>(null);
  const [totalServicos, setTotalServicos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Number.isNaN(clienteId)) return;

    const carregar = async () => {
      try {
        const [dadosCliente, servicos] = await Promise.all([
          consultarClientePorId(clienteId),
          consultarServicosPorClienteId(clienteId, 1, 50),
        ]);

        setCliente(dadosCliente);
        setTotalServicos(servicos.itens.length);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [clienteId]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-full px-6 md:px-12 py-10">
      <BackButton>Voltar</BackButton>
        <div className="max-w-6xl mx-auto space-y-8 mt-6">
          <ClienteProfileHeader
            cliente={cliente}
            totalServicos={totalServicos}
          />

          <ClienteServicosSection
            clienteId={clienteId}
            totalServicos={totalServicos}
          />
        </div>
    </div>
  );
};