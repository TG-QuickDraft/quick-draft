import { Link, useParams } from "react-router-dom";
import { consultarServicoPorId } from "../api/servico.api";

import { useEffect, useState } from "react";

import Title from "@/shared/components/ui/titles/Title";

import Button from "@/shared/components/ui/buttons/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import type { ServicoDTO } from "../dtos/ServicoDTO";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { servicoPaths } from "../routes/servicoPaths";
import type { ClienteDTO } from "@/features/clients/dtos/ClienteDTO";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";
import { toLocaleString } from "@/shared/utils/date.utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { numberToCurrency } from "@/shared/utils/number.utils";

export const VisualizarServico = () => {
  const { id } = useParams();

  const [servico, setServico] = useState<ServicoDTO | null>(null);
  const [cliente, setCliente] = useState<ClienteDTO | null>(null);

  const { isAuthenticated, roles } = useAuth();

  useEffect(() => {
    const obterDados = async () => {
      const data = await consultarServicoPorId(Number(id));
      const clienteData = await consultarClientePorId(data?.clienteId);

      if (data && clienteData) {
        setServico(data);
        setCliente(clienteData);
      }
    };

    obterDados();
  }, [id]);

  const detalhes = {
    Categoria: <p>CATEGORIA</p>,
    Prazo: <p>{toLocaleString(servico?.prazo ?? "")}</p>,
    Orçamento:
      servico?.orcamentoIsAberto === true ? (
        <p className="text-green-500">Aberto</p>
      ) : (
        <p className="text-red-500">Fechado</p>
      ),
  };

  const temPropostaAceita = !!servico?.propostaAceitaId;

  return (
    <div className="w-full">
      <Link to={servicoPaths.pesquisaServico}>
        <Button
          className="mt-6 bg-white border-0"
          icon={<MdKeyboardDoubleArrowLeft className="text-black" size={30} />}
        >
          <Title className="text-black">Voltar</Title>
        </Button>
      </Link>

      <main className="flex mt-6 gap-6 p-4 rounded-xl bg-neutral-10">
        <section className="flex-1 p-4">
          <div className="flex flex-col p-4 gap-1">
            <Title>{servico?.nome}</Title>
            <Title className="font-normal!">
              {numberToCurrency(servico?.valorMinimo ?? 0)}
            </Title>
          </div>

          <div className="p-4 mt-4 rounded-2xl bg-white/90">
            <Title className="mt-4">Descrição</Title>
            <p className="break-all my-6">{servico?.descricao}</p>
          </div>
        </section>

        <section className="flex-1 p-4 mx-16">
          <Link
            to={clientePaths.perfilClienteById(servico?.clienteId ?? "")}
            className="flex justify-between items-center w-full"
          >
            <Title>Serviço criado por {cliente?.nome}</Title>
            <ProfilePhoto
              photoPath={cliente?.fotoPerfilUrl}
              className="w-fit!"
              imgClassName="h-24! w-24!"
            />
          </Link>

          <hr className="m-4 text-neutral-40" />

          <div>
            {Object.entries(detalhes).map(([label, value]) => (
              <div key={label} className="flex items-center gap-2 my-2">
                <p>{label}</p>
                <span className="flex-1 border-t-2 border-dashed" />
                <p>{value}</p>
              </div>
            ))}
          </div>

          {isAuthenticated &&
            roles.includes("Freelancer") &&
            (temPropostaAceita ? (
              <Button className="flex-1 mt-6 p-4! bg-gray-400 text-white cursor-not-allowed">
                Este serviço já tem uma proposta aceita
              </Button>
            ) : (
              <Link
                className="flex"
                to={freelancerPaths.cadastrarPropostaById(servico?.id ?? "")}
              >
                <Button className="flex-1 mt-6 p-4!">Enviar Proposta</Button>
              </Link>
            ))}
        </section>
      </main>
    </div>
  );
};
