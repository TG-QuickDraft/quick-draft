import type { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";
import type { Usuario } from "../domain/models/Usuario";
import type { UserLogin } from "@/domain/models/Login";

const PATH = `${import.meta.env.VITE_API_URL}/api/usuario`;

export const adicionarUsuario = async (usuario: CriarUsuarioDTO): Promise<Usuario> => {
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 201) {
    throw new Error("Erro ao adicionar usuário.");
  }

  return resposta.json();
};

export const enviarFoto = async (formData: FormData) => {
  return await fetch(`${PATH}/upload-foto`, {
    method: "POST",
    body: formData,
  });
};

export const meApi = async (token: string): Promise<UserLogin> => {
  const response = await fetch(`${PATH}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao obter dados do usuário.");
  }

  return response.json();
}