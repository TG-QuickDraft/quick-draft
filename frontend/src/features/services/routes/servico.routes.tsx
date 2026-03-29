import { RequireRole } from "@/features/auth/components/RequireRole";
import { CadastrarServico } from "@/features/services/pages/CadastrarServico";
import PesquisaServico from "@/features/services/pages/PesquisaServicos";
import { VisualizarServico } from "@/features/services/pages/VisualizarServico";
import { MeuServico } from "@/features/services/pages/MeuServico";
import { servicoPaths } from "@/features/services/routes/servicoPaths";

export const servicoRoutes = [
  { path: servicoPaths.pesquisaServico, element: <PesquisaServico /> },

  {
    path: `${servicoPaths.visualizarServico}/:id`,
    element: <VisualizarServico />,
  },

  {
    path: `${servicoPaths.meuServico}/:id`,
    element: <MeuServico />,
  },

  {
    path: servicoPaths.cadastrarServico,
    element: (
      <RequireRole roles={["Cliente"]}>
        <CadastrarServico />
      </RequireRole>
    ),
  },
];
