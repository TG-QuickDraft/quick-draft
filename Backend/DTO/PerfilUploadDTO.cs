namespace Backend.DTO
{
    public class PerfilUploadDTO
    {
        public required int Id { get; set; }
        public required IFormFile FotoPerfil { get; set; }
    }
}