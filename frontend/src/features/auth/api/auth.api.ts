import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { publicApi } from "@/shared/apis/publicApi";

export const loginApi = async (
  userLogin: LoginDTO,
): Promise<{ token: string }> => {
  try {
    const { data } = await publicApi.post<{ token: string }>(
      "/api/auth/login",
      userLogin,
    );
    return data;
  } catch {
    throw new Error("Credenciais inválidas");
  }
};
