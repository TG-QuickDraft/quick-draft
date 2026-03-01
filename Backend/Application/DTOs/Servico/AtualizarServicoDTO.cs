namespace Backend.Application.DTOs.Servico
{
    public class AtualizarServicoDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public required DateTime Prazo { get; set; }
        public required decimal ValorMinimo { get; set; }
    }
}
