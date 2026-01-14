import { jwtDecode } from "jwt-decode";
import { localStorageKeys } from "@/utils/localStorageKeys";

type JwtPayload = {
  roles?: string[] | string;
};

export const getRolesFromToken = (): string[] => {
  const token = localStorage.getItem(localStorageKeys.accessToken);
  if (!token) return [];

  const decoded = jwtDecode<JwtPayload>(token);
  const { roles } = decoded;

  if (!roles) return [];
  return Array.isArray(roles) ? roles : [roles];
};
