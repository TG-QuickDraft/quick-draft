import { Route, Routes } from "react-router-dom";

import { freelancerRoutes } from "./freelancer.routes";
import { servicoRoutes } from "./servico.routes";
import { clienteRoutes } from "./cliente.routes";
import { usuarioRoutes } from "./usuario.routes";
import { OldHome } from "@/pages/OldHome";
import { adminRoutes } from "./admin.routes";

const AppRoutes = () => {
  const routes = [
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...servicoRoutes,
    ...adminRoutes,
  ];

  return (
    <Routes>
      <Route index path="/old-home" element={<OldHome />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
