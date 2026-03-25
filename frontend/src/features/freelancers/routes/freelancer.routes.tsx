import PesquisaFreelancer from "@/features/freelancers/pages/PesquisaFreelancer";
import { PerfilFreelancer } from "@/features/freelancers/pages/PerfilFreelancer";
import { CadastrarProjetoFreelancer } from "@/features/freelancers/pages/CadastrarProjetoFreelancer";
import { CadastrarContaBancaria } from "@/features/finance/pages/CadastrarContaBancaria";

import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import VisualizarProposta from "../pages/proposal/VisualizarProposta";
import CadastrarProposta from "../pages/proposal/CadastrarProposta";
import { RequireRole } from "@/features/auth/components/RequireRole";

export const freelancerRoutes = [
  { path: freelancerPaths.pesquisaFreelancer, element: <PesquisaFreelancer /> },

  {
    path: `${freelancerPaths.perfilFreelancer}/:id`,
    element: <PerfilFreelancer />,
  },

  {
    path: freelancerPaths.cadastrarProjetoFreelancer,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <CadastrarProjetoFreelancer />
      </RequireRole>
    ),
  },
  {
    path: freelancerPaths.cadastrarContaBancaria,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <CadastrarContaBancaria />
      </RequireRole>
    ),
  },
  { path: freelancerPaths.visualizarProposta, element: <VisualizarProposta /> },
  {
    path: freelancerPaths.cadastrarProposta,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <CadastrarProposta />
      </RequireRole>
    ),
  },
];
