import { RequireRole } from "@/features/auth/components/RequireRole";
import { Analise } from "@/features/admin/pages/Analise";
import { Auditoria } from "@/features/admin/pages/Auditoria";

export const adminRoutes = [
  {
    path: "/analise",
    element:
        <RequireRole roles={["Admin"]}>
            <Analise /> 
        </RequireRole>
  },
  {
    path: "/auditoria",
    element:
        <RequireRole roles={["Admin"]}>
            <Auditoria /> 
        </RequireRole>
  },
];
