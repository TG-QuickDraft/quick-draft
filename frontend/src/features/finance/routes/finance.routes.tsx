import RealizarPagamento from "../pages/RealizarPagamento";
import { financePaths } from "./financePaths";

export const financeRoutes = [
  { path: financePaths.realizarPagamento, element: <RealizarPagamento /> },
];
