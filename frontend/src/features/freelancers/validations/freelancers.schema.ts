import * as yup from "yup";

export type INewProjectForm = yup.InferType<typeof NewProjectSchema>;

export const NewProjectSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  description: yup.string().required("Descrição é obrigatório"),
  link: yup.string().required("Link é obrigatório"),
});
