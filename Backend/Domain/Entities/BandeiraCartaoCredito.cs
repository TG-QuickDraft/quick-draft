using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    [Table("bandeiras_cartao_credito")]
    public class BandeiraCartaoCredito
    {
        [Key]
        [Column("bcc_id")]
        public int Id { get; set; }

        [Column("bcc_nome")]
        [Required]
        public string? Nome { get; set; }
    }
}
