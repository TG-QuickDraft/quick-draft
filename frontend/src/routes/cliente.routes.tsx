import { CadastrarCartaoCredito } from "@/pages/cadastros/CadastrarCartaoCredito";
import { PerfilCliente } from "@/pages/perfis/PerfilCliente";

export const clienteRoutes = [
  { path: "/perfilCliente/:id", element: <PerfilCliente /> },
  { path: "/cadastrarCartaoCredito", element: <CadastrarCartaoCredito/> },
];
