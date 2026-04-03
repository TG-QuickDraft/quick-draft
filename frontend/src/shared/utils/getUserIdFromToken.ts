import { jwtDecode } from "jwt-decode";
import { localStorageKeys } from "./storageKeys";

type JwtPayload = {
  sub?: string;
};

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem(localStorageKeys.accessToken);

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.sub) return null;

    const userId = Number(decoded.sub);

    if (isNaN(userId)) return null;

    return userId;
  } catch (error) {
    console.error("Token malformado encontrado. Limpando sessão...", error);
    localStorage.removeItem(localStorageKeys.accessToken);
    return null;
  }
};
