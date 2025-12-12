import { useParams } from "react-router-dom";
import { consultarFreelancerPorId } from "../../api/freelancerApi";
import type { Freelancer } from "../../models/Freelancer";
import { useEffect, useState } from "react";

import Title from "../../components/Title";

const PATH = `${import.meta.env.VITE_API_URL}`;

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
            className="rounded-full shadow-xl"
            src={
              freelancer?.fotoPerfilUrl
                ? PATH + freelancer.fotoPerfilUrl.slice(1)
                : ""
            }
            height={200}
          />
        ) : (
          <div className="bg-black w-50 h-50 rounded-full" />
        )}
      </div>
    </div>
  );
};
