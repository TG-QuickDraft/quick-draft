import * as yup from "yup";

export type ILoginForm = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Insira um e-mail válido"),
  senha: yup
    .string()
    .min(6, "Mínimo de 6 digitos")
    .required("Senha é obrigatória"),
});
