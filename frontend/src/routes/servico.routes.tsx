import { CadastrarServico } from "@/pages/cadastros/CadastrarServico";
import PesquisaServico from "@/pages/pesquisas/PesquisaServicos";
import { VisualizarServico } from "@/pages/VisualizarServico";

export const servicoRoutes = [
  { path: "/pesquisaServico", element: <PesquisaServico />, private: false },
  {
    path: "/visualizarServico/:id",
    element: <VisualizarServico />,
    private: false,
  },
  { path: "/cadastrarServico", element: <CadastrarServico />, private: true },
];
