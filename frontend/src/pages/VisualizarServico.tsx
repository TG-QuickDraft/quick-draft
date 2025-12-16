import { Link, useParams } from "react-router-dom";
import { consultarServicoPorId } from "../api/servicoApi";

import { useEffect, useState } from "react";

import Title from "../components/Title";

import Button from "../components/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import type { Servico } from "../models/Servico";

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
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Title>Página de Serviço</Title>
        <h3>{servico?.nome}</h3>
        <h4>{servico?.descricao}</h4>

        <Link to={`/perfilCliente/${servico?.clienteId}`}>
          <Button
            className="mt-6"
          >
            Ver Perfil do Cliente
          </Button>
        </Link>

        <Link to={"/pesquisaServico"}>
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
