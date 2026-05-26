import type { ProjetosDestacadosDTO } from "./PropostaDTO";

export interface AtualizarPropostaDTO {
  valorPorHora: number;
  prazoEntrega: string;
  valorTotal: number;
  mensagem: string;
  itensPropostos: string;
  taxaSistemaAdicionadaAoTotal: boolean;
  projetosDestacados: ProjetosDestacadosDTO[];
}
