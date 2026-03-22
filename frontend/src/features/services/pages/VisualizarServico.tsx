import { Link, useParams } from "react-router-dom";
import { consultarServicoPorId } from "../api/servico.api";

import { useEffect, useState } from "react";

import Title from "@/shared/components/ui/titles/Title";

import Button from "@/shared/components/ui/buttons/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import type { Servico } from "../dtos/Servico";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import { servicoPaths } from "../routes/servicoPaths";
import type { Cliente } from "@/features/clients/dtos/Cliente";
import { consultarClientePorId } from "@/features/clients/api/cliente.api";

export const VisualizarServico = () => {
  const { id } = useParams();

  const [servico, setServico] = useState<Servico | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);

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

  return (
    <div className="w-full">
      <Link to={servicoPaths.pesquisaServico}>
        <Button
          className="mt-6 bg-white border-0"
          icon={<MdKeyboardDoubleArrowLeft className="text-black" size={30} />}
        >
          <Title className="text-black">Detalhes do Serviço</Title>
        </Button>
      </Link>

      <main className="flex gap-6 p-4 rounded-xl bg-neutral-10">
        <section className="flex-1">
          <div className="flex flex-col p-4 gap-1">
            <Title>{servico?.nome}</Title>
            <p>Valor mínimo: R$ {servico?.valorMinimo}</p>
            <p>
              {servico?.orcamentoIsAberto
                ? "Orcamento aberto"
                : "Orcamento fechado"}
            </p>
          </div>

          <div className="p-4 mt-4 rounded-2xl bg-white/90">
            <Title className="mt-4">Descrição</Title>
            <p className="my-6">{servico?.descricao}</p>
          </div>
        </section>

        <section className="flex-1">
          <Link
            to={clientePaths.perfilClienteById(servico?.clienteId ?? "")}
            className="flex justify-between items-center w-full"
          >
            <Title>Cliente: {cliente?.nome}</Title>
            <ProfilePhoto
              photoPath={cliente?.fotoPerfilUrl}
              className="w-fit!"
              imgClassName="h-30! w-30!"
            />
          </Link>

          <hr className="m-4 text-neutral-40" />

          <div>
            <div className="flex items-center gap-2 my-2">
              <p>Categoria</p>
              <span className="flex-1 border-t-2 border-dashed" />
              <p>{"AAAAA"}</p>
            </div>

            <div className="flex items-center gap-2 my-2">
              <p>Prazo</p>
              <span className="flex-1 border-t-2 border-dashed" />
              <p>{servico?.prazo}</p>
            </div>
          </div>

          <Link to={freelancerPaths.cadastrarPropostaById(servico?.id ?? "")}>
            <Button>Enviar Proposta</Button>
          </Link>
        </section>
      </main>
    </div>
  );
};
