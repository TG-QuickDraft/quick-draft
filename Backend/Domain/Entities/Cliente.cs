using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("clientes")]
   public class Cliente
    {
        [Key]
        [Column("cli_id")]
        public int Id { get; set; }

        [ForeignKey(nameof(Id))]
        public Usuario? Usuario { get; set; }

        public ICollection<Servico> Servicos { get; set; } = [];
    }
}