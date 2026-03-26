export const servicoPaths = {
  pesquisaServico: "/pesquisa-servico",
  visualizarServico: "/visualizar-servico",
  cadastrarServico: "/cadastrar-servico",
  chatServico: "chat-servico",

  visualizarServicoById: (id: string | number) => `/visualizar-servico/${id}`,
};
