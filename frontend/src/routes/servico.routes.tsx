import { CadastrarServico } from "../pages/CadastrarServico";
import PesquisaServico from "../pages/PesquisaServicos";
import { VisualizarServico } from "../pages/VisualizarServico";

export const servicoRoutes = [
  { path: "/pesquisaServico", element: <PesquisaServico /> },
  { path: "/visualizarServico/:id", element: <VisualizarServico /> },
  { path: "/cadastrarServico", element: <CadastrarServico /> },
];
