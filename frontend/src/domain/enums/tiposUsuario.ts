export const TIPOS_USUARIO = ["Freelancer", "Cliente"] as const;
export type TipoUsuario = typeof TIPOS_USUARIO[number];