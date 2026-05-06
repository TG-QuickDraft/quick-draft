export type ServicoDTO = {
  id: number;
  nome: string;
  descricao: string;
  orcamentoIsAberto: boolean;
  isEntregue: boolean;
  isPago: boolean;
  prazo: string;
  valorMinimo: number;
  clienteId: number;
  propostaAceitaId: number;
};
