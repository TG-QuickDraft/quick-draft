import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  atualizarFreelancer,
  consultarFreelancerPorId,
} from "@/features/freelancers/api/freelancer.api";
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
import { useModal } from "@/shared/contexts/modal.context";
import { LOADING_TIMEOUT } from "@/shared/utils/loadingTimeout";
import type { AtualizarFreelancerDTO } from "../dtos/freelancer/AtualizarFreelancerDTO";
import clsx from "clsx";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PerfilFreelancer = () => {
  const { id } = useParams();
  const { usuario } = useAuth();

  const [freelancer, setFreelancer] = useState<FreelancerDTO | null>(null);
  const [projetos, setProjetos] = useState<ProjetoFreelancerDTO[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { showSuccess, showError } = useModal();

  const [mode, setMode] = useState<"edit" | "preview">("preview");

  useEffect(() => {
    const fetchData = async () => {
      let timer = setTimeout(() => setIsLoading(true), LOADING_TIMEOUT);
      try {
        const [freelancerData, projetosData] = await Promise.all([
          consultarFreelancerPorId(Number(id)),
          consultarProjetosFreelancerPorIdFreelancer(Number(id)),
        ]);

        setFreelancer(freelancerData);
        setTitle(freelancerData.titulo);
        setDescription(freelancerData.descricaoPerfil);
        setProjetos(projetosData);
      } catch (error) {
        console.error(error);
      } finally {
        clearTimeout(timer);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!freelancer || !usuario) return null;
  if (isLoading) return <Spinner />;

  const handleSaveUpdate = async () => {
    try {
      await atualizarFreelancer({
        titulo: title,
        descricaoPerfil: description,
      } as AtualizarFreelancerDTO);
      showSuccess({
        content: "Descrição salva com sucesso!",
        onClose: () => {
          setMode("preview");
          setIsEditing(false);
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  const bannerStyle = gerarBannerPerfil(freelancer.nome);
  const isEditable = freelancer.id === usuario.id;

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
                  <h1 className="text-3xl font-bold">{freelancer.nome}</h1>

                  {title && (
                    <p className="text-[20px] text-gray-600">{title}</p>
                  )}
                </div>

                <StarRating readonly rating={4.2} />
              </div>

              <div
                className={clsx(
                  "h-32 w-32 rounded-full overflow-hidden shrink-0 -mt-16 z-10 ",
                  "border-4 border-white bg-white shadow-lg",
                )}
              >
                <ProfilePhoto
                  photoPath={freelancer.fotoPerfilUrl}
                  size="lg"
                  className="w-full! h-full!"
                  imgClassName="!w-full !h-full object-cover"
                />
              </div>
            </div>

            {(isEditable || description) && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Descrição</h2>

                <MarkdownPanel
                  setDescription={setDescription}
                  onSave={handleSaveUpdate}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  mode={mode}
                  setMode={setMode}
                  description={description}
                  isEditable={isEditable}
                />
              </div>
            )}

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
