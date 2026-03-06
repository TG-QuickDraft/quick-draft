import type { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";
import type { UploadImagemDTO } from "@/shared/dtos/UploadImagemDTO";
import type { AtualizarSenhaDTO } from "@/features/users/dtos/AtualizarSenhaDTO";
import type { MeResponseDTO } from "@/features/auth/dtos/MeResponseDTO";
import api from "@/shared/apis/api";
import type { Usuario } from "../dtos/Usuario";

const BASE_PATH = "/api/usuario";

export const adicionarUsuario = async (
  usuario: CriarUsuarioDTO,
): Promise<Usuario> => {
  try {
    const { data } = await api.post<Usuario>(BASE_PATH, usuario);
    return data;
  } catch {
    throw new Error("Erro ao adicionar usuário.");
  }
};

export const consultarUsuario = async (): Promise<Usuario> => {
  try {
    const { data } = await api.get<Usuario>(BASE_PATH);
    return data;
  } catch {
    throw new Error("Erro ao consultar usuário.");
  }
};

export const enviarFoto = async (upload: UploadImagemDTO) => {
  try {
    const form = new FormData();
    form.append("imagem", upload.imagem);

    const { data } = await api.post(`${BASE_PATH}/upload-foto`, form);
    return data;
  } catch {
    throw new Error("Erro ao enviar foto.");
  }
};

export const atualizarSenha = async (atualizarSenha: AtualizarSenhaDTO) => {
  try {
    const { data } = await api.put(
      `${BASE_PATH}/atualizar-senha`,
      atualizarSenha,
    );
    return data;
  } catch {
    throw new Error("Erro ao atualizar senha.");
  }
};

export const meApi = async (): Promise<MeResponseDTO> => {
  try {
    const { data } = await api.get<MeResponseDTO>(`${BASE_PATH}/me`);
    return data;
  } catch {
    throw new Error("Erro ao obter dados do usuário.");
  }
};