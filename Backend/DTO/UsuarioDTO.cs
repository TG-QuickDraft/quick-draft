namespace Backend.DTO
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}