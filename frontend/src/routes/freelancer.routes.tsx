import PesquisaFreelancer from "../pages/PesquisaFreelancer/PesquisaFreelancer";
import { CadastrarFreelancer } from "../pages/CadastrarFreelancer/CadastrarFreelancer";
import { PerfilFreelancer } from "../pages/PerfilFreelancer/PerfilFreelancer";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer /> },
  { path: "/cadastrarFreelancer", element: <CadastrarFreelancer /> },
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer /> },
];
