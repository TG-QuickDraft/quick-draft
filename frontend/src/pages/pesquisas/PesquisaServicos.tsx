import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "@/components/common/ui/Button";
import Title from "@/components/common/ui/Title";

import { PiEmptyLight } from "react-icons/pi";
import { consultarServicos } from "@/api/servico.api";
import type { Servico } from "@/domain/models/Servico";
import Input from "@/components/common/ui/Inputs/Input";
import { GoSearch } from "react-icons/go";
import type { FiltroServicoDTO } from "@/dtos/servico/FiltroServicoDTO";

export function PesquisaServico() {
  const [filtroNome, setFiltroNome] = useState("");

  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarServicos({});

      if (dados !== undefined) {
        setServicos(dados);
      }
    };

    obterDados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filtro: FiltroServicoDTO = {
      nome: filtroNome,
    };

    const dados = await consultarServicos(filtro);

    if (dados !== undefined) {
      setServicos(dados);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center">
      <Title className="pb-8">Minha tabela de serviços</Title>

      <form onSubmit={handleSubmit}>
        <Input
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          placeholder="Pesquisa"
        />
        <div className="flex justify-center my-8">
          <Button icon={<GoSearch size={30} />} type="submit">
            Buscar
          </Button>
        </div>
      </form>

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
