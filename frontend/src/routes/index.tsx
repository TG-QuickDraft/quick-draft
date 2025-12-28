import { Route, Routes } from "react-router-dom";

import { freelancerRoutes } from "./freelancer.routes";
import { servicoRoutes } from "./servico.routes";
import { clienteRoutes } from "./cliente.routes";
import { usuarioRoutes } from "./usuario.routes";
import { Home } from "@/pages/Home";

const AppRoutes = () => {
  const routes = [
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...servicoRoutes,
  ];

  const publicRoutes = routes.filter((r) => !r.private);
  const privateRoutes = routes.filter((r) => r.private);

  return (
    <Routes>
      {/* Public routes */}
      <Route index path="/" element={<Home />} />
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Private routes */}
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
