import { RequireRole } from "@/features/auth/components/RequireRole";
import { CadastrarServico } from "@/features/services/pages/CadastrarServico";
import PesquisaServico from "@/features/services/pages/PesquisaServicos";
import { VisualizarServico } from "@/features/services/pages/VisualizarServico";

export const servicoRoutes = [
  { path: "/pesquisaServico", element: <PesquisaServico /> },
  {
    path: "/visualizarServico/:id",
    element: <VisualizarServico />,
  },
  {
    path: "/cadastrarServico",
    element: (
      <RequireRole roles={["Cliente"]}>
        <CadastrarServico />
      </RequireRole>
    ),
  },
];
