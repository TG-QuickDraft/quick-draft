import { useMutation } from "@tanstack/react-query";
import { criarProposta } from "../api/proposta.api";

export const useCreateProposal = () => {
  return useMutation({ mutationFn: criarProposta });
};
