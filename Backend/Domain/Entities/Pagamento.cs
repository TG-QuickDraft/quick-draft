using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
    [Table("pagamentos")]
    public class Pagamento
    {
        [Key]
        [Column("pag_id")]
        public int Id { get; set; }

        [Column("pag_cre_id")]
        [Required]
        public int CartaoCreditoId { get; set; }

        [Column("pag_ser_id")]
        [Required]
        public int ServicoId { get; set; }

        [Column("pag_valor")]
        [Required]
        public decimal Valor { get; set; }

        [Column("pag_created_at")]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("pag_is_taxa_aplicada")]
        [DefaultValue(false)]
        public bool isTaxaAplicada { get; set; } = false;

        [JsonIgnore]
        public CartaoCredito? CartaoCredito { get; set; }

        [JsonIgnore]
        public Servico? Servico { get; set; }
    }
}
