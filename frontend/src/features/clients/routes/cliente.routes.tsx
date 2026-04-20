import { CadastrarCartaoCredito } from "@/features/clients/pages/CadastrarCartaoCredito";
import { PerfilCliente } from "@/features/clients/pages/PerfilCliente";
import { clientePaths } from "@/features/clients/routes/clientePaths";
import { RequireRole } from "@/features/auth/components/RequireRole";

export const clienteRoutes = [
  {
    path: `${clientePaths.perfilCliente}/:id`,
    element: <PerfilCliente />,
  },
  {
    path: clientePaths.cadastrarCartaoCredito,
    element: (
      <RequireRole roles={["Cliente"]}>
        <CadastrarCartaoCredito />
      </RequireRole>
    ),
  },
];
