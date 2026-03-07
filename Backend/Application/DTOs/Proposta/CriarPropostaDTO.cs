using Backend.Application.DTOs.ProjetoFreelancer;

namespace Backend.Application.DTOs.Proposta
{
    public class CriarPropostaDTO
    {
        public required decimal ValorPorHora { get; set; }
        public required DateTime PrazoEntrega { get; set; }
        public required decimal ValorTotal { get; set; }
        public required string Mensagem { get; set; } = string.Empty;
        public required string ItensPropostos { get; set; } = string.Empty;
        public required bool TaxaSistemaAdicionadaAoTotal { get; set; }
        public required int ServicoId { get; set; }
        public ICollection<ProjetoFreelancerDTO> ProjetosDestacados { get; set; } = [];
    }
}
