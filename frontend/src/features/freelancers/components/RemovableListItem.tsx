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
          "p-3 text-neutral-80 border-b border-neutral-20",
          "flex-1",
        )}
      >
        {item}
      </span>

      <button
        onClick={() => onDelete(index)}
        className={clsx(
          "active:scale-90 transition duration-200 cursor-pointer",
          "flex justify-center items-center text-red-400 hover:text-red-600 p-2",
        )}
        aria-label="Remover item"
      >
        <FiX size={24} />
      </button>
    </li>
  );
};
