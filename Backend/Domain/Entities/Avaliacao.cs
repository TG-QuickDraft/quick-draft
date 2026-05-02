using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    [Table("avaliacoes")]
    public class Avaliacao
    {
        [Column("ava_ser_id")]
        public int ServicoId { get; set; }

        [Column("ava_autor_id")]
        public int AutorId { get; set; }

        [Column("ava_alvo_id")]
        public int AlvoId { get; set; }

        [Column("ava_nota_estrelas")]
        [Required]
        public int NotaEstrelas { get; set; }

        [Column("ava_comentario")]
        public string? Comentario { get; set; }

        public Servico? Servico { get; set; }
        public Usuario? Autor { get; set; }
        public Usuario? Alvo { get; set; }
    }
}
