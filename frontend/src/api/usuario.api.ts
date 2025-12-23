import type { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";
import type { Usuario } from "../domain/models/Usuario";

const PATH = `${import.meta.env.VITE_API_URL}/api/Usuario`;

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
