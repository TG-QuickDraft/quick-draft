export interface ProposalRequest {
  valorPorHora: number;
  prazoEntrega: Date;
  valorTotal: number;
  mensagem: string;
  itensPropostos: string;
  taxaSistemaAdicionadaAoTotal: boolean;
  servicoId: number;
  projetosDestacados: ProjetosDestacados[];
}

export interface ProposalResponse {
  id: number;
  valorPorHora: number;
  prazoEntrega: Date;
  valorTotal: number;
  mensagem: string;
  itensPropostos: string;
  taxaSistemaAdicionadaAoTotal: boolean;
  servicoId: number;
  projetosDestacados: ProjetosDestacados[];
}

interface ProjetosDestacados {
  id: number;
  nome: string;
  descricao: string;
  imagemUrl: string;
  link: string;
}
