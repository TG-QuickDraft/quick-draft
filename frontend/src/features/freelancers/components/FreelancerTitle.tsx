import clsx from "clsx";

import { GoPlus } from "react-icons/go";
import { LuPencil } from "react-icons/lu";

const FreelancerTitle = ({
  isEditing,
  titleInput,
  setTitleInput,
  onSave,
  onEdit,
  title,
  isEditable = true,
}: {
  isEditing: boolean;
  titleInput: string;
  setTitleInput: (value: string) => void;
  onSave: () => void;
  onEdit: () => void;
  title?: string;
  isEditable?: boolean;
}) => {
  return (
    <div className="flex items-center gap-3 mt-1 h-8">
      {isEditing ? (
        <>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Ex: Designer de logos"
            className={clsx(
              "w-full max-w-sm border-b-2 border-neutral-40 bg-transparent p-1 ",
              "text-[18px] text-neutral-80 outline-none transition-colors ",
              "focus:border-primary-700",
            )}
            autoFocus
          />
          <button
            onClick={onSave}
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
              onClick={onEdit}
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
