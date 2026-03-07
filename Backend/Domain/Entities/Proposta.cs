using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("propostas")]
   public class Proposta
    {
        [Key]
        [Column("pro_id")]
        public int Id { get; set; }

        [Column("pro_valor_por_hora", TypeName = "numeric(5,2)")]
        [Required]
        public decimal ValorPorHora { get; set; }

        [Column("pro_prazo_entrega")]
        [Required]
        public DateTime PrazoEntrega { get; set; }

        [Column("pro_valor_total", TypeName = "numeric(10,2)")]
        [Required]
        public decimal ValorTotal { get; set; }

        [Column("pro_mensagem")]
        [Required]
        public string Mensagem { get; set; } = string.Empty;

        [Column("pro_itens_propostos")]
        [Required]
        public string ItensPropostos { get; set; } = string.Empty;

        /// <summary>
        /// Define quem paga a taxa da plataforma: o freelancer ou o cliente
        /// </summary>
        [Column("pro_taxa_sistema_adicionada_ao_total")]
        [Required]
        public bool TaxaSistemaAdicionadaAoTotal { get; set; }

        [Column("pro_fre_id")]
        [Required]
        public int FreelancerId { get; set; }

        [Column("pro_ser_id")]
        [Required]
        public int ServicoId { get; set; }

        [JsonIgnore]
        public Freelancer? Freelancer { get; set; }

        [JsonIgnore]
        public Servico? Servico { get; set; }
        public Servico? ServicoOndeFoiAceita { get; set; }
        public ICollection<ProjetoDestacadoProposta> ProjetosDestacados { get; set; } = [];
    }
}
