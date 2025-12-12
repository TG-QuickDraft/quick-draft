import PesquisaFreelancer from "../pages/PesquisaFreelancer";
import { CadastrarFreelancer } from "../pages/CadastrarFreelancer";
import { PerfilFreelancer } from "../pages/PerfilFreelancer";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer /> },
  { path: "/cadastrarFreelancer", element: <CadastrarFreelancer /> },
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer /> },
];
