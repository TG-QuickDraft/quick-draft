using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    [Table("mensagens_servico")]
    public class MensagemServico
    {
        [Key]
        [Column("mss_id")]
        public int Id { get; set; }

        [Column("mss_ser_id")]
        [Required]
        public int ServicoId { get; set; }

        [Column("mss_data")]
        [Required]
        public DateTime Data { get; set; }

        [Column("mss_mensagem")]
        [Required]
        public string Mensagem { get; set; } = string.Empty;

        [Column("mss_remetente_usu_id")]
        [Required]
        public int RemetenteUsuarioId { get; set; }

        [Column("mss_destinatario_usu_id")]
        [Required]
        public int DestinatarioUsuarioId { get; set; }

    }
}