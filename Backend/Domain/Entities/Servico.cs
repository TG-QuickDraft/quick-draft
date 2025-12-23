using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("servicos")]
   public class Servico
    {
        [Key]
        [Column("ser_id")]
        public int Id { get; set; }

        [Column("ser_nome")]
        public required string Nome { get; set; }

        [Column("ser_descricao")]
        public required string Descricao { get; set; }

        [Column("ser_cli_id")]
        public int ClienteId { get; set; }

        [ForeignKey(nameof(ClienteId))]
        [JsonIgnore]
        public Cliente? Cliente { get; set; }
    }
}