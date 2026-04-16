import PesquisaFreelancer from "@/features/freelancers/pages/PesquisaFreelancer";
import { PerfilFreelancer } from "@/features/freelancers/pages/PerfilFreelancer";
import { CadastrarProjetoFreelancer } from "@/features/freelancers/pages/CadastrarProjetoFreelancer";
import { CadastrarContaBancaria } from "@/features/finance/pages/CadastrarContaBancaria";

import { freelancerPaths } from "@/features/freelancers/routes/freelancerPaths";
import VerProposta from "../pages/proposal/VerProposta";
import CadastrarProposta from "../pages/proposal/CadastrarProposta";
import MinhaProposta from "../pages/proposal/MinhaProposta";
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
  { path: `${freelancerPaths.verProposta}/:id`, element: <VerProposta /> },
  {
    path: freelancerPaths.cadastrarProposta,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <CadastrarProposta />
      </RequireRole>
    ),
  },
  {
    path: `${freelancerPaths.verMinhaProposta}/:id`,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <MinhaProposta />
      </RequireRole>
    ),
  },
];
