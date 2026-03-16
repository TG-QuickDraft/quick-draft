import { Link, useParams } from "react-router-dom";
import { consultarServicoPorId } from "../api/servico.api";

import { useEffect, useState } from "react";

import Title from "@/shared/components/ui/Title";

import Button from "@/shared/components/ui/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import type { Servico } from "../dtos/Servico";
import { clientePaths } from "@/features/clients/routes/clientePaths"
import { servicoPaths } from "@/features/services/routes/servicoPaths"

export const VisualizarServico = () => {
  const { id } = useParams();

  const [servico, setServico] = useState<Servico | null>(null);

  useEffect(() => {
    const obterDados = async () => {
      const data = await consultarServicoPorId(Number(id));

      if (data !== undefined) {
        setServico(data);
      }
    };

    obterDados();
  }, [id]);

  useEffect(() => {
    console.log(servico);
  }, [servico]);

  return (
    <div className="h-full flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Title>Página de Serviço</Title>
        <h3>{servico?.nome}</h3>
        <h4>{servico?.descricao}</h4>
        <h3>
          {servico?.orcamentoIsAberto ? "Orcamento aberto" : "Orcamento fechado"}
        </h3>
        <h4>{servico?.valorMinimo}</h4>
        <h3>{servico?.prazo}</h3>


        {servico?.clienteId && (
        <Link to={clientePaths.perfilClienteById(servico.clienteId)}>
          <Button className="mt-6">Ver Perfil do Cliente</Button>
        </Link>
        )}

        <Link to={servicoPaths.pesquisaServico}>
          <Button
            className="mt-6"
            icon={<MdKeyboardDoubleArrowLeft size={30} />}
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  );
};
