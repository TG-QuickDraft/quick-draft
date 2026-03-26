import { RequireRole } from "@/features/auth/components/RequireRole";
import { CadastrarServico } from "@/features/services/pages/CadastrarServico";
import PesquisaServico from "@/features/services/pages/PesquisaServicos";
import { VisualizarServico } from "@/features/services/pages/VisualizarServico";
import { servicoPaths } from "@/features/services/routes/servicoPaths";
import { ChatServico } from "../pages/ChatServico";

export const servicoRoutes = [
  { path: servicoPaths.pesquisaServico, element: <PesquisaServico /> },
  {
    path: servicoPaths.chatServico,
    element: (
      <RequireRole roles={["Cliente", "Freelancer"]}>
        <ChatServico />
      </RequireRole>
    ),
  },

  {
    path: `${servicoPaths.visualizarServico}/:id`,
    element: <VisualizarServico />,
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
