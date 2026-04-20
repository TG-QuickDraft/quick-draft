import { Route, Routes } from "react-router-dom";

import { freelancerRoutes } from "../features/freelancers/routes/freelancer.routes";
import { servicoRoutes } from "../features/services/routes/servico.routes";
import { clienteRoutes } from "../features/clients/routes/cliente.routes";
import { usuarioRoutes } from "../features/users/routes/usuario.routes";
import { adminRoutes } from "../features/admin/routes/admin.routes";
import { homeRoutes } from "../features/home/routes/home.routes";
import { financeRoutes } from "@/features/finance/routes/finance.routes";
import { executionRoutes } from "@/features/services/execution/routes/execution.routes";

const AppRoutes = () => {
  const routes = [
    ...homeRoutes,
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...servicoRoutes,
    ...executionRoutes,
    ...adminRoutes,
    ...financeRoutes,
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
