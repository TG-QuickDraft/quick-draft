namespace Backend.Application.DTOs.Entrega
{
    public class EntregaDTO
    {
        public required int ServicoId { get; set; }
        public required string UrlArquivo { get; set; }
        public DateTime? CreateAt { get; set; }
    }
}
