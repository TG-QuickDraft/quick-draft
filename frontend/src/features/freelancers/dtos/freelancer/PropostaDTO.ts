export interface CriarPropostaDTO {
  valorPorHora: number;
  prazoEntrega: string;
  valorTotal: number;
  mensagem: string;
  itensPropostos: string;
  taxaSistemaAdicionadaAoTotal: boolean;
  servicoId: number;
  projetosDestacados: ProjetosDestacadosDTO[];
}

export interface PropostaDTO {
  id: number;
  valorPorHora: number;
  prazoEntrega: Date;
  valorTotal: number;
  mensagem: string;
  itensPropostos: string;
  taxaSistemaAdicionadaAoTotal: boolean;
  servicoId: number;
  freelancerId: number;
  projetosDestacados: ProjetosDestacadosDTO[];
}

interface ProjetosDestacadosDTO {
  id: number;
  nome: string;
  descricao: string;
  imagemUrl: string;
  link: string;
}
