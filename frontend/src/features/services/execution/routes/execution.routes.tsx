import { RequireRole } from "@/features/auth/components/RequireRole";
import { ChatServico } from "../pages/ChatServico";
import { executionPaths } from "./executionPaths";

export const executionRoutes = [
  {
    path: `${executionPaths.chatServico}/:id`,
    element: (
      <RequireRole roles={["Cliente", "Freelancer"]}>
        <ChatServico />
      </RequireRole>
    ),
  },
];
