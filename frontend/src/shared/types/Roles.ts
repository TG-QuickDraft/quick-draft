export const Roles = {
  ADMIN: "Administrador",
  CLIENTE: "Cliente",
  FREELANCER: "Freelancer",
} as const;

export type Role = typeof Roles[keyof typeof Roles];