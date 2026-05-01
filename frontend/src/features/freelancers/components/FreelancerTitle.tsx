import clsx from "clsx";

import { GoPlus } from "react-icons/go";
import { LuPencil } from "react-icons/lu";
import { atualizarFreelancer } from "../api/freelancer.api";
import { useEffect, useState } from "react";
import type { AtualizarFreelancerDTO } from "../dtos/freelancer/AtualizarFreelancerDTO";
import { useModal } from "@/shared/contexts/modal.context";

const FreelancerTitle = ({
  isEditable = true,
  defaultTitle,
  descriptionToSave,
  onUpdate,
}: {
  isEditable: boolean;
  defaultTitle: string;
  descriptionToSave: string;
  onUpdate?: (newDescription: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  const { showError, showSuccess } = useModal();

  useEffect(() => {
    if (!isEditing) {
      setTitle(defaultTitle);
    }
  }, [defaultTitle, isEditing]);

  const handleEditTitleClick = () => {
    setTitle(title || "");
    setIsEditing(true);
  };

  const handleSaveTitleClick = async () => {
    if (title.trim() === "") return;
    try {
      await atualizarFreelancer({
        titulo: title,
        descricaoPerfil: descriptionToSave,
      } as AtualizarFreelancerDTO);

      setTitle(title);
      setIsEditing(false);
      showSuccess({ content: "Título salvo com sucesso!" });
      if (onUpdate) onUpdate(title);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  return (
    <div className="flex items-center gap-3 mt-1 h-8">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Designer de logos"
            className={clsx(
              "w-full max-w-sm border-b-2 border-neutral-40 bg-transparent p-1 ",
              "text-[18px] text-neutral-80 outline-none transition-colors ",
              "focus:border-primary-700",
            )}
            autoFocus
          />
          <button
            onClick={handleSaveTitleClick}
            className={clsx(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full ",
              "bg-secondary-100/20 text-neutral-80 transition-colors",
              "hover:cursor-pointer hover:bg-secondary-100/60",
            )}
            title="Salvar título"
          >
            <GoPlus size={20} />
          </button>
        </>
      ) : (
        <>
          {title ? (
            <p className="text-[20px] text-neutral-80">{title}</p>
          ) : (
            isEditable && (
              <p className="text-[18px] text-neutral-60 italic">
                Adicionar título...
              </p>
            )
          )}

          {isEditable && (
            <button
              onClick={handleEditTitleClick}
              className={clsx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "text-neutral-80 transition-colors hover:bg-secondary-100/60",
                "hover:cursor-pointer",
              )}
              title={title ? "Editar título" : "Adicionar título"}
            >
              {title ? <LuPencil size={18} /> : <GoPlus size={20} />}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FreelancerTitle;
