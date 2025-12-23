namespace Backend.Application.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public required string Email { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}