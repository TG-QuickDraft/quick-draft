import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { LuSave, LuPencil } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { PiEmpty } from "react-icons/pi";

import MarkdownToggleButton from "./MarkdownToggleButton";
import Button from "@/shared/components/ui/buttons/Button";

import TextareaAutosize from "react-textarea-autosize";
import { atualizarFreelancer } from "../api/freelancer.api";
import type { AtualizarFreelancerDTO } from "../dtos/freelancer/AtualizarFreelancerDTO";
import { useModal } from "@/shared/contexts/modal.context";
import { useState } from "react";

export const MarkdownPanel = ({
  isEditable = true,
  titleToSave,
  defaultDescription,
}: {
  isEditable: boolean;
  titleToSave: string;
  defaultDescription: string;
}) => {
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(defaultDescription);

  const { showSuccess, showError } = useModal();

  const handleUpdateDescription = async () => {
    try {
      await atualizarFreelancer({
        titulo: titleToSave,
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

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-neutral-20">
        {isEditable && (
          <div
            className={clsx(
              "flex w-full overflow-hidden",
              "bg-primary-100 text-white backdrop-blur-sm",
            )}
          >
            <MarkdownToggleButton
              active={mode === "preview"}
              onClick={() => setMode("preview")}
            >
              Visualização
            </MarkdownToggleButton>

            <MarkdownToggleButton
              active={mode === "edit"}
              onClick={() => setMode("edit")}
            >
              Escrita
            </MarkdownToggleButton>
          </div>
        )}

        <div className="flex flex-col w-full p-4 min-h-70">
          {mode === "edit" ? (
            <div
              className={clsx("relative rounded-lg", isEditing && "px-3 py-2")}
            >
              {isEditing && (
                <div
                  className={clsx(
                    "absolute inset-0 animate-pulse rounded-lg border-2 ",
                    "border-secondary-100",
                  )}
                />
              )}
              <TextareaAutosize
                className={clsx(
                  "relative w-full bg-transparent resize-none outline-none ",
                  "disabled:opacity-50 z-10",
                )}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva sua descrição aqui..."
                disabled={!isEditing}
                minRows={10}
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
                    "flex flex-col gap-2 flex-1 justify-center items-center",
                    "font-semibold text-xl",
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

      {isEditable && (
        <div className="flex gap-3 pt-4">
          {isEditing ? (
            <>
              <Button
                reversed
                className="min-w-30!"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setMode("preview");
                }}
                icon={<LuPencil />}
              >
                Cancelar
              </Button>
              <Button
                variant="secondary"
                className="min-w-30!"
                onClick={handleUpdateDescription}
                icon={<LuSave />}
              >
                Salvar
              </Button>
            </>
          ) : (
            <Button
              className="min-w-30!"
              onClick={() => {
                setIsEditing(true);
                setMode("edit");
              }}
              icon={description ? <LuPencil /> : <GoPlus />}
            >
              {description ? "Editar" : "Adicionar Descrição"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
