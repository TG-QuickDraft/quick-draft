import { RequireRole } from "@/features/auth/components/RequireRole";
import { CadastrarServico } from "@/features/services/proposal/pages/CadastrarServico";
import PesquisaServico from "@/features/services/proposal/pages/PesquisaServicos";
import { VisualizarServico } from "@/features/services/proposal/pages/VisualizarServico";
import { proposalPaths } from "./proposalPaths";

export const proposalRoutes = [
  { path: proposalPaths.pesquisaServico, element: <PesquisaServico /> },

  {
    path: `${proposalPaths.visualizarServico}/:id`,
    element: <VisualizarServico />,
  },

  {
    path: proposalPaths.cadastrarServico,
    element: (
      <RequireRole roles={["Cliente"]}>
        <CadastrarServico />
      </RequireRole>
    ),
  },
];
