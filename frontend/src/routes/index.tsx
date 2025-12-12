import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

import { freelancerRoutes } from "./freelancer.routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {freelancerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
