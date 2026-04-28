import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { consultarFreelancerPorId } from "@/features/freelancers/api/freelancer.api";
import { consultarProjetosFreelancerPorIdFreelancer } from "@/features/freelancers/api/projetoFreelancer.api";

import type { FreelancerDTO } from "@/features/freelancers/dtos/freelancer/FreelancerDTO";
import type { ProjetoFreelancerDTO } from "@/features/freelancers/dtos/projetoFreelancer/ProjetoFreelancerDTO";

import { BackButton } from "@/shared/components/ui/buttons/BackButton";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";
import StarRating from "@/shared/components/ui/StarRating";
import { MarkdownPanel } from "@/features/freelancers/components/MarkdownPanel";
import ProposalCards from "@/features/services/proposal/components/ProposalCards";
import { gerarBannerPerfil } from "@/shared/utils/getGerarBannerPerfil";

import Spinner from "@/shared/components/ui/Spinner";

export const PerfilFreelancer = () => {
  const { id } = useParams();

  const [freelancer, setFreelancer] = useState<FreelancerDTO | null>(null);
  const [projetos, setProjetos] = useState<ProjetoFreelancerDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [freelancerData, projetosData] = await Promise.all([
          consultarFreelancerPorId(Number(id)),
          consultarProjetosFreelancerPorIdFreelancer(Number(id)),
        ]);

        setFreelancer(freelancerData);
        ("");
        setProjetos(projetosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const bannerStyle = gerarBannerPerfil(freelancer?.nome);

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <div className="w-full max-w-6xl">
        <BackButton>Voltar</BackButton>

        <div className="rounded-2xl shadow-md mt-4 border border-gray-100 overflow-hidden">
          <div className="h-32 w-full" style={bannerStyle} />

          <div className="p-8">
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div className="flex gap-5 items-center flex-wrap">
                <div>
                  <h1 className="text-3xl font-bold">
                    {freelancer?.nome || <Spinner />}
                  </h1>

                  <p className="text-[20px] text-gray-600">
                    Design Gráfico / Editor de Vídeo
                  </p>
                </div>

                <StarRating rating={4.2} />
              </div>

              <div className="h-32 w-32 rounded-full overflow-hidden shrink-0 -mt-16 z-10 border-4 border-white bg-white shadow-lg">
                <ProfilePhoto
                  photoPath={freelancer?.fotoPerfilUrl}
                  size="lg"
                  className="w-full! h-full!"
                  imgClassName="!w-full !h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Descrição</h2>

              <MarkdownPanel description={"Test"} />
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Projetos</h2>

              {projetos.length === 0 ? (
                <p className="text-gray-500">Nenhum projeto encontrado.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  {projetos.map((proj) => (
                    <div className="w-full">
                      <ProposalCards
                        key={proj.id}
                        img={proj.imagemUrl}
                        url={proj.link}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
