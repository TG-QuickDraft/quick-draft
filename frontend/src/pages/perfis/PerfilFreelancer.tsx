import { Link, useParams } from "react-router-dom";
import { consultarFreelancerPorId } from "@/api/freelancer.api";
import type { Freelancer } from "@/domain/models/Freelancer";
import { useEffect, useState } from "react";

import Title from "@/components/common/Title";

import Button from "@/components/common/Button";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export const PerfilFreelancer = () => {
  const { id } = useParams();

  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);

  useEffect(() => {
    const obterDados = async () => {
      const data = await consultarFreelancerPorId(Number(id));

      if (data !== undefined) {
        setFreelancer(data);
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

        <Link to={"/pesquisaFreelancer"}>
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
