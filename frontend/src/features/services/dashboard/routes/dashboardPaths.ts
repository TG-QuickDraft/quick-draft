export const dashboardServicoPaths = {
  meuServico: "/meu-servico",
  verMinhaProposta: "/ver-minha-proposta",

  visualizarMeuServicoById: (id: string | number) => `/meu-servico/${id}`,
  verMinhaPropostaById: (id: string | number) => `/ver-minha-proposta/${id}`,
};
