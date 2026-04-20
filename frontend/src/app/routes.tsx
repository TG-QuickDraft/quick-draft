import { Route, Routes } from "react-router-dom";

import { freelancerRoutes } from "../features/freelancers/routes/freelancer.routes";
import { dashboardServicoRoutes } from "../features/services/dashboard/routes/dashboardServico.routes";
import { clienteRoutes } from "../features/clients/routes/cliente.routes";
import { usuarioRoutes } from "../features/users/routes/usuario.routes";
import { adminRoutes } from "../features/admin/routes/admin.routes";
import { homeRoutes } from "../features/home/routes/home.routes";
import { deliveryRoutes } from "@/features/services/delivery/routes/delivery.routes";
import { executionRoutes } from "@/features/services/execution/routes/execution.routes";
import { proposalRoutes } from "@/features/services/proposal/routes/proposal.routes";

const AppRoutes = () => {
  const routes = [
    ...homeRoutes,
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...dashboardServicoRoutes,
    ...proposalRoutes,
    ...executionRoutes,
    ...deliveryRoutes,
    ...adminRoutes,
    ...deliveryRoutes,
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
