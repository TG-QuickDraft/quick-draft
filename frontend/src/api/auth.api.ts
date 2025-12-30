import type { LoginRequest } from "@/dtos/Login";

const PATH = `${import.meta.env.VITE_API_URL}/api/Auth`;

export const loginApi = async (userLogin: LoginRequest) => {
  const response = await fetch(`${PATH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  return response.json() as Promise<{ token: string }>;
};