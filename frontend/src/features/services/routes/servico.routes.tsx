import { RequireRole } from "@/features/auth/components/RequireRole";
import { CadastrarServico } from "@/features/services/proposal/pages/CadastrarServico";
import PesquisaServico from "@/features/services/proposal/pages/PesquisaServicos";
import { VisualizarServico } from "@/features/services/proposal/pages/VisualizarServico";
import { MeuServico } from "@/features/services/pages/MeuServico";
import { servicoPaths } from "@/features/services/routes/servicoPaths";

export const servicoRoutes = [

  {
    path: `${servicoPaths.meuServico}/:id`,
    element: <MeuServico />,
  },

];
