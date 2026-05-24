using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Domain.Exceptions;

namespace Backend.Domain.Entities
{
    [Table("pagamentos")]
    public class Pagamento
    {
        [Key]
        [Column("pag_id")]
        public int Id { get; set; }

        [Column("pag_cre_id")]
        [Required]
        public int CartaoCreditoId { get; set; }

        [Column("pag_ser_id")]
        [Required]
        public int ServicoId { get; set; }

        [Column("pag_valor")]
        [Required]
        public decimal Valor {
            get => _valor;
            set
            {
                if (value <= 0)
                    throw new RegraNegocioException(
                        "Valor do pagamento deve ser maior que R$ 0,00!"
                    );

                _valor = value;
            }
        }

        [Column("pag_created_at")]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public CartaoCredito? CartaoCredito { get; set; }

        [JsonIgnore]
        public Servico? Servico { get; set; }

        private decimal _valor;
    }
}
