export const freelancerPaths = {
  pesquisaFreelancer: "/pesquisa-freelancer",
  perfilFreelancer: "/perfil-freelancer",
  cadastrarProjetoFreelancer: "/cadastrar-projeto-freelancer",
  cadastrarContaBancaria: "/cadastrar-conta-bancaria",
  visualizarProposta: "/proposal/view",
  cadastrarProposta: "/servico/:serviceId/proposta/nova",

  cadastrarPropostaById: (servicoId: string | number) =>
    `/servico/${servicoId}/proposta/nova`,
  perfilFreelancerById: (id: string | number) => `/perfil-freelancer/${id}`,
};
