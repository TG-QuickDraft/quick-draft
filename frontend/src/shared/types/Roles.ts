export const Roles = {
  ADMIN: "Admin",
  CLIENTE: "Cliente",
  FREELANCER: "Freelancer",
} as const;

export type Role = typeof Roles[keyof typeof Roles];