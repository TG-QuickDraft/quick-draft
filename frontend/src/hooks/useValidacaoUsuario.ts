import * as Yup from 'yup';

export const useValidacaoUsuario = () => {
    return Yup.object().shape({
        nome: Yup.string().required('Por favor, digite o seu nome!'),
    })
}