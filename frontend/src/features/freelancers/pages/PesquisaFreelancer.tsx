import { useEffect, useState } from "react";
import type { Freelancer } from "@/features/freelancers/dtos/freelancer/Freelancer";
import { consultarFreelancers } from "@/features/freelancers/api/freelancer.api";
import { Link } from "react-router-dom";

import Button from "@/shared/components/ui/Button";
import Title from "@/shared/components/ui/Title";

import { PiEmptyLight } from "react-icons/pi";
import StarRating from "@/shared/components/ui/StarRating";

import { MockProfile } from "@/shared/assets";

import { useSearchParams } from "react-router-dom";
import type { PagedResult } from "@/shared/types/PagedResult";
import { usePagination } from "@/shared/hooks/usePagination";
import { SeletorPaginas } from "@/shared/components/ui/SeletorPaginas";

export function PesquisaFreelancer() {
  const TABLE_SPACING = "p-3";
  const [freelancers, setFreelancers] = useState<PagedResult<Freelancer>>();
  const [searchParams] = useSearchParams();

  const { pagina: pagina, onPageChange } = usePagination({
    totalPaginas: freelancers?.totalPaginas,
  });

  useEffect(() => {
    const nomeUrl = searchParams.get("nome") || "";

    const obterDados = async () => {
      setFreelancers(await consultarFreelancers(nomeUrl, pagina, 10));
    };

    obterDados();
  }, [pagina, searchParams]);

  return (
    <div className="flex flex-1 flex-col items-center gap-8 h-full justify-center">
      <Title>Minha tabela de freelancers</Title>

      {!freelancers ? (
        <PiEmptyLight size={30} />
      ) : (
        <table className="w-1/2 text-center shadow-2xl">
          <thead>
            <tr className="bg-white text-black">
              <th className={TABLE_SPACING}>Id</th>
              <th className={TABLE_SPACING}>Nome</th>
              <th className={TABLE_SPACING}>Foto de Perfil</th>
              <th className={TABLE_SPACING}>Avaliação</th>
              <th className={TABLE_SPACING}>Ir para Perfil</th>
            </tr>
          </thead>
          <tbody>
            {freelancers.itens.map((freelancer, index) => (
              <tr
                key={index}
                className="border border-gray-500/20 hover:bg-gray-500/5"
              >
                <td className={TABLE_SPACING}>{freelancer.id}</td>
                <td className={TABLE_SPACING}>{freelancer.nome}</td>
                <td className={TABLE_SPACING}>
                  <img
                    src={
                      freelancer?.fotoPerfilUrl
                        ? freelancer.fotoPerfilUrl
                        : MockProfile
                    }
                    className="h-11 w-11 rounded-full inline-block object-cover"
                  />
                </td>
                <td className={TABLE_SPACING}>
                  <StarRating rating={4.2} />
                </td>
                <td className={TABLE_SPACING}>
                  <Link to={`/perfilFreelancer/${freelancer.id}`}>
                    <Button>Ver Perfil</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <SeletorPaginas
        pagina={pagina}
        totalPaginas={freelancers?.totalPaginas || 1}
        onPaginaChange={onPageChange}
      />
    </div>
  );
}

export default PesquisaFreelancer;
