import clsx from "clsx";
import { formatUrl } from "@/shared/utils/url.utils";
import { LuPencil } from "react-icons/lu";

type Props = {
  img?: string;
  url?: string;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
};

const ProposalCards = ({ img, editable, onEdit, url, className }: Props) => {
  return (
    <div className={clsx("relative group", className)}>
      <a
        href={formatUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className={clsx(
            "aspect-square bg-gray-400 rounded-xl border border-gray-200",
            "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg overflow-hidden cursor-pointer",
            "active:scale-[0.98]",
          )}
        >
          {img && (
            <img
              src={img}
              alt="Imagem da proposta"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </a>

      {editable && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit?.();
          }}
          type="button"
          title="Editar proposta"
          className={clsx(
            "absolute flex justify-center items-center right-3 top-3",
            "w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-sm",
            "text-gray-600 transition-all duration-200",
            "hover:bg-white hover:text-gray-900 hover:shadow-md hover:scale-105",
            "active:scale-95 cursor-pointer",
          )}
        >
          <LuPencil size={18} />
        </button>
      )}
    </div>
  );
};

export default ProposalCards;
