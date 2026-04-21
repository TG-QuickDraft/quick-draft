import RealizarPagamento from "../pages/RealizarPagamento";
import { deliveryPaths } from "./deliveryPaths";

export const deliveryRoutes = [
  { path: deliveryPaths.realizarPagamento, element: <RealizarPagamento /> },
];
