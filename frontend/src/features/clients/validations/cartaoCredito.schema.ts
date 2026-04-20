import * as yup from "yup";

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
