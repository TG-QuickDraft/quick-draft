using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("servicos")]
   public class Servico
    {
        [Key]
        [Column("ser_id")]
        public int Id { get; set; }

        [Column("ser_nome")]
        [Required]
        public string? Nome { get; set; }

        [Column("ser_descricao")]
        [Required]
        public string? Descricao { get; set; }

        [Column("ser_orcamento", TypeName = "numeric(6,2)")]
        [Required]
        public decimal Orcamento { get; set; }

        [Column("ser_prazo")]
        [Required]
        public DateTime Prazo { get; set; }

        [Column("ser_valor_minimo", TypeName = "numeric(6,2)")]
        [Required]
        public decimal ValorMinimo { get; set; }

        [Column("ser_is_entregue")]
        [Required]
        public bool IsEntregue { get; set; } = false;

        [Column("ser_proposta_aceita_id")]
        public int? PropostaAceitaId { get; set; }

        [Column("ser_cli_id")]
        [Required]
        public int ClienteId { get; set; }

        [ForeignKey(nameof(ClienteId))]
        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}