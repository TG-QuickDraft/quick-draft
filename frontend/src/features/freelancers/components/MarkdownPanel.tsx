import { useState } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import { LuSave, LuPencil } from "react-icons/lu";
import MarkdownToggleButton from "./MarkdownToggleButton";
import Button from "@/shared/components/ui/buttons/Button";

import TextareaAutosize from "react-textarea-autosize";

export const MarkdownPanel = ({
  description,
  setDescription,
  onSave,
  isEditing = false,
  setIsEditing,
}: {
  description?: string;
  setDescription: (value: string) => void;
  onSave: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-neutral-20">
        <div
          className={clsx(
            "flex w-full overflow-hidden",
            "bg-primary-100 text-white backdrop-blur-sm",
          )}
        >
          <MarkdownToggleButton
            active={mode === "edit"}
            onClick={() => setMode("edit")}
          >
            Editar
          </MarkdownToggleButton>
          <MarkdownToggleButton
            active={mode === "preview"}
            onClick={() => setMode("preview")}
          >
            Visualizar
          </MarkdownToggleButton>
        </div>

        <div className="w-full p-4 min-h-70">
          {mode === "edit" ? (
            <TextareaAutosize
              className="w-full bg-transparent resize-none outline-none disabled:opacity-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escreva sua descrição aqui..."
              disabled={!isEditing}
              minRows={10}
              maxRows={25}
            />
          ) : (
            <div className="prose max-w-none w-full">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {isEditing ? (
          <Button variant="secondary" onClick={onSave} icon={<LuSave />}>
            Salvar
          </Button>
        ) : (
          <Button
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
    </>
  );
};
