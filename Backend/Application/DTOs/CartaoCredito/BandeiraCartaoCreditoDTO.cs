using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.CartaoCredito
{
    public class BandeiraCartaoCreditoDTO
    {
        [Required]
        public required int Id { get; set; }
        
        [Required]
        public required string Nome { get; set; }
    }  
}
