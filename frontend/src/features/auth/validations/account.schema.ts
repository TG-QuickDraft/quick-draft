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

  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos"),
});
