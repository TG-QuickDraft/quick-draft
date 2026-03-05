import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import api from "@/shared/api/api";
import { localStorageKeys } from "@/shared/utils/localStorageKeys";

export const loginApi = async (
  userLogin: LoginDTO,
): Promise<{ token: string }> => {
  try {
    const { data } = await api.post<{ token: string }>(
      "/api/auth/login",
      userLogin,
    );
    return data;
  } catch {
    throw new Error("Credenciais inválidas");
  }
};

export function logout() {
  localStorage.removeItem(localStorageKeys.accessToken);
}
