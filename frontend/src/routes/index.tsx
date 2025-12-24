import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

import { freelancerRoutes } from "./freelancer.routes";
import { servicoRoutes } from "./servico.routes";
import { clienteRoutes } from "./cliente.routes";
import { usuarioRoutes } from "./usuario.routes";
import { LoginUsuario } from "@/pages/LoginUsuario";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

const AppRoutes = () => {
  const routes = [
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...servicoRoutes,
  ];

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<LoginUsuario />} />

      {/* Rotas Privadas */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/home" element={<Home />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
