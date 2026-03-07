import clsx from "clsx";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";

type Props = {
  pagina: number;
  totalPaginas: number;
  onPaginaChange: (novaPagina: number) => void;
};
export const SeletorPaginas = ({
  pagina,
  totalPaginas,
  onPaginaChange,
}: Props) => {
  const btnClasses = clsx(
    "cursor-pointer transition-all duration-200 p-2 rounded-md",
    "hover:scale-110",
    "focus:scale-95 focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
  );

  return (
    <div className="flex justify-end items-center gap-3 mt-4">
      <button
        className={btnClasses}
        disabled={pagina === 1}
        onClick={() => onPaginaChange(pagina - 1)}
      >
        <RxCaretLeft size={28} />
      </button>

      <span className="text-gray-700 font-medium">
        Página {pagina} de {totalPaginas}
      </span>

      <button
        className={btnClasses}
        disabled={pagina === totalPaginas}
        onClick={() => onPaginaChange(pagina + 1)}
      >
        <RxCaretRight size={28} />
      </button>
    </div>
  );
};
