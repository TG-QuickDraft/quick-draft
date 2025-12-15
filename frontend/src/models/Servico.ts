import type { Cliente } from "./Cliente";

export type Servico = {
  id: number;
  nome: string;
  descricao: string;
  cliente?: Cliente;
};
