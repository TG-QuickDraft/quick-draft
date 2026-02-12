using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
   [Table("tipos_conta")]
   public class TipoConta
    {
        // TODO: não existe um initializer ainda, por enquanto
        // o teste será feito com inserts no banco
        /* 
            INSERT INTO tipos_conta(tpc_nome) VALUES ('CORRENTE');
            INSERT INTO tipos_conta(tpc_nome) VALUES ('POUPANCA');
        */
        [Key]
        [Column("tpc_id")]
        public int Id { get; set; }

        [Column("tpc_nome")]
        [Required]
        public string? Nome { get; set; }
    }
}