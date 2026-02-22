import type { LoginDTO } from "@/dtos/login/LoginDTO";

const PATH = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginApi = async (userLogin: LoginDTO) => {
  const response = await fetch(`${PATH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userLogin),
  });

  if (!response.ok) {a
    throw new Error("Credenciais inválidas");
  }

  return response.json() as Promise<{ token: string }>;
};