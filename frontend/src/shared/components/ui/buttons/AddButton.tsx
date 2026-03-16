import clsx from "clsx";
import { GoPlus } from "react-icons/go";

interface AddButtonProps {
  onClick?: () => void;
  className?: string;
}

export const AddButton = ({ onClick, className }: AddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-14 h-14 flex items-center justify-center border ",
        "border-gray-400 rounded-full hover:bg-gray-100 ",
        "transition cursor-pointer hover:scale-105 active:scale-95",
        className,
      )}
      aria-label="Adicionar"
    >
      <GoPlus size={28} />
    </button>
  );
};
