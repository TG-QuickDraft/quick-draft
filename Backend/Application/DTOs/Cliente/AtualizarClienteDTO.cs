namespace Backend.Application.DTOs.Cliente
{
    public class AtualizarClienteDTO
    {
        public required string Nome { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}