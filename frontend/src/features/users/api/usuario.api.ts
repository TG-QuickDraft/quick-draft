import type { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";
import type { Usuario } from "../dtos/Usuario";
import { localStorageKeys } from "@/shared/utils/localStorageKeys";
import type { UploadImagemDTO } from "@/shared/dtos/UploadImagemDTO";
import type { AtualizarSenhaDTO } from "@/features/users/dtos/AtualizarSenhaDTO";
import type { AtualizarDadosUsuarioDTO } from "@/features/users/dtos/AtualizarDadosUsuarioDTO";
import type { MeResponseDTO } from "@/features/auth/dtos/MeResponseDTO";

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

export const atualizarDadosUsuario = async (dados: AtualizarDadosUsuarioDTO) => {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}`,
    },
    body: JSON.stringify(dados),
  };

  const resposta = await fetch(`${PATH}/atualizar-dados`, option);

  if (resposta.status !== 200) {
    throw new Error("Erro ao atualizar dados do usuário");
  }

  return resposta.json();
};

export const meApi = async (token: string): Promise<MeResponseDTO> => {
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