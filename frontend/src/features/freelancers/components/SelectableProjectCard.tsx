import clsx from "clsx";

const SelectableProjectCard = ({
  nome,
  imagemUrl,
  onClick,
  active,
}: {
  nome?: string;
  imagemUrl?: string;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group",
        "cursor-pointer h-43 aspect-square hover:-translate-y-1 overflow-hidden",
        "bg-neutral-20 rounded-xl duration-200 transition relative",
        "active:scale-95 border-3 border-transparent",
        active && "border-secondary-100!",
      )}
    >
      <img
        src={imagemUrl}
        alt={nome}
        className={clsx(
          "object-cover w-full h-full transition duration-200",
          "group-hover:scale-110",
          "select-none",
        )}
        draggable={false}
      />
      <div
        className={clsx(
          "absolute inset-0 bg-black/20 backdrop-blur-sm",
          "transition-opacity duration-200 ease-in-out pointer-events-none",
          active && "opacity-0",
        )}
      ></div>
      <span
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full",
          "text-white text-xl font-bold text-center",
          "transition-opacity duration-200 pointer-events-none",
          active ? "opacity-0" : "opacity-100",
        )}
      >
        {nome}
      </span>
    </button>
  );
};

export default SelectableProjectCard;
