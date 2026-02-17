using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("cartoes_credito")]
   public class CartaoCredito
    {
        [Key]
        [Column("cre_id")]
        public int Id { get; set; }

        [Column("cre_nome_impresso")]
        [Required]
        public string? NomeImpresso { get; set; }

        [Column("cre_codigo_seguranca")]
        [StringLength(3, MinimumLength = 3)]
        [Required]
        public string? CodigoSeguranca { get; set; }

        [Column("cre_bcc_id")]
        [Required]
        public int BandeiraId { get; set; }

        [ForeignKey(nameof(BandeiraId))]
        public BandeiraCartaoCredito? Bandeira { get; set; }

        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}