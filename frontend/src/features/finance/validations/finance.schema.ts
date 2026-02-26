import * as yup from "yup";

export type IBankAccountForm = yup.InferType<typeof BankAccountSchema>;

export const BankAccountSchema = yup.object({
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos"),

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
    .string()
    .required("Selecione o tipo da conta")
    .oneOf(["corrente", "poupanca"], "Tipo de conta inválido"),
});
