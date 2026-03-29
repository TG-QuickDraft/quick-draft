export type Servico = {
  id: number;
  nome: string;
  descricao: string;
  orcamentoIsAberto: boolean;
  isEntregue: boolean;
  prazo: string;
  valorMinimo: number;
  clienteId: number;
  propostaAceitaId: number;
};
