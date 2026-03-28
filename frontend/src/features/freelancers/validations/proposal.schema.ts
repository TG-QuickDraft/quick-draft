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
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue &&
        new Date(originalValue).toString() !== "Invalid Date"
        ? value
        : null;
    })
    .typeError("Informe uma data válida")
    .required("O Prazo é obrigatório")
    .min(new Date(), "Informe uma data futura"),

  totalCost: yup
    .string()
    .required("Valor é obrigatório")
    .test("valid-value", "Informe um valor válido", (value) =>
      validateCurrency(value),
    ),

  addSystemTax: yup.boolean().default(false),
});
