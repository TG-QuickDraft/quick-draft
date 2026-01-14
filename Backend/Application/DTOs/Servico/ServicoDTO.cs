namespace Backend.Application.DTOs.Servico
{
    public class ServicoDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public required int ClienteId { get; set; }
    }
}
