import PesquisaFreelancer from "@/pages/pesquisas/PesquisaFreelancer";
import { PerfilFreelancer } from "@/pages/perfis/PerfilFreelancer";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer />, private: false},
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer />, private: false },
];
