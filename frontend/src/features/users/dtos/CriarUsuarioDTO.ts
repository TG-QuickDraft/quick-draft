import type { TipoUsuario } from "../enums/tiposUsuario";

export type CriarUsuarioDTO = {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  tipoUsuario: TipoUsuario;
};
