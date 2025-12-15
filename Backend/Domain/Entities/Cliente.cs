using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("clientes")]
   public class Cliente(int Id)
    {

        [Key]
        [Column("cli_id")]
        [ForeignKey("usuarios")]
        public int Id { get; set; } = Id;

        [Required]
        public required Usuario Usuario { get; set; }

        public ICollection<Servico> Servicos { get; set; } = [];
    }
}