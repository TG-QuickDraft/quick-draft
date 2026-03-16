import { CadastrarCartaoCredito } from "@/features/finance/pages/CadastrarCartaoCredito";
import { PerfilCliente } from "@/features/clients/pages/PerfilCliente";
import { clientePaths } from "@/features/clients/routes/clientePaths";

export const clienteRoutes = [
  {
    path: `${clientePaths.perfilCliente}/:id`,
    element: <PerfilCliente />,
  },
  {
    path: clientePaths.cadastrarCartaoCredito,
    element: <CadastrarCartaoCredito />,
  },
];
