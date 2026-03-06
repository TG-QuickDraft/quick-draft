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
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={pagina === 1}
        onClick={() => onPaginaChange(pagina - 1)}
      >
        Anterior
      </button>

      <span>
        Página {pagina} de {totalPaginas}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={pagina === totalPaginas}
        onClick={() => onPaginaChange(pagina + 1)}
      >
        Próxima
      </button>
    </div>
  );
};
