import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@/components/common/ui/Button";
import Title from "@/components/common/ui/Title";

import { PiEmptyLight } from "react-icons/pi";
import { consultarServicos } from "@/features/services/api/servico.api";
import type { Servico } from "@/features/services/models/Servico";
import type { FiltroServicoDTO } from "@/features/services/dtos/FiltroServicoDTO";

import { useSearchParams } from "react-router-dom";

export function PesquisaServico() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const nomeUrl = searchParams.get("nome") || "";

    const obterDados = async () => {
      const filtro: FiltroServicoDTO = {
        nome: nomeUrl,
      };

      const dados = await consultarServicos(filtro);

      if (dados !== undefined) {
        setServicos(dados);
      }
    };

    obterDados();
  }, [searchParams]);

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center">
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
    </div>
  );
}

export default PesquisaServico;
