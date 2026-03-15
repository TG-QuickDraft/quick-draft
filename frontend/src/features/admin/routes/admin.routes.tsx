import { RequireRole } from "@/features/auth/components/RequireRole";
import { Analise } from "@/features/admin/pages/Analise";
import { Auditoria } from "@/features/admin/pages/Auditoria";
import { adminPaths } from "@/features/admin/routes/adminPaths";

export const adminRoutes = [
  {
    path: adminPaths.analise,
    element: (
      <RequireRole roles={["Admin"]}>
        <Analise />
      </RequireRole>
    ),
  },
  {
    path: adminPaths.auditoria,
    element: (
      <RequireRole roles={["Admin"]}>
        <Auditoria />
      </RequireRole>
    ),
  },
];
