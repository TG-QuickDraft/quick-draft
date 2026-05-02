namespace Backend.Application.DTOs.Avaliacao
{
    public class CriarAvaliacaoDTO
    {
        public int ServicoId { get; set; }
        public int NotaEstrelas { get; set; }
        public string? Comentario { get; set; }
    }
}