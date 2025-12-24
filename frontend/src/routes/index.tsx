import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

import { freelancerRoutes } from "./freelancer.routes";
import { servicoRoutes } from "./servico.routes";
import { clienteRoutes } from "./cliente.routes";
import { usuarioRoutes } from "./usuario.routes";
import { LoginUsuario } from "@/pages/LoginUsuario";

const AppRoutes = () => {
  const routes = [
    ...freelancerRoutes,
    ...clienteRoutes,
    ...usuarioRoutes,
    ...servicoRoutes,
  ];

  return (
    <Routes>
      <Route path="/" element={<LoginUsuario />} />
      <Route path="/home" element={<Home />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
