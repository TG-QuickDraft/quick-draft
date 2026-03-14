import * as yup from "yup";

export type INewProposalForm = yup.InferType<typeof NewProposalSchema>;

export const NewProposalSchema = yup.object({
  description: yup
    .string()
    .required("Descrição é obrigatório")
    .min(10, "Descrição muito curta"),

  hourlyValue: yup
    .number()
    .required("Valor é obrigatório")
    .positive("Deve ser maior que zero"),

  deliveryTime: yup
    .date()
    .typeError("Data inválida")
    .required("O Prazo é obrigatório")
    .min(new Date(), "O prazo deve ser uma data futura"),

  includeSystemTax: yup.boolean(),
});
