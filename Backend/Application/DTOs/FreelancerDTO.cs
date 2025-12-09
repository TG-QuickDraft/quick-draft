namespace Backend.Application.DTOs
{
    public class FreelancerDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}