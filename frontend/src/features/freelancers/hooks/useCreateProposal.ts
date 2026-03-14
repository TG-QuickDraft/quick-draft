import { useMutation } from "@tanstack/react-query";
import { createProposal } from "../api/proposal.api";

export const useCreateProposal = () => {
  return useMutation({ mutationFn: createProposal });
};
