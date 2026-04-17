import { useEffect, useState } from "react";
import type { FreelancerDTO } from "@/features/freelancers/dtos/freelancer/FreelancerDTO";
import { consultarFreelancers } from "@/features/freelancers/api/freelancer.api";
import { useNavigate } from "react-router-dom";

import Title from "@/shared/components/ui/titles/Title";

import { useSearchParams } from "react-router-dom";
import type { PagedResult } from "@/shared/types/PagedResult";
import { usePagination } from "@/shared/hooks/usePagination";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";
import Spinner from "@/shared/components/ui/Spinner";

import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import Card from "@/shared/components/ui/card/Card";
import clsx from "clsx";

import { LOADING_TIMEOUT } from "@/loadingTimeout";

export function PesquisaFreelancer() {
  const navigate = useNavigate();

  const [freelancers, setFreelancers] = useState<PagedResult<FreelancerDTO>>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { pagina: pagina, onPageChange } = usePagination({
    totalPaginas: freelancers?.totalPaginas,
  });

  useEffect(() => {
    const obterDados = async () => {
      let timer = setTimeout(() => setLoading(true), LOADING_TIMEOUT);
      try {
        const nomeUrl = searchParams.get("nome") || "";
        const dados = await consultarFreelancers(nomeUrl, pagina, 10);
        setFreelancers(dados);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    };

    obterDados();
  }, [pagina, searchParams]);

  if (loading) return <Spinner />;

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center gap-1 h-full p-4 ",
        "max-w-300 mx-auto w-full",
      )}
    >
      <div className="self-start">
        <Title>Freelancers</Title>
      </div>

      {freelancers && freelancers.total > 0 && (
        <span className="text-neutral-80 self-start ">
          Resultados encontrados: {freelancers.total}
        </span>
      )}

      <div className="flex flex-col gap-5 flex-1 w-full mt-3">
        {freelancers && freelancers.itens.length === 0 && (
          <p
            className={clsx(
              "flex flex-col justify-center items-center py-25 text-2xl ",
              "text-neutral-80",
            )}
          >
            Nenhum freelancer encontrado
          </p>
        )}
        {freelancers &&
          freelancers.itens.length > 0 &&
          freelancers.itens.map((freelancer) => (
            <Card
              key={freelancer.id}
              showPhoto
              photoPath={freelancer.fotoPerfilUrl}
              title={freelancer.nome}
              subtitle={freelancer.email}
              onClick={() =>
                navigate(freelancerPaths.perfilFreelancerById(freelancer.id))
              }
              btnLabel="Ver Perfil"
            />
          ))}
      </div>

      {freelancers && freelancers.total > 0 && freelancers.totalPaginas > 1 && (
        <SeletorPaginas
          pagina={pagina}
          totalPaginas={freelancers.totalPaginas}
          onPaginaChange={onPageChange}
        />
      )}
    </div>
  );
}

export default PesquisaFreelancer;
