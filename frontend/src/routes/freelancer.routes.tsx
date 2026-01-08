import PesquisaFreelancer from "@/pages/pesquisas/PesquisaFreelancer";
import { PerfilFreelancer } from "@/pages/perfis/PerfilFreelancer";
import { CadastrarProjetoFreelancer } from "@/pages/cadastros/CadastrarProjetoFreelancer";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer /> },
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer /> },
  { path: "/cadastrarProjetoFreelancer", element: <CadastrarProjetoFreelancer/> }
];
