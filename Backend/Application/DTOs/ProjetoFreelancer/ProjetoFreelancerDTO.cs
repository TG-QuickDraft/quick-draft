namespace Backend.Application.DTOs.ProjetoFreelancer
{
    public class ProjetoFreelancerDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? Descricao { get; set; }
        public string? ImagemUrl { get; set; }
        public string? Link { get; set; }
    }
}