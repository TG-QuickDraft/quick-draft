import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { LuSave, LuPencil } from "react-icons/lu";
import MarkdownToggleButton from "./MarkdownToggleButton";
import Button from "@/shared/components/ui/buttons/Button";

import TextareaAutosize from "react-textarea-autosize";

export const MarkdownPanel = ({
  setDescription,
  onSave,
  isEditing = false,
  setIsEditing,
  mode,
  setMode,
  description,
  isEditable = true,
}: {
  setDescription: (value: string) => void;
  onSave: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  mode: "edit" | "preview";
  setMode: (value: "edit" | "preview") => void;
  description?: string;
  isEditable?: boolean;
}) => {
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

        <div className="w-full p-4 min-h-70">
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
                maxRows={25}
              />
            </div>
          ) : (
            <div className="prose max-w-none w-full">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {isEditable && (
        <div className="flex gap-3 pt-4">
          {isEditing ? (
            <>
              <Button
                reversed
                className="w-30!"
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
                className="w-30!"
                onClick={onSave}
                icon={<LuSave />}
              >
                Salvar
              </Button>
            </>
          ) : (
            <Button
              className="w-30!"
              onClick={() => {
                setIsEditing(true);
                setMode("edit");
              }}
              icon={<LuPencil />}
            >
              Editar
            </Button>
          )}
        </div>
      )}
    </>
  );
};
