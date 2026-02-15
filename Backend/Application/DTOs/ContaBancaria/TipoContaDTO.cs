using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.ContaBancaria
{
   public class TipoContaDTO
    {
        [Required]
        public required int Id { get; set; }
        
        [Required]
        public required string Nome { get; set; }
    }
}
