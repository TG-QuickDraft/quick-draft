import clsx from "clsx";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/components/ui/buttons/Button";
import { useModal } from "@/shared/contexts/modal.context";

import { LuSave } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";

export const MarkdownPanel = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [text, setText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const { showSuccess } = useModal();

  const handleSave = () => {
    setIsEditing(false);
    showSuccess({ content: "Descrição salva com sucesso!" });
  };

  return (
    <>
      <div className="bg-gray-50 rounded-xl border border-neutral-20 w-full">
        <div
          className={clsx(
            "flex w-full rounded-t-xl overflow-hidden",
            "bg-neutral-10",
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
        <div className="prose p-4 w-full">
          {mode === "edit" ? (
            <textarea
              className="w-full h-full min-h-62.5 bg-transparent resize-none outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escreva sua descrição aqui..."
              disabled={!isEditing}
            >
              {text}
            </textarea>
          ) : (
            <div className="min-h-62.5">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 flex gap-3 justify-end">
        {isEditing ? (
          <Button variant="secondary" onClick={handleSave} icon={<LuSave />}>
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

const MarkdownToggleButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "p-1.25 border-b-3 border-transparent max-w-25 w-full cursor-pointer",
        active && "border-b-3 border-b-primary-100!",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
