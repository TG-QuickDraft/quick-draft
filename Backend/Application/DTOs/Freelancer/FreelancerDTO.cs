namespace Backend.Application.DTOs.Freelancer
{
    public class FreelancerDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? FotoPerfilUrl { get; set; }
    }
}