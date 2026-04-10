import { useCallback, useEffect, useState } from "react";

type UsePaginationOptions = {
  paginaInicial?: number;
  totalPaginas?: number;
};

export const usePagination = ({
  paginaInicial: initialPage = 1,
  totalPaginas: totalPaginas,
}: UsePaginationOptions = {}) => {
  const [pagina, setPagina] = useState(initialPage);

  const onPageChange = useCallback(
    (novaPagina: number) => {
      setPagina(() => {
        if (novaPagina < 1) {
          return 1;
        }

        if (totalPaginas && novaPagina > totalPaginas) {
          return totalPaginas;
        }

        return novaPagina;
      });
    },
    [totalPaginas],
  );

  useEffect(() => {
    if (!totalPaginas) {
      return;
    }

    setPagina((p) => Math.min(p, totalPaginas));
  }, [totalPaginas]);

  return {
    pagina: pagina,
    setPage: setPagina,
    onPageChange,
  };
};
