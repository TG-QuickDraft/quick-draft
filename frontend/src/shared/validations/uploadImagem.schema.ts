import * as yup from "yup";

const TAMANHO_MAXIMO_MB = 5;
const TAMANHO_MAXIMO_BYTES = TAMANHO_MAXIMO_MB * 1024 * 1024;

const EXTENSOES_PERMITIDAS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

type FormValues = {
  imagem?: FileList;
};

export const uploadImagemSchema: yup.ObjectSchema<FormValues> = yup.object({
  imagem: yup
    .mixed<FileList>()
    .test(
      "fileSize",
      "Imagem excede 5MB",
      (value) =>
        !value || value.length === 0 || value[0].size <= TAMANHO_MAXIMO_BYTES,
    )
    .test(
      "fileFormat",
      "Formato de imagem inválido",
      (value) =>
        !value ||
        value.length === 0 ||
        EXTENSOES_PERMITIDAS.includes(value[0].type),
    ),
});
