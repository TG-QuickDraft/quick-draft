import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { consultarServicosPorClienteId } from "@/features/services/api/servico.api";

import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import StarRating from "@/shared/components/ui/StarRating";
import { MeusServicosList } from "@/features/users/components/MeusServicosList";
import Spinner from "@/shared/components/ui/Spinner";

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

  const bannerStyle = useMemo(() => {
    const nome = cliente?.nome ?? "cliente";

    const hash = [...nome].reduce(
      (acc, char, index) => acc + char.charCodeAt(0) * (index + 1),
      0
    );

    const hue = hash % 360;
    const pattern = hash % 3;

    const cor1 = `hsl(${hue}, 70%, 58%)`;
    const cor2 = `hsl(${(hue + 35) % 360}, 72%, 64%)`;
    const cor3 = `hsl(${(hue + 70) % 360}, 68%, 54%)`;

    const baseGradient = `
      linear-gradient(
        135deg,
        ${cor1} 0%,
        ${cor2} 55%,
        ${cor3} 100%
      )
    `;

    const patterns = [
      // bolinhas suaves
      `radial-gradient(circle at 18% 30%, rgba(255,255,255,.14) 0 2px, transparent 3px),
      radial-gradient(circle at 72% 65%, rgba(255,255,255,.10) 0 3px, transparent 4px),
      radial-gradient(circle at 88% 22%, rgba(255,255,255,.08) 0 2px, transparent 3px)`,

      // listras premium
      `repeating-linear-gradient(
        135deg,
        rgba(255,255,255,.08) 0px,
        rgba(255,255,255,.08) 8px,
        transparent 8px,
        transparent 22px
      )`,

      // blobs / ondas modernas
      `radial-gradient(circle at 100% 0%, rgba(255,255,255,.14) 0 16%, transparent 17%),
      radial-gradient(circle at 78% 100%, rgba(255,255,255,.10) 0 18%, transparent 19%),
      radial-gradient(circle at 20% 80%, rgba(255,255,255,.08) 0 14%, transparent 15%)`,
    ];

    return {
      backgroundImage: `${patterns[pattern]}, ${baseGradient}`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  }, [cliente?.nome]);

  if (loading) return <Spinner />;

  const temServicos = totalServicos > 0;

  return (
    <div className="min-h-full bg-zinc-50 px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-32 w-full" style={bannerStyle} />

          <div className="px-6 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-10">
              <div className="shrink-0">
                <ProfilePhoto
                  photoPath={cliente?.fotoPerfilUrl}
                  size="md"
                  className="!w-auto !justify-start"
                  imgClassName="border-4 border-white shadow-xl"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-lg md:text-xl font-bold text-zinc-900 leading-tight truncate">
                      {cliente?.nome}
                    </h1>

                    <p className="text-sm text-zinc-600 mt-1 truncate">
                      {cliente?.email}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <div className="scale-90 origin-top-right">
                      <StarRating rating={4} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <InfoCard
                  value={totalServicos}
                  label="Serviços públicos"
                  dark
                />

                <InfoCard
                  value="4.0"
                  label="Avaliação média"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Serviços abertos
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Confira todos os projetos publicados por este cliente.
            </p>
          </div>

          {temServicos ? (
            <MeusServicosList clienteId={clienteId} />
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
              <h3 className="text-xl font-semibold text-zinc-800">
                Nenhum serviço publicado
              </h3>

              <p className="text-sm text-zinc-500 mt-2">
                Este cliente ainda não abriu projetos.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

type InfoCardProps = {
  value: string | number;
  label: string;
  dark?: boolean;
};

const InfoCard = ({ value, label, dark }: InfoCardProps) => (
  <div
    className={`rounded-2xl px-5 py-4 min-w-36 ${
      dark ? "bg-zinc-900 text-white" : "bg-yellow-100 text-zinc-900"
    }`}
  >
    <p className="text-2xl font-bold">{value}</p>
    <p className={`text-xs ${dark ? "opacity-80" : "text-zinc-600"}`}>
      {label}
    </p>
  </div>
);