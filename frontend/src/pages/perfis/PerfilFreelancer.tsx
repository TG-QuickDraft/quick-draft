import { Link, useParams } from "react-router-dom";
import { consultarFreelancerPorId } from "@/api/freelancer.api";
import type { Freelancer } from "@/domain/models/Freelancer";
import { useEffect, useState } from "react";

import Title from "@/components/common/Title";

import Button from "@/components/common/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { TesteMarkdown } from "@/components/common/TesteMarkdown";
import type { ProjetoFreelancer } from "@/domain/models/ProjetoFreelancer";
import { consultarProjetosFreelancerPorIdFreelancer } from "@/api/projetoFreelancer.api";
import { PiEmptyLight } from "react-icons/pi";

export const PerfilFreelancer = () => {
  const { id } = useParams();

  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);

  const [projetosFreelancer, setProjetosFreelancer] = useState<
    ProjetoFreelancer[]
  >([]);

  useEffect(() => {
    const obterDados = async () => {
      const dadosFreelancer = await consultarFreelancerPorId(Number(id));
      const dadosProjetosFreelancer =
        await consultarProjetosFreelancerPorIdFreelancer(Number(id));

      if (dadosFreelancer !== undefined) {
        setFreelancer(dadosFreelancer);
        setProjetosFreelancer(dadosProjetosFreelancer);
      }
    };

    obterDados();
  }, [id]);

  useEffect(() => {
    console.log(freelancer);
  }, [freelancer]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Title>Página de Perfil do Freelancer</Title>
        <h3>{freelancer?.nome}</h3>

        {freelancer?.fotoPerfilUrl ? (
          <img
            className="rounded-full shadow-xl w-50 h-50"
            src={freelancer?.fotoPerfilUrl ? freelancer.fotoPerfilUrl : ""}
            height={200}
          />
        ) : (
          <div className="bg-black w-50 h-50 rounded-full" />
        )}

        {projetosFreelancer.length === 0 ? (
          <PiEmptyLight size={30} />
        ) : (
          <table className="w-1/2 text-center shadow-2xl">
            <thead>
              <tr className="bg-white text-black">
                <th className="p-3">Nome</th>
                <th className="p-3">Descricão</th>
                <th className="p-3">Link</th>
                <th className="p-3">Imagem</th>
              </tr>
            </thead>
            <tbody>
              {projetosFreelancer.map((projeto, index) => (
                <tr
                  key={index}
                  className="border border-gray-500/20 hover:bg-gray-500/5"
                >
                  <td className="p-3">{projeto.nome}</td>
                  <td className="p-3">{projeto.descricao}</td>
                  <td className="p-3">{projeto.link}</td>
                  <td className="p-3">
                    <img
                      src={projeto?.imagemUrl ? projeto.imagemUrl : ""}
                      className="h-11 rounded-full inline-block"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link to={"/pesquisaFreelancer"}>
          <Button
            className="mt-6"
            icon={<MdKeyboardDoubleArrowLeft size={30} />}
          >
            Voltar
          </Button>
        </Link>

        <TesteMarkdown />
      </div>
    </div>
  );
};
