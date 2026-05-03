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

        [JsonIgnore]
        public CartaoCredito? CartaoCredito { get; set; }

        [JsonIgnore]
        public Servico? Servico { get; set; }
    }
}