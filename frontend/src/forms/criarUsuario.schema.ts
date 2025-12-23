import * as Yup from 'yup';
import { TIPOS_USUARIO } from '../domain/enums/tiposUsuario';

export const criarUsuarioSchema = () => {
    return Yup.object().shape({
        nome: Yup.string().required('Por favor, digite o seu nome!'),
        cpf: Yup.string().required('Por favor, digite o seu CPF!'),
        email: Yup
            .string()
            .email('Por favor, digite um e-mail válido!')
            .required('Por favor, digite o seu e-mail!'),
        senha: Yup
            .string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres!')
            .required('Por favor, digite a sua senha!'),
        confirmarSenha: Yup
            .string()
            .oneOf([Yup.ref("senha")], "As senhas não coincidem!")
            .required('Por favor, confirme a sua senha!'),
        tipoUsuario: Yup
            .mixed()
            .oneOf(TIPOS_USUARIO, "Tipo de usuário inválido.")
            .required(),
    })
}
