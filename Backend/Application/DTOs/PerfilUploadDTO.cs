namespace Backend.Application.DTOs
{
    public class PerfilUploadDTO
    {
        public required int UsuarioId { get; set; }
        public required IFormFile FotoPerfil { get; set; }
    }
}