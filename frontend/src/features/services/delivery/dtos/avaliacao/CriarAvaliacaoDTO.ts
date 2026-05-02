export type CriarAvaliacaoDTO = {
    servicoId: number;
    alvoId: number;
    notaEstrelas: number;
    comentario?: string;
};