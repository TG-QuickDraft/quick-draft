import { useEffect, useState } from "react";
import type { Freelancer } from "@/domain/models/Freelancer";
import { consultarFreelancers } from "@/api/freelancer.api";
import { Link } from "react-router-dom";

import Button from "@/components/common/ui/Button";
import Title from "@/components/common/ui/Title";

import { PiEmptyLight } from "react-icons/pi";
import Input from "@/components/common/ui/Inputs/Input";
import { GoSearch } from "react-icons/go";
import StarRating from "@/components/common/ui/StarRating";

import MockProfile from "@/assets/mock-profile.png";

export function PesquisaFreelancer() {
  const TABLE_SPACING = "p-3";
  const [filtroNome, setFiltroNome] = useState("");
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await consultarFreelancers(filtroNome);

      if (dados !== undefined) {
        setFreelancers(dados);
      }
    };

    obterDados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados = await consultarFreelancers(filtroNome);

    if (dados !== undefined) {
      setFreelancers(dados);
    }
  };

  console.log(freelancers);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 h-full justify-center">
      <Title>Minha tabela de freelancers</Title>

      <form onSubmit={handleSubmit}>
        <Input
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          placeholder="Pesquisa"
        />
        <div className="flex justify-center mt-8">
          <Button icon={<GoSearch size={30} />} type="submit">
            Buscar
          </Button>
        </div>
      </form>

      {freelancers.length === 0 ? (
        <PiEmptyLight size={30} />
      ) : (
        <table className="w-1/2 text-center shadow-2xl">
          <thead>
            <tr className="bg-white text-black">
              <th className={TABLE_SPACING}>Id</th>
              <th className={TABLE_SPACING}>Nome</th>
              <th className={TABLE_SPACING}>Foto de Perfil</th>
              <th className={TABLE_SPACING}>Avaliação</th>
              <th className={TABLE_SPACING}>Ir para Perfil</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.map((freelancer, index) => (
              <tr
                key={index}
                className="border border-gray-500/20 hover:bg-gray-500/5"
              >
                <td className={TABLE_SPACING}>{freelancer.id}</td>
                <td className={TABLE_SPACING}>{freelancer.nome}</td>
                <td className={TABLE_SPACING}>
                  <img
                    src={
                      freelancer?.fotoPerfilUrl
                        ? freelancer.fotoPerfilUrl
                        : MockProfile
                    }
                    className="h-11 w-11 rounded-full inline-block object-cover"
                  />
                </td>
                <td className={TABLE_SPACING}>
                  <StarRating rating={4.2} />
                </td>
                <td className={TABLE_SPACING}>
                  <Link to={`/perfilFreelancer/${freelancer.id}`}>
                    <Button>Ver Perfil</Button>
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

export default PesquisaFreelancer;
