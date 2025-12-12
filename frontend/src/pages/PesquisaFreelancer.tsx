import { useEffect, useState } from "react";
import type { Freelancer } from "../models/Freelancer";
import { consultarFreelancers } from "../api/freelancerApi";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Title from "../components/Title";

import { PiEmptyLight } from "react-icons/pi";

const PATH = `${import.meta.env.VITE_API_URL}`;

export function PesquisaFreelancer() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarFreelancers();

      if (dados !== undefined) {
        setFreelancers(dados);
      }
    };

    obterDados();
  }, []);

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <Title className="pb-8">Minha tabela de freelancers</Title>

      {freelancers.length === 0 ? (
        <PiEmptyLight size={30} />
      ) : (
        <table className="w-1/2 text-center shadow-2xl">
          <thead>
            <tr className="bg-white text-black">
              <th className="p-3">Id</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Foto de Perfil</th>
              <th className="p-3">Ir para Perfil</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((freelancer, index) => (
              <tr
                key={index}
                className="border border-gray-500 hover:bg-gray-500/5"
              >
                <td className="p-3">{freelancer.id}</td>
                <td className="p-3">{freelancer.nome}</td>
                <td className="p-3">
                  <img
                    src={PATH + freelancer.fotoPerfilUrl?.slice(1)}
                    className="h-11 rounded-full inline-block"
                  />
                </td>
                <td className="p-3">
                  <Link to={`/perfilFreelancer/${freelancer.id}`}>
                    <Button>Ver Perfil</Button>
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

export default PesquisaFreelancer;
