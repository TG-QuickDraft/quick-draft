namespace Backend.Application.DTOs.Servico
{
    public class FiltroServicoDTO
    {
        public string? Nome { get; set; }
        public bool? OrcamentoIsAberto { get; set; }
        public DateTime? PrazoMaximo { get; set; }
        public decimal? ValorMinimo { get; set; }
        public bool? IsEntregue { get; set; }
    }
}