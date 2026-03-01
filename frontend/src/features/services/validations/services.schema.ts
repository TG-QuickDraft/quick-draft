import * as yup from "yup";

export type INewServiceForm = yup.InferType<typeof NewServiceSchema>;

export const NewServiceSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  descricao: yup.string().required("Descrição é obrigatório"),

  valorMinimo: yup
    .number()
    .typeError("Valor mínimo deve ser um número")
    .required("Valor mínimo é obrigatório")
    .positive("Deve ser maior que zero"),

  prazo: yup
    .date()
    .typeError("Data inválida")
    .required("O Prazo é obrigatório")
    .min(new Date(), "O prazo deve ser uma data futura"),
});
