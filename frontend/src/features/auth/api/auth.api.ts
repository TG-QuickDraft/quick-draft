import type { LoginDTO } from "@/features/auth/dtos/LoginDTO";
import { publicApi } from "@/shared/apis/publicApi";

export const loginApi = async (
  userLogin: LoginDTO,
): Promise<{ token: string }> => {
  const { data } = await publicApi.post<{ token: string }>(
    "/api/auth/login",
    userLogin,
  );
  return data;
};
