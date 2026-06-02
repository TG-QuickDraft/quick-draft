import { useMutation } from "@tanstack/react-query";
import { atualizarProposta, criarProposta } from "../api/proposta.api";
import type { AtualizarPropostaDTO } from "../dtos/AtualizarPropostaDTO";

export const useCreateProposal = () => {
  return useMutation({ mutationFn: criarProposta });
};

export const useUpdateProposal = () => {
  return useMutation({
    mutationFn: ({
      proposalId,
      proposalBody,
    }: {
      proposalId: number;
      proposalBody: AtualizarPropostaDTO;
    }) => atualizarProposta({ proposalId, proposalBody }),
  });
};
