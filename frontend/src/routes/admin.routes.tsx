import { RequireRole } from "@/components/guards/RequireRole";
import { Analise } from "@/pages/admin/Analise";
import { Auditoria } from "@/pages/admin/Auditoria";

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
