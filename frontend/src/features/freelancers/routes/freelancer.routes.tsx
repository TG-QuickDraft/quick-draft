import PesquisaFreelancer from "@/features/freelancers/pages/PesquisaFreelancer";
import { PerfilFreelancer } from "@/features/freelancers/pages/PerfilFreelancer";
import { CadastrarProjetoFreelancer } from "@/features/freelancers/pages/CadastrarProjetoFreelancer";
import { CadastrarContaBancaria } from "@/features/finance/pages/CadastrarContaBancaria";
import VisualizarProposta from "../pages/proposal/VisualizarProposta";
import CadastroProposta from "../pages/proposal/CadastrarProposta";

export const freelancerRoutes = [
  { path: "/pesquisaFreelancer", element: <PesquisaFreelancer /> },
  { path: "/perfilFreelancer/:id", element: <PerfilFreelancer /> },
  {
    path: "/cadastrarProjetoFreelancer",
    element: <CadastrarProjetoFreelancer />,
  },
  { path: "/cadastrarContaBancaria", element: <CadastrarContaBancaria /> },
  { path: "/proposal/view", element: <VisualizarProposta /> },
  { path: "/proposal/new", element: <CadastroProposta /> },
];
