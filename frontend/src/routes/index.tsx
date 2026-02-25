import { Route, Routes } from "react-router-dom";

import { freelancerRoutes } from "../features/freelancers/routes/freelancer.routes";
import { servicoRoutes } from "../features/services/routes/servico.routes";
import { clienteRoutes } from "../features/clients/routes/cliente.routes";
import { usuarioRoutes } from "../features/users/routes/usuario.routes";
import { OldHome } from "@/home/OldHome";
import { Home } from "@/home/Home";
import { adminRoutes } from "../features/admin/routes/admin.routes";

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
      <Route index path="/" element={<Home />} />
      <Route index path="/old-home" element={<OldHome />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
