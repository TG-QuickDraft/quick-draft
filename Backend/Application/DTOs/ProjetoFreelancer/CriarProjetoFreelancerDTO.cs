namespace Backend.Application.DTOs.ProjetoFreelancer
{
    public class CriarProjetoFreelancerDTO
    {
        public required string Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Link { get; set; }
    }
}
