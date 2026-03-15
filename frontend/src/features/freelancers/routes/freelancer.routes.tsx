import PesquisaFreelancer from "@/features/freelancers/pages/PesquisaFreelancer";
import { PerfilFreelancer } from "@/features/freelancers/pages/PerfilFreelancer";
import { CadastrarProjetoFreelancer } from "@/features/freelancers/pages/CadastrarProjetoFreelancer";
import { CadastrarContaBancaria } from "@/features/finance/pages/CadastrarContaBancaria";
import PropostaFreelancer from "../pages/PropostaFreelancer";
import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";

export const freelancerRoutes = [
  { path: freelancerPaths.pesquisaFreelancer, element: <PesquisaFreelancer /> },

  {
    path: `${freelancerPaths.perfilFreelancer}/:id`,
    element: <PerfilFreelancer />,
  },

  {
    path: freelancerPaths.cadastrarProjetoFreelancer,
    element: <CadastrarProjetoFreelancer />,
  },

  {
    path: freelancerPaths.cadastrarContaBancaria,
    element: <CadastrarContaBancaria />,
  },

  {
    path: freelancerPaths.propostaFreelancer,
    element: <PropostaFreelancer />,
  },
];
