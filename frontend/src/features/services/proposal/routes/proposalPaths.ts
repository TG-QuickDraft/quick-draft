export const proposalPaths = {
  pesquisaServico: "/pesquisa-servico",
  visualizarServico: "/visualizar-servico",
  cadastrarServico: "/cadastrar-servico",

  visualizarServicoById: (id: string | number) => `/visualizar-servico/${id}`,
  
  cadastrarProposta: "/servico/:serviceId/proposta/nova",
  verProposta: "/ver-proposta",

  cadastrarPropostaById: (servicoId: string | number) =>
    `/servico/${servicoId}/proposta/nova`,
  verPropostaById: (id: string | number) => `/ver-proposta/${id}`,
};
