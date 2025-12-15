namespace Backend.Application.DTOs
{
    public class ClienteDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}