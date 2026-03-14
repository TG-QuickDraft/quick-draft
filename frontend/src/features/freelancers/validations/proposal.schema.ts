import {
  validateCurrency,
  validateDate,
  validateFutureDate,
} from "@/shared/utils/validations.utils";
import * as yup from "yup";

export type INewProposalForm = yup.InferType<typeof NewProposalSchema>;

export const NewProposalSchema = yup.object({
  description: yup
    .string()
    .required("Descrição é obrigatório")
    .min(10, "Descrição muito curta"),

  hourlyValue: yup
    .string()
    .required("Valor é obrigatório")
    .test("valid-value", "Informe um valor válido", (value) =>
      validateCurrency(value),
    ),

  deadline: yup
    .string()
    .required("O Prazo é obrigatório")
    .test("valid-date", "Informe uma data válida", (value) =>
      validateDate(value),
    )
    .test("future-date", "Informe uma data futura", (value) =>
      validateFutureDate(value),
    ),

  totalCost: yup
    .string()
    .required("Valor é obrigatório")
    .test("valid-value", "Informe um valor válido", (value) =>
      validateCurrency(value),
    ),

  addSystemTax: yup.boolean().default(false),
});
