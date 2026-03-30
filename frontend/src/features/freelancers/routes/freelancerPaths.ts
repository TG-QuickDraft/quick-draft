export const freelancerPaths = {
  pesquisaFreelancer: "/pesquisa-freelancer",
  perfilFreelancer: "/perfil-freelancer",
  cadastrarProjetoFreelancer: "/cadastrar-projeto-freelancer",
  cadastrarContaBancaria: "/cadastrar-conta-bancaria",
  visualizarProposta: "/proposta/visualizar",
  cadastrarProposta: "/servico/:serviceId/proposta/nova",
  verProposta: "/ver-proposta",

  cadastrarPropostaById: (servicoId: string | number) =>
    `/servico/${servicoId}/proposta/nova`,
  perfilFreelancerById: (id: string | number) => `/perfil-freelancer/${id}`,
  verPropostaById: (id: string | number) => `/ver-proposta/${id}`,
};
