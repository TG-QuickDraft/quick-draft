using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.ContaBancaria
{
   public class CriarContaBancariaDTO
    {
        [Required]
        public required string CpfTitular { get; set; }
        
        [Required]
        public required string NomeTitular { get; set; }
        
        [Required]
        public required string Banco { get; set; }
        
        [Required]
        public required string Agencia { get; set; }
        
        [Required]
        public required string NumeroConta { get; set; }
        
        [Required]
        public required int TipoContaId { get; set; }
    }
}
