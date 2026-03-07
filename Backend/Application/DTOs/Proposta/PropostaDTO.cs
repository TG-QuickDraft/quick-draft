using Backend.Application.DTOs.ProjetoFreelancer;

namespace Backend.Application.DTOs.Proposta
{
    public class PropostaDTO
    {
        public int Id { get; set; }
        public decimal ValorPorHora { get; set; }
        public DateTime PrazoEntrega { get; set; }
        public decimal ValorTotal { get; set; }
        public string Mensagem { get; set; } = string.Empty;
        public string ItensPropostos { get; set; } = string.Empty;
        public bool TaxaSistemaAdicionadaAoTotal { get; set; }
        public int FreelancerId { get; set; }
        public int ServicoId { get; set; }
        public ICollection<ProjetoFreelancerDTO> ProjetosDestacados { get; set; } = [];
    }
}
