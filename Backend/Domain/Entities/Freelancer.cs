using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("freelancers")]
   public class Freelancer(int Id)
    {

        [Key]
        [Column("fre_id")]
        [ForeignKey("usuarios")]
        public int Id { get; set; } = Id;

        public required Usuario Usuario { get; set; }
    }
}