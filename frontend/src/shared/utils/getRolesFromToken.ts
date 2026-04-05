import { jwtDecode } from "jwt-decode";
import { localStorageKeys } from "@/shared/utils/storageKeys";
import { Roles, type Role } from "../types/Roles";

type JwtPayload = {
  roles?: string[] | string;
};

const isRole = (value: string): value is Role => {
  return Object.values(Roles).includes(value as Role);
};

export const getRolesFromToken = (): Role[] => {
  const token = localStorage.getItem(localStorageKeys.accessToken);

  if (!token) return [];

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const roles = decoded.roles;

    if (!roles) return [];

    const rolesArray = Array.isArray(roles) ? roles : [roles];

    return rolesArray.filter(isRole);
  } catch (error) {
    console.error("Token malformado encontrado. Limpando sessão...", error);
    localStorage.removeItem(localStorageKeys.accessToken);

    return [];
  }
};
