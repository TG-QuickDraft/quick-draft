import type { UsuarioDTO } from "../../../users/dtos/UsuarioDTO";

export type FreelancerDTO = UsuarioDTO & {
  titulo: string;
  descricaoPerfil: string;
};
