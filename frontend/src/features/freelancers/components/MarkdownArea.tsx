import clsx from "clsx";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export const MarkdownArea = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [text, setText] = useState("");

  return (
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
          Edit
        </MarkdownToggleButton>
        <MarkdownToggleButton
          active={mode === "preview"}
          onClick={() => setMode("preview")}
        >
          Preview
        </MarkdownToggleButton>
      </div>

      <div className="prose p-4 w-full">
        {mode === "edit" ? (
          <textarea
            className="w-full h-full min-h-62.5 bg-transparent resize-none outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva sua descrição aqui..."
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
        "p-1 border-b-3 border-transparent max-w-25 w-full cursor-pointer",
        active && "border-b-3 border-b-primary-100!",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
