export const TIPOS_USUARIO = ["Cliente", "Freelancer"] as const;
export type TipoUsuario = typeof TIPOS_USUARIO[number];