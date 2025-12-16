using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("freelancers")]
   public class Freelancer
    {

        [Key]
        [Column("fre_id")]
        public int Id { get; set; }

        [ForeignKey(nameof(Id))]
        public Usuario? Usuario { get; set; }
    }
}