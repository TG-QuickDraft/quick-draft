import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { JSX } from "react";
import { getRolesFromToken } from "@/shared/utils/getRolesFromToken";
import type { Role } from "@/shared/types/Roles";

type Props = {
  roles: Role[];
  children: JSX.Element;
};

export const RequireRole = ({ roles, children }: Props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = getRolesFromToken();

  const hasRole = roles.some((r) => userRoles.includes(r));

  if (!hasRole) {
    return <Navigate to="/403" replace />;
  }

  return children;
};
