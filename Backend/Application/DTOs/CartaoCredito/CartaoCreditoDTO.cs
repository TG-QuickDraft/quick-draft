using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.CartaoCredito
{
    public class CartaoCreditoDTO
    {
        public int Id { get; set; }
        
        [Required]
        public required string NomeImpresso { get; set; }

        [Required]
        [StringLength(3, MinimumLength = 3)]
        public required string CodigoSeguranca { get; set; }

        [Required]
        public required int BandeiraId { get; set; }
    }  
}
