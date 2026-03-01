export type CriarContaBancariaDTO = {
  cpfTitular:   string;
  nomeTitular:  string;
  banco:        string;
  agencia:      string;
  numeroConta:  string;
  tipoContaId:  number;
};