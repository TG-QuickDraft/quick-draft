import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";

import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";

import { ClienteIdentity } from "@/features/clients/components/ClienteIdentity";
import { InfoCard } from "@/features/clients/components/InfoCard";

import { gerarBannerCliente } from "@/features/clients/utils/getGerarBannerCliente.ts";

type Props = {
  cliente: ClienteDTO | null;
  totalServicos: number;
};

export const ClienteProfileHeader = ({
  cliente,
  totalServicos,
}: Props) => {
  const bannerStyle = gerarBannerCliente(cliente?.nome);

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="h-32 w-full" style={bannerStyle} />

      <div className="px-6 md:px-10 pb-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-8">
          <div className="shrink-0">
            <ProfilePhoto
              photoPath={cliente?.fotoPerfilUrl}
              size="md"
              className="!w-auto !justify-start"
              imgClassName="border-4 border-white shadow-xl bg-white"
            />
          </div>

          <div className="flex-1 min-w-0">
            <ClienteIdentity cliente={cliente} />
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
  );
};