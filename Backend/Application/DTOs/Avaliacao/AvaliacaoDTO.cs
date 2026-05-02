namespace Backend.Application.DTOs.Avaliacao
{
    public class AvaliacaoDTO
    {
        public int ServicoId { get; set; }
        public int AutorId { get; set; }
        public int AlvoId { get; set; }
        public int NotaEstrelas { get; set; }
        public string? Comentario { get; set; }
    }
}