import { MeusServicosList } from "@/features/users/components/MeusServicosList";

type Props = {
  clienteId: number;
  totalServicos: number;
};

export const ClienteServicosSection = ({
  clienteId,
  totalServicos,
}: Props) => {
  const temServicos = totalServicos > 0;

  return (
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
        <MeusServicosList 
          clienteId={clienteId} 
          publicView
        />
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
  );
};