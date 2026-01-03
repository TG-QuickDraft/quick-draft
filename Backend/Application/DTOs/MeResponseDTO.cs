namespace Backend.Application.DTOs
{
    public class MeResponseDTO
    {
        public string Email { get; set; } = null!;
        public List<string> Roles { get; set; } = null!;
    }
}