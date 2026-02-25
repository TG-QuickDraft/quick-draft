import { RequireRole } from "@/features/auth/components/RequireRole";
import { Analise } from "@/features/admin/pages/Analise";

export const adminRoutes = [
  {
    path: "/analise",
    element:
        <RequireRole roles={["Admin"]}>
            <Analise /> 
        </RequireRole>
  },
];
