using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.ContaBancaria {
    public class ContaBancariaDTO
    {
        public int Id { get; set; }
        
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
        public required string TipoContaId { get; set; }
    }
}