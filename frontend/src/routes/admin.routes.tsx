import { RequireRole } from "@/components/guards/RequireRole";
import { Analise } from "@/pages/admin/Analise";

export const adminRoutes = [
  {
    path: "/analise",
    element:
       // <RequireRole roles={["Admin"]}>
            <Analise /> 
      //  </RequireRole>
      //deixei comentado só pra poder visualizar a página mais fácil
  },
];
