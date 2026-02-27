namespace Backend.Application.DTOs.Servico
{
    public class ServicoDTO
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public decimal Orcamento { get; set; }
        public DateTime Prazo { get; set; }
        public decimal ValorMinimo { get; set; }
        public bool IsEntregue { get; set; }
        public int? PropostaAceitaId { get; set; }
        public required int ClienteId { get; set; }
    }
}
