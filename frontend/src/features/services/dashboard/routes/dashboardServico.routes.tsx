import { MeuServico } from "@/features/services/dashboard/pages/MeuServico";
import { dashboardServicoPaths } from "@/features/services/dashboard/routes/dashboardPaths";

export const dashboardServicoRoutes = [

  {
    path: `${dashboardServicoPaths.meuServico}/:id`,
    element: <MeuServico />,
  },

];
