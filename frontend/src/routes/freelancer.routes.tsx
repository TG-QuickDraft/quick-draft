import PesquisaFreelancer from "../pages/PesquisaFreelancer";
import { PerfilFreelancer } from "../pages/PerfilFreelancer";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer /> },
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer /> },
];
