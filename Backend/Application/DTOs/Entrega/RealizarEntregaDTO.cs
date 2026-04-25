namespace Backend.Application.DTOs.Entrega
{
    public class RealizarEntregaDTO
    {
        public required int ServicoId { get; set; }
        public required IFormFile Arquivo { get; set; }
    }
}
