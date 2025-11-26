using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Freelancer
    {
        [Column("fre_id")]
        [Key]
        public int Id { get; set; }

        [Column("fre_nome")]
        [Required]
        [MaxLength(100)]
        public required string Nome { get; set; }

    }
}