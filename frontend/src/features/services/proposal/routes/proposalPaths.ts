export const proposalPaths = {
  pesquisaServico: "/pesquisa-servico",
  visualizarServico: "/visualizar-servico",
  cadastrarServico: "/cadastrar-servico",

  visualizarServicoById: (id: string | number) => `/visualizar-servico/${id}`,

  cadastrarProposta: "/servico/:serviceId/proposta/nova",
  atualizarProposta: "/servico/:serviceId/proposta/:proposalId",

  verProposta: "/ver-proposta",

  atualizarPropostaById: ({
    servicoId,
    propostaId,
  }: {
    servicoId: string | number;
    propostaId: string | number;
  }) => `/servico/${servicoId}/proposta/${propostaId}`,

  cadastrarPropostaById: (servicoId: string | number) =>
    `/servico/${servicoId}/proposta/nova`,

  verPropostaById: (id: string | number) => `/ver-proposta/${id}`,
};
