import { useModal } from "@/shared/contexts/modal.context";
import { useState } from "react";
import { criarAvaliacao } from "../api/avaliacao.api";
import { dashboardServicoPaths } from "../../dashboard/routes/dashboardPaths";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useCriarAvaliacao = () => {
  const [loading, setLoading] = useState(false);

  const { showSuccess, showError } = useModal();
  const { roles } = useAuth();

  const isClient = roles.includes("Cliente");

  const enviarAvaliacao = async (
    servicoId: number,
    rating: number,
    comentario?: string,
  ) => {
    try {
      setLoading(true);

      await criarAvaliacao({
        notaEstrelas: rating,
        comentario,
        servicoId,
      });

      showSuccess({
        content: "Avaliação enviada com sucesso!",
        redirect: isClient
          ? dashboardServicoPaths.visualizarMeuServicoById(servicoId)
          : undefined,
      });
    } catch (error) {
      showError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    enviarAvaliacao,
    loading,
  };
};
