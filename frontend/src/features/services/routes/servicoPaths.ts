export const servicoPaths = {
  pesquisaServico: "/pesquisa-servico",
  visualizarServico: "/visualizar-servico",
  cadastrarServico: "/cadastrar-servico",
  meuServico: "/meu-servico",

  visualizarServicoById: (id: string | number) => `/visualizar-servico/${id}`,
  visualizarMeuServicoById: (id: string | number) => `/meu-servico/${id}`,
};