import type { CriarUsuarioDTO } from "../dtos/usuario/CriarUsuarioDTO";
import type { Usuario } from "../domain/models/Usuario";
import type { UserLogin } from "@/domain/models/Login";
import { localStorageKeys } from "@/utils/localStorageKeys";
import type { UploadImagemDTO } from "@/dtos/upload/UploadImagemDTO";
import type { AtualizarSenhaDTO } from "@/dtos/usuario/AtualizarSenhaDTO";

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

export const consultarUsuario = async (): Promise<Usuario> => {
  const option = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
      },
  };

  const resposta = await fetch(PATH, option);

  if (resposta.status !== 200) {
    throw new Error("Erro ao consultar usuário.");
  }

  return resposta.json();
}

export const enviarFoto = async (upload: UploadImagemDTO) => {
  const form = new FormData();
  form.append("imagem", upload.imagem);

  return await fetch(`${PATH}/upload-foto`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: form,
  });
};

export const atualizarSenha = async(atualizarSenha: AtualizarSenhaDTO) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: JSON.stringify(atualizarSenha),
  };

  const resposta = await fetch(`${PATH}/atualizar-senha`, option);
  
  if (resposta.status !== 200) {
    throw new Error("Erro ao atualizar senha: ", );
  }
  
  return resposta.json();
}

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