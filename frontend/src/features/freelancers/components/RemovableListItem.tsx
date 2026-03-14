import { clsx } from "clsx";
import { FiX } from "react-icons/fi";

interface RemovableListItemProps {
  item: string;
  index: number;
  onDelete: (index: number) => void;
}

export const RemovableListItem = ({
  item,
  index,
  onDelete,
}: RemovableListItemProps) => {
  return (
    <li className="flex items-center gap-3">
      <span
        className={clsx(
          "flex justify-between items-center p-3 text-neutral-80 border-y border-neutral-20",
          "flex-1",
        )}
      >
        {item}
        <button
          onClick={() => onDelete(index)}
          className={clsx(
            "active:scale-90 transition duration-200 cursor-pointer border-l border-neutral-20",
            "flex justify-center items-center text-red-400 hover:text-red-600",
            "pl-3",
          )}
          aria-label="Remover item"
        >
          <FiX size={24} />
        </button>
      </span>
    </li>
  );
};
