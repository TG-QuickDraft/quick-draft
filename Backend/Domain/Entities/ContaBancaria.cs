using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
   [Table("contas_bancarias")]
   public class ContaBancaria
    {
        [Key]
        [Column("con_id")]
        public int Id { get; set; }

        [Column("con_cpf_titular")]
        [Required]
        public string? CpfTitular { get; set; }

        [Column("con_nome_titular")]
        [Required]
        public string? NomeTitular { get; set; }

        [Column("con_banco")]
        [Required]
        public string? Banco { get; set; }

        [Column("con_agencia")]
        [Required]
        public string? Agencia { get; set; }

        [Column("con_numero_conta")]
        [Required]
        public string? NumeroConta { get; set; }

        [Column("con_tpc_id")]
        [Required]
        public int TipoContaId { get; set; }

        [ForeignKey(nameof(TipoContaId))]
        public TipoConta? TipoConta { get; set; }

        [JsonIgnore]
        public Freelancer? Freelancer { get; set; }
    }
}