import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "../components/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Title from "../components/Title";

import { PiEmptyLight } from "react-icons/pi";
import { consultarServicos } from "../api/servico.api";
import type { Servico } from "../domain/models/Servico";

export function PesquisaServico() {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarServicos();

      if (dados !== undefined) {
        setServicos(dados);
      }
    };

    obterDados();
  }, []);

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <Title className="pb-8">Minha tabela de serviços</Title>

      {servicos.length === 0 ? (
        <PiEmptyLight size={30} />
      ) : (
        <table className="w-1/2 text-center shadow-2xl">
          <thead>
            <tr className="bg-white text-black">
              <th className="p-3">Id</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Descrição</th>
              <th className="p-3">Ir para Serviço</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico, index) => (
              <tr
                key={index}
                className="border border-gray-500 hover:bg-gray-500/5"
              >
                <td className="p-3">{servico.id}</td>
                <td className="p-3">{servico.nome}</td>
                <td className="p-3">{servico.descricao}</td>
                <td className="p-3">
                  <Link to={`/visualizarServico/${servico.id}`}>
                    <Button>Ver Serviço</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="py-8">
        <Link to={"/"}>
          <Button icon={<MdKeyboardDoubleArrowLeft size={30} />}>
            Ir para Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PesquisaServico;
