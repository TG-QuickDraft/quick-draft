import * as yup from "yup";
import { TIPOS_USUARIO } from "../enums/tiposUsuario";
import { uploadImagemSchema } from "@/shared/validations/uploadImagem.schema";

export type IRegisterUserForm = yup.InferType<typeof RegisterUserSchema>;

export const RegisterUserSchema = yup.object().shape({
  nome: yup.string().required("Por favor, digite o seu nome!"),
  cpf: yup.string().required("Por favor, digite o seu CPF!"),
  email: yup
    .string()
    .email("Por favor, digite um e-mail válido!")
    .required("Por favor, digite o seu e-mail!"),
  senha: yup.string().required("Por favor, digite a sua senha!"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem!")
    .required("Por favor, confirme a sua senha!"),
  tipoUsuario: yup
    .mixed()
    .oneOf(TIPOS_USUARIO, "Tipo de usuário inválido.")
    .required(),
  fotoPerfil: uploadImagemSchema,
});
