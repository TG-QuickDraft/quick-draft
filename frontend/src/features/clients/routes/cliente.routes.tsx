import { CadastrarCartaoCredito } from "@/features/finance/pages/CadastrarCartaoCredito";
import { PerfilCliente } from "@/features/clients/pages/PerfilCliente";

export const clienteRoutes = [
  { path: "/perfilCliente/:id", element: <PerfilCliente /> },
  { path: "/cadastrarCartaoCredito", element: <CadastrarCartaoCredito/> },
];
