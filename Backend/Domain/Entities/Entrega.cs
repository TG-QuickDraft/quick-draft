using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    [Table("entregas")]
    public class Entrega
    {
        [Key]
        [Column("ent_id")]
        public int Id { get; set; }

        [Column("ent_url_arquivo")]
        [Required]
        public string UrlArquivo { get; set; } = string.Empty;

        [Column("ent_ser_id")]
        [Required]
        public int ServicoId { get; set; }

        [Column("ent_create_at")]
        public DateTime? CreateAt { get; set; } = DateTime.UtcNow;

        public Servico? Servico { get; set; }
    }
}
