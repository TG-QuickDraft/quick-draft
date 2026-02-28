import * as yup from "yup";

export type IBankAccountForm = yup.InferType<typeof BankAccountSchema>;

export const BankAccountSchema = yup.object({
  cpf: yup.string().required("CPF é obrigatório"),

  nomeTitular: yup
    .string()
    .required("Nome do titular é obrigatório")
    .min(3, "Nome muito curto"),

  banco: yup.string().required("Banco é obrigatório"),

  agencia: yup
    .string()
    .required("Agência é obrigatória")
    .min(3, "Agência inválida"),

  numeroConta: yup
    .string()
    .required("Número da conta é obrigatório")
    .min(4, "Número da conta inválido"),

  tipoConta: yup
    .number()
    .required("Selecione o tipo da conta")
    .oneOf([1, 2], "Tipo de conta inválido"),
});

export type ICardForm = yup.InferType<typeof CardSchema>;

export const CardSchema = yup.object({
  name: yup.string().required("Nome do impresso é obrigatório"),
  cvv: yup
    .string()
    .required("CVV é obrigatório")
    .min(3, "CVV inválido")
    .max(3, "CVV inválido"),

  flag: yup.number().required("Bandeira é obrigatória"),
});
