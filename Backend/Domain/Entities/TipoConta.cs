using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("tipos_conta")]
   public class TipoConta
    {
        [Key]
        [Column("tpc_id")]
        public int Id { get; set; }

        [Column("tpc_nome")]
        [Required]
        public string? Nome { get; set; }
    }
}