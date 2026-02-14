export type ContaBancariaDTO = {
  id:           number;
  cpfTitular:   string;
  nomeTitular:  string;
  banco:        string;
  agencia:      string;
  numeroConta:  string;
  tipoContaId:  number;
};