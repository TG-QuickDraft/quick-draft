import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { GoPlus } from "react-icons/go";
import { PiEmpty } from "react-icons/pi";
import { LuSave, LuPencil } from "react-icons/lu";
import { MdCancel } from "react-icons/md";

import MarkdownToggleButton from "./MarkdownToggleButton";
import Button from "@/shared/components/ui/buttons/Button";

import TextareaAutosize from "react-textarea-autosize";
import { atualizarFreelancer } from "../api/freelancer.api";
import type { AtualizarFreelancerDTO } from "../dtos/freelancer/AtualizarFreelancerDTO";
import { useModal } from "@/shared/contexts/modal.context";
import { useState, useEffect } from "react";

export const MarkdownPanel = ({
  isEditable = true,
  titleToSave,
  defaultDescription,
  onUpdate,
}: {
  isEditable: boolean;
  titleToSave: string;
  defaultDescription: string;
  onUpdate?: (newDescription: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [description, setDescription] = useState(defaultDescription);

  const { showSuccess, showError } = useModal();

  useEffect(() => {
    if (!isEditing) {
      setDescription(defaultDescription);
    }
  }, [defaultDescription, isEditing]);

  const handleUpdateDescription = async () => {
    try {
      await atualizarFreelancer({
        titulo: titleToSave,
        descricaoPerfil: description,
      } as AtualizarFreelancerDTO);

      showSuccess({
        content: "Descrição salva com sucesso!",
        onClose: () => {
          setIsEditing(false);
          setActiveTab("write");
          if (onUpdate) onUpdate(description);
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        showError({ content: error.message });
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setActiveTab("write");
    setDescription(defaultDescription);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Descrição</h2>
        {isEditable && (
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  reversed
                  className="min-w-30"
                  variant="secondary"
                  onClick={handleCancel}
                  icon={<MdCancel />}
                >
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  className="min-w-30"
                  onClick={handleUpdateDescription}
                  icon={<LuSave />}
                >
                  Salvar
                </Button>
              </>
            ) : (
              <Button
                className="min-w-30"
                onClick={() => {
                  setIsEditing(true);
                  setActiveTab("write");
                }}
                icon={description ? <LuPencil /> : <GoPlus />}
              >
                {description ? "Editar Descrição" : "Adicionar Descrição"}
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="rounded-lg overflow-hidden border border-neutral-20 bg-white">
        {isEditable && isEditing && (
          <div
            className={clsx(
              "flex w-full overflow-hidden",
              "bg-primary-100 text-white backdrop-blur-sm",
            )}
          >
            <MarkdownToggleButton
              active={activeTab === "write"}
              onClick={() => setActiveTab("write")}
            >
              Escrita
            </MarkdownToggleButton>

            <MarkdownToggleButton
              active={activeTab === "preview"}
              onClick={() => setActiveTab("preview")}
            >
              Visualização
            </MarkdownToggleButton>
          </div>
        )}

        <div className="flex flex-col w-full p-4 min-h-56">
          {isEditing && activeTab === "write" ? (
            <div
              className={clsx(
                "relative rounded-lg focus-within:ring-2 focus-within:ring-secondary-100 ",
                "transition-all p-1",
              )}
            >
              <TextareaAutosize
                className={clsx(
                  "relative w-full bg-transparent resize-none outline-none",
                  "z-10 text-neutral-900 placeholder:text-neutral-400 ",
                )}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva sua descrição aqui usando Markdown..."
                minRows={10}
                maxRows={30}
                autoFocus
              />
            </div>
          ) : (
            <>
              {description ? (
                <div className="prose max-w-none w-full">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              ) : (
                <div
                  className={clsx(
                    "flex flex-col gap-2 flex-1 justify-center items-center h-full",
                    "font-semibold text-xl text-neutral-400",
                  )}
                >
                  <span>Nenhuma descrição adicionada</span>
                  <PiEmpty size={30} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
