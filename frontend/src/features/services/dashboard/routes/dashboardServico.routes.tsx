import { RequireRole } from "@/features/auth/components/RequireRole";
import { MeuServico } from "@/features/services/dashboard/pages/MeuServico";
import { dashboardServicoPaths } from "@/features/services/dashboard/routes/dashboardPaths";
import MinhaProposta from "../pages/MinhaProposta";

export const dashboardServicoRoutes = [

  {
    path: `${dashboardServicoPaths.meuServico}/:id`,
    element: <MeuServico />,
  },
  {
    path: `${dashboardServicoPaths.verMinhaProposta}/:id`,
    element: (
      <RequireRole roles={["Freelancer"]}>
        <MinhaProposta />
      </RequireRole>
    ),
  },

];
