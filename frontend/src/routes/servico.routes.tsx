import { CadastrarServico } from "@/pages/cadastros/CadastrarServico";
import PesquisaServico from "@/pages/pesquisas/PesquisaServicos";
import { VisualizarServico } from "@/pages/VisualizarServico";

export const servicoRoutes = [
  { path: "/pesquisaServico", element: <PesquisaServico /> },
  { path: "/visualizarServico/:id", element: <VisualizarServico /> },
  { path: "/cadastrarServico", element: <CadastrarServico /> },
];
