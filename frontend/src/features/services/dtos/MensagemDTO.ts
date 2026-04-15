export interface CriarMensagemDTO {
  servicoId: number;
  mensagem: string;
}

export interface MensagemDTO {
  usuarioId: number;
  mensagem: string;
  data: string;
}
