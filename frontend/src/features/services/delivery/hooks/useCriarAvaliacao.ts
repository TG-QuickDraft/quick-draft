import { useModal } from "@/shared/contexts/modal.context";
import { useState } from "react";
import { criarAvaliacao } from "../api/avaliacao.api";
import { usuarioPaths } from "@/features/users/routes/usuarioPaths";

export const useCriarAvaliacao = () => {
  const [loading, setLoading] = useState(false);

  const { showSuccess, showError } = useModal();

  const enviarAvaliacao = async (
    servicoId: number,
    rating: number,
    comentario?: string
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
        redirect: usuarioPaths.minhaConta,
      });
    } catch {
      showError({
        content: "Erro ao enviar avaliação. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    enviarAvaliacao,
    loading,
  };
};