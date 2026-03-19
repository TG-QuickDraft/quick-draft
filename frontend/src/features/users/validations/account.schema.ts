import * as yup from "yup";

export type IAccountForm = yup.InferType<typeof AccountSchema>;

export const AccountSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Insira um e-mail válido"),

  cpf: yup.string().required("CPF é obrigatório"),
});

export type IChangePasswordForm = yup.InferType<typeof ChangePasswordSchema>;

export const ChangePasswordSchema = yup.object({
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Mínimo de 8 digitos"),

  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});
